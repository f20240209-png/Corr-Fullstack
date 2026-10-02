import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../services/api_service.dart';
import '../models/journal_dates.dart';
import '../theme/app_theme.dart';
import '../widgets/journal_widgets.dart';
import '../widgets/routine_step_card.dart';

class JournalScreen extends StatefulWidget {
  final DateTime? initialDate;
  const JournalScreen({super.key, this.initialDate});
  @override
  State<JournalScreen> createState() => _JournalScreenState();
}

class _JournalScreenState extends State<JournalScreen> {
  final _title = TextEditingController(), _body = TextEditingController();
  late DateTime _date, _month;
  List<Map<String, dynamic>> _entries = [];
  int _version = 0, _request = 0, _monthRequest = 0;
  bool _loading = true, _monthLoading = true, _saving = false, _picking = false;
  bool _dirty = false,
      _applying = false,
      _removePhoto = false,
      _conflict = false;
  bool _leaveDialog = false;
  Uint8List? _photo;
  String? _photoPath, _error, _monthError;
  String get _token =>
      context.read<AuthProvider>().token ??
      (throw const ApiException('Please sign in again.'));
  String get _key => journalDateKey(_date);

  @override
  void initState() {
    super.initState();
    final initial = journalDay(widget.initialDate ?? DateTime.now());
    _date = validJournalDay(initial) ? initial : journalDay(DateTime.now());
    _month = DateTime(_date.year, _date.month);
    _title.addListener(_changed);
    _body.addListener(_changed);
    _load();
    _loadMonth();
  }

  @override
  void dispose() {
    _title.dispose();
    _body.dispose();
    super.dispose();
  }

  void _changed() {
    if (!_applying && !_loading && mounted && !_dirty)
      setState(() => _dirty = true);
  }

  void _apply(Map<String, dynamic>? entry) {
    _applying = true;
    _title.text = entry?['title'] as String? ?? '';
    _body.text = entry?['body'] as String? ?? '';
    _applying = false;
    _version = (entry?['version'] as num?)?.toInt() ?? 0;
    _photoPath = entry?['photoPath'] as String?;
    _photo = null;
    _removePhoto = false;
    _dirty = false;
    _conflict = false;
  }

  Future<void> _load() async {
    final request = ++_request, date = _key;
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await ApiService.getJournalEntry(_token, date);
      final entry = data['entry'];
      if (entry != null && entry is! Map)
        throw const ApiException(
          'The journal page is incomplete. Please retry.',
        );
      if (mounted && request == _request)
        setState(
          () => _apply(
            entry == null ? null : Map<String, dynamic>.from(entry as Map),
          ),
        );
    } catch (e) {
      if (mounted && request == _request) setState(() => _error = e.toString());
    } finally {
      if (mounted && request == _request) setState(() => _loading = false);
    }
  }

  Future<void> _loadMonth() async {
    final request = ++_monthRequest, month = journalMonthKey(_month);
    setState(() {
      _monthLoading = true;
      _monthError = null;
    });
    try {
      final data = await ApiService.getJournalMonth(_token, month);
      if (mounted && request == _monthRequest)
        setState(
          () => _entries = List<Map<String, dynamic>>.from(data['entries']),
        );
    } catch (e) {
      if (mounted && request == _monthRequest)
        setState(() => _monthError = e.toString());
    } finally {
      if (mounted && request == _monthRequest)
        setState(() => _monthLoading = false);
    }
  }

  Future<bool> _canLeave() async {
    if (_saving || _picking || _leaveDialog) return false;
    if (!_dirty) return true;
    _leaveDialog = true;
    final discard = await showDialog<bool>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Keep writing this page?'),
        content: const Text(
          'You have unsaved changes. Save this page first, or discard the draft to continue.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(dialogContext, false),
            child: const Text('Keep writing'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(dialogContext, true),
            child: const Text('Discard draft'),
          ),
        ],
      ),
    );
    _leaveDialog = false;
    return discard == true;
  }

  Future<void> _selectDate(DateTime date) async {
    date = journalDay(date);
    if (!validJournalDay(date) ||
        date == _date ||
        !await _canLeave() ||
        !mounted)
      return;
    FocusScope.of(context).unfocus();
    setState(() {
      _date = date;
      _month = DateTime(date.year, date.month);
      _dirty = false;
      _version = 0;
      _photo = null;
      _photoPath = null;
      _conflict = false;
    });
    await Future.wait([_load(), _loadMonth()]);
  }

  Future<void> _chooseDate() async {
    if (_saving || _picking) return;
    final date = await showDatePicker(
      context: context,
      initialDate: _date,
      firstDate: DateTime(1900),
      lastDate: DateTime(2100, 12, 31),
    );
    if (mounted && date != null) await _selectDate(date);
  }

  Future<void> _reload() async {
    if (!await _canLeave() || !mounted) return;
    await _load();
  }

  void _browseMonth(int delta) {
    final month = DateTime(_month.year, _month.month + delta);
    if (!validJournalDay(month)) return;
    setState(() => _month = month);
    _loadMonth();
  }

  Future<void> _pick(ImageSource source) async {
    if (_saving || _picking) return;
    setState(() => _picking = true);
    try {
      final file = await ImagePicker().pickImage(
        source: source,
        maxWidth: 1600,
        maxHeight: 1600,
        imageQuality: 85,
      );
      if (file == null) return;
      final bytes = await file.readAsBytes();
      if (bytes.length > 5 * 1024 * 1024)
        throw const ApiException('Choose a photo smaller than 5 MB.');
      if (mounted)
        setState(() {
          _photo = bytes;
          _removePhoto = false;
          _dirty = true;
        });
    } catch (e) {
      if (mounted)
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              e is ApiException
                  ? e.toString()
                  : 'Unable to open this photo. Please choose another.',
            ),
          ),
        );
    } finally {
      if (mounted) setState(() => _picking = false);
    }
  }

  Future<void> _save() async {
    if (_loading || _saving || _picking || !_dirty) return;
    if (_title.text.trim().isEmpty &&
        _body.text.trim().isEmpty &&
        _photo == null &&
        (_photoPath == null || _removePhoto)) {
      setState(
        () => _error = 'Write a little or add a photo before saving this page.',
      );
      return;
    }
    setState(() {
      _saving = true;
      _error = null;
    });
    try {
      final data = await ApiService.saveJournalEntry(_token, _key, {
        'title': _title.text,
        'body': _body.text,
        'version': '$_version',
        'removePhoto': '$_removePhoto',
      }, photo: _photo);
      if (data['entry'] is! Map)
        throw const ApiException(
          'Could not confirm this save. Reload the saved page before trying again.',
        );
      if (!mounted) return;
      setState(() => _apply(Map<String, dynamic>.from(data['entry'] as Map)));
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Your journal page is saved.')),
      );
      _loadMonth();
    } catch (e) {
      if (mounted)
        setState(() {
          _error = e.toString();
          _conflict = e is ApiException && e.statusCode == 409;
        });
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  Future<void> _delete() async {
    if (_saving || _picking || _version == 0) return;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Delete this journal page?'),
        content: const Text(
          'The writing and saved photo for this date will be removed.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(dialogContext, false),
            child: const Text('Keep page'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(dialogContext, true),
            child: const Text('Delete page'),
          ),
        ],
      ),
    );
    if (!mounted || confirmed != true) return;
    setState(() {
      _saving = true;
      _error = null;
    });
    try {
      final data = await ApiService.deleteJournalEntry(_token, _key, _version);
      if (data['deleted'] != true)
        throw const ApiException('Could not delete this page.');
      if (!mounted) return;
      setState(() => _apply(null));
      _loadMonth();
    } catch (e) {
      if (mounted)
        setState(() {
          _error = e.toString();
          _conflict = e is ApiException && e.statusCode == 409;
        });
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) => PopScope(
    canPop: !_dirty && !_saving && !_picking,
    onPopInvokedWithResult: (didPop, result) async {
      if (didPop) return;
      if (await _canLeave() && context.mounted) {
        setState(() => _dirty = false);
        Navigator.pop(context);
      }
    },
    child: Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: const Text('Skincare Journal'),
        backgroundColor: AppTheme.background,
        actions: [
          IconButton(
            tooltip: 'Private to you',
            onPressed: () => ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text(
                  'Only you can access your journal. It is not shown to friends.',
                ),
              ),
            ),
            icon: const Icon(Icons.lock_outline_rounded),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SafeArea(
        top: false,
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(18, 8, 18, 36),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 1100),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'YOUR PRIVATE DIARY',
                    style: TextStyle(
                      color: AppTheme.primaryDark,
                      letterSpacing: 1.6,
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 10),
                  const Text(
                    'Your day, in your own words.',
                    style: TextStyle(fontSize: 28, fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Small moments, big thoughts, or anything in between. These pages are yours.',
                    style: TextStyle(
                      color: AppTheme.textSecondary,
                      fontSize: 13,
                      height: 1.6,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      IconButton(
                        tooltip: 'Previous day',
                        onPressed:
                            _saving ||
                                _picking ||
                                !validJournalDay(nextJournalDay(_date, -1))
                            ? null
                            : () => _selectDate(nextJournalDay(_date, -1)),
                        icon: const Icon(Icons.chevron_left_rounded),
                      ),
                      OutlinedButton.icon(
                        onPressed: _saving || _picking ? null : _chooseDate,
                        icon: const Icon(
                          Icons.calendar_today_outlined,
                          size: 17,
                        ),
                        label: Text(journalDateLabel(_date)),
                      ),
                      IconButton(
                        tooltip: 'Next day',
                        onPressed:
                            _saving ||
                                _picking ||
                                !validJournalDay(nextJournalDay(_date, 1))
                            ? null
                            : () => _selectDate(nextJournalDay(_date, 1)),
                        icon: const Icon(Icons.chevron_right_rounded),
                      ),
                      if (journalDateKey(_date) !=
                          journalDateKey(DateTime.now()))
                        TextButton(
                          onPressed: _saving || _picking
                              ? null
                              : () => _selectDate(DateTime.now()),
                          child: const Text('Today'),
                        ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  LayoutBuilder(
                    builder: (context, bounds) {
                      if (bounds.maxWidth >= 850)
                        return Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(child: _page()),
                            const SizedBox(width: 22),
                            SizedBox(width: 280, child: _calendarPanel()),
                          ],
                        );
                      return Column(
                        children: [
                          Container(
                            margin: const EdgeInsets.only(bottom: 16),
                            decoration: BoxDecoration(
                              color: AppTheme.surfaceWarm,
                              border: Border.all(color: AppTheme.border),
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: ExpansionTile(
                              shape: const Border(),
                              collapsedShape: const Border(),
                              title: const Text(
                                'Browse journal dates',
                                style: TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              leading: const Icon(
                                Icons.date_range_outlined,
                                size: 20,
                              ),
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(12),
                                  child: _calendar(),
                                ),
                              ],
                            ),
                          ),
                          _page(),
                        ],
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    ),
  );
  Widget _calendar() => JournalCalendar(
    month: _month,
    selected: _date,
    entries: _entries,
    loading: _monthLoading,
    error: _monthError,
    onMonth: _browseMonth,
    onSelect: _selectDate,
    onRetry: _loadMonth,
  );
  Widget _calendarPanel() => CorrPanel(
    padding: const EdgeInsets.all(16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Turn to another day',
          style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700),
        ),
        const SizedBox(height: 8),
        _calendar(),
        const SizedBox(height: 16),
        const Text(
          'No prompts to follow. Write about anything you want to keep.',
          style: TextStyle(
            color: AppTheme.textSecondary,
            height: 1.6,
            fontSize: 12,
          ),
        ),
      ],
    ),
  );
  Widget _page() {
    if (_loading)
      return const Padding(
        padding: EdgeInsets.all(60),
        child: Center(child: CircularProgressIndicator()),
      );
    // A failed load must not expose a blank editor that could overwrite a saved page.
    if (_error != null && !_dirty && _version == 0)
      return CorrPanel(
        child: Column(
          children: [
            const Icon(
              Icons.cloud_off_outlined,
              size: 32,
              color: AppTheme.primaryDark,
            ),
            const SizedBox(height: 12),
            Text(_error!, textAlign: TextAlign.center),
            const SizedBox(height: 12),
            OutlinedButton(onPressed: _reload, child: const Text('Retry page')),
          ],
        ),
      );
    final locked = _saving || _picking;
    final photo = _photo != null
        ? Image.memory(
            _photo!,
            fit: BoxFit.cover,
            width: double.infinity,
            height: double.infinity,
            errorBuilder: (_, __, ___) => const Center(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Text(
                  'Could not preview this photo. Please choose another.',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: AppTheme.textSecondary, fontSize: 12),
                ),
              ),
            ),
          )
        : _photoPath != null && !_removePhoto
        ? JournalPhoto(path: _photoPath!)
        : null;
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: const Color(0xFFFFFDF7),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppTheme.border),
        boxShadow: const [
          BoxShadow(
            color: AppTheme.shadow,
            blurRadius: 20,
            offset: Offset(0, 6),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 24, 20, 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Wrap(
              spacing: 12,
              runSpacing: 6,
              children: [
                Text(
                  journalDateLabel(_date),
                  style: const TextStyle(
                    color: AppTheme.primaryDark,
                    fontSize: 12,
                    letterSpacing: 0.5,
                  ),
                ),
                Text(
                  _saving
                      ? 'Saving...'
                      : _dirty
                      ? 'Unsaved changes'
                      : _version > 0
                      ? 'Saved page'
                      : 'A fresh page',
                  style: const TextStyle(
                    fontSize: 11,
                    color: AppTheme.textSecondary,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _title,
              enabled: !locked,
              maxLength: 120,
              textCapitalization: TextCapitalization.sentences,
              style: const TextStyle(
                fontSize: 23,
                fontWeight: FontWeight.w600,
                fontStyle: FontStyle.italic,
              ),
              decoration: const InputDecoration(
                hintText: 'Give this day a title...',
                counterText: '',
                filled: false,
                contentPadding: EdgeInsets.zero,
                border: InputBorder.none,
                enabledBorder: InputBorder.none,
                focusedBorder: InputBorder.none,
              ),
            ),
            const SizedBox(height: 12),
            const Text(
              'Dear diary,',
              style: TextStyle(
                fontStyle: FontStyle.italic,
                fontSize: 16,
                color: AppTheme.primaryDark,
              ),
            ),
            const SizedBox(height: 12),
            CustomPaint(
              painter: const DiaryLines(),
              child: Padding(
                padding: const EdgeInsets.only(left: 25, right: 4, bottom: 10),
                child: TextField(
                  controller: _body,
                  enabled: !locked,
                  minLines: 8,
                  maxLines: null,
                  maxLength: 10000,
                  textCapitalization: TextCapitalization.sentences,
                  style: const TextStyle(
                    fontSize: 16,
                    height: 1.875,
                    color: AppTheme.textPrimary,
                  ),
                  strutStyle: const StrutStyle(
                    fontSize: 16,
                    height: 1.875,
                    forceStrutHeight: true,
                  ),
                  decoration: const InputDecoration(
                    hintText:
                        'What would you like to remember?\nA thought, a feeling, a good day...',
                    hintStyle: TextStyle(
                      fontSize: 16,
                      height: 1.875,
                      color: AppTheme.textHint,
                    ),
                    counterText: '',
                    filled: false,
                    contentPadding: EdgeInsets.zero,
                    border: InputBorder.none,
                    enabledBorder: InputBorder.none,
                    focusedBorder: InputBorder.none,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 18),
            JournalPolaroid(
              photo: photo,
              picking: _picking,
              onPick: locked ? null : () => _pick(ImageSource.gallery),
            ),
            const SizedBox(height: 14),
            Center(
              child: Wrap(
                spacing: 6,
                runSpacing: 4,
                alignment: WrapAlignment.center,
                children: [
                  TextButton.icon(
                    onPressed: locked ? null : () => _pick(ImageSource.gallery),
                    icon: const Icon(Icons.photo_library_outlined, size: 16),
                    label: Text(photo == null ? 'Add photo' : 'Change photo'),
                  ),
                  TextButton.icon(
                    onPressed: locked ? null : () => _pick(ImageSource.camera),
                    icon: const Icon(Icons.camera_alt_outlined, size: 16),
                    label: const Text('Camera'),
                  ),
                  if (photo != null)
                    TextButton(
                      onPressed: locked
                          ? null
                          : () => setState(() {
                              _photo = null;
                              _removePhoto = true;
                              _dirty = true;
                            }),
                      child: const Text('Remove photo'),
                    ),
                ],
              ),
            ),
            if (_error != null) ...[
              const SizedBox(height: 16),
              Text(_error!, style: const TextStyle(color: AppTheme.error)),
              TextButton(
                onPressed: locked ? null : _reload,
                child: Text(
                  _conflict ? 'Reload saved page' : 'Check saved page',
                ),
              ),
            ],
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              child: FilledButton.icon(
                onPressed: locked || !_dirty ? null : _save,
                icon: _saving
                    ? const SizedBox(
                        width: 18,
                        height: 18,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Icon(Icons.bookmark_add_outlined, size: 18),
                label: Text(_saving ? 'Saving your page...' : 'Save this page'),
                style: FilledButton.styleFrom(
                  backgroundColor: AppTheme.primaryDark,
                  padding: const EdgeInsets.symmetric(vertical: 18),
                ),
              ),
            ),
            if (_version > 0)
              Center(
                child: TextButton.icon(
                  onPressed: locked ? null : _delete,
                  icon: const Icon(Icons.delete_outline_rounded, size: 16),
                  label: const Text('Delete this page'),
                ),
              ),
            const SizedBox(height: 12),
            const Center(
              child: Text(
                'PRIVATE · ONLY YOU',
                style: TextStyle(
                  fontSize: 10,
                  letterSpacing: 1.5,
                  color: AppTheme.primaryDark,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
