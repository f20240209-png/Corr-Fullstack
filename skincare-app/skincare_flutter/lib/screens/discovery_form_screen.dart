import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/discovery_card.dart';
import '../models/collection_progress.dart';

class DiscoveryFormScreen extends StatefulWidget {
  final Map<String, dynamic>? discovery;
  const DiscoveryFormScreen({super.key, this.discovery});
  @override
  State<DiscoveryFormScreen> createState() => _DiscoveryFormScreenState();
}

class _DiscoveryFormScreenState extends State<DiscoveryFormScreen> {
  final _form = GlobalKey<FormState>();
  late final TextEditingController _name, _brand, _review;
  late DateTime _date;
  int? _rating;
  String _productType = 'other';
  Uint8List? _photo;
  bool _saving = false, _picking = false;
  String? _error;
  bool get _editing => widget.discovery != null;
  @override
  void initState() {
    super.initState();
    final item = widget.discovery;
    _name = TextEditingController(text: item?['productName'] as String? ?? '');
    _brand = TextEditingController(text: item?['brand'] as String? ?? '');
    _review = TextEditingController(text: item?['review'] as String? ?? '');
    _date = item == null
        ? DateTime.now()
        : DateTime.parse(item['discoveredOn'] as String);
    _rating = item?['rating'] as int?;
    _productType = item?['productType'] as String? ?? 'other';
  }

  @override
  void dispose() {
    _name.dispose();
    _brand.dispose();
    _review.dispose();
    super.dispose();
  }

  String get _dateText =>
      '${_date.year}-${_date.month.toString().padLeft(2, '0')}-${_date.day.toString().padLeft(2, '0')}';
  Future<void> _pick(ImageSource source) async {
    if (_picking) return;
    setState(() {
      _picking = true;
      _error = null;
    });
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
      if (mounted) setState(() => _photo = bytes);
    } catch (e) {
      if (mounted)
        setState(
          () => _error = e is ApiException
              ? e.toString()
              : 'Unable to open this photo. Please choose another.',
        );
    } finally {
      if (mounted) setState(() => _picking = false);
    }
  }

  Future<void> _chooseDate() async {
    final date = await showDatePicker(
      context: context,
      initialDate: _date.isAfter(DateTime.now()) ? DateTime.now() : _date,
      firstDate: DateTime(2000),
      lastDate: DateTime.now(),
    );
    if (mounted && date != null) setState(() => _date = date);
  }

  Future<void> _save() async {
    if (_saving || !_form.currentState!.validate()) return;
    if (!_editing && _photo == null) {
      setState(() => _error = 'Add a product photo to collect your discovery.');
      return;
    }
    setState(() {
      _saving = true;
      _error = null;
    });
    try {
      final token = context.read<AuthProvider>().token!;
      final result = await ApiService.saveDiscovery(
        token,
        {
          'productName': _name.text.trim(),
          'brand': _brand.text.trim(),
          'productType': _productType,
          'review': _review.text.trim(),
          'discoveredOn': _dateText,
          'rating': _rating?.toString() ?? '',
          if (_editing) 'version': '${widget.discovery!['version']}',
        },
        id: widget.discovery?['id'] as int?,
        photo: _photo,
      );
      if (result['discovery'] is! Map)
        throw const ApiException('Unable to save this discovery.');
      if (mounted) Navigator.pop(context, true);
    } catch (e) {
      if (mounted) setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) => PopScope(
    canPop: !_saving,
    child: Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Text(_editing ? 'Edit discovery' : 'Collect a discovery'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 680),
            child: AbsorbPointer(
              absorbing: _saving,
              child: Form(
                key: _form,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'A product. A story. Your collection.',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.w700,
                        color: AppTheme.primaryDark,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Add a photo of the product you tried and share your own experience.',
                      style: TextStyle(
                        color: AppTheme.textSecondary,
                        height: 1.5,
                      ),
                    ),
                    const SizedBox(height: 22),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(22),
                      child: AspectRatio(
                        aspectRatio: 1.5,
                        child: _photo != null
                            ? Image.memory(
                                _photo!,
                                fit: BoxFit.contain,
                                errorBuilder: (_, __, ___) => const Center(
                                  child: Text(
                                    'Choose a readable JPG, PNG or WebP photo.',
                                  ),
                                ),
                              )
                            : _editing
                            ? DiscoveryPhoto(
                                path: widget.discovery!['imagePath'] as String,
                                fit: BoxFit.contain,
                              )
                            : Container(
                                color: AppTheme.surface,
                                child: const Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(
                                      Icons.add_a_photo_outlined,
                                      size: 44,
                                      color: AppTheme.primary,
                                    ),
                                    SizedBox(height: 12),
                                    Text('Product photo required'),
                                    SizedBox(height: 6),
                                    Text(
                                      'JPG, PNG or WebP · up to 5 MB',
                                      style: TextStyle(
                                        fontSize: 12,
                                        color: AppTheme.textSecondary,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                      ),
                    ),
                    const SizedBox(height: 10),
                    Wrap(
                      spacing: 10,
                      children: [
                        OutlinedButton.icon(
                          onPressed: _picking
                              ? null
                              : () => _pick(ImageSource.gallery),
                          icon: const Icon(Icons.photo_library_outlined),
                          label: Text(_picking ? 'Opening…' : 'Choose photo'),
                        ),
                        OutlinedButton.icon(
                          onPressed: _picking
                              ? null
                              : () => _pick(ImageSource.camera),
                          icon: const Icon(Icons.camera_alt_outlined),
                          label: const Text('Take photo'),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      controller: _brand,
                      maxLength: 80,
                      decoration: const InputDecoration(labelText: 'Brand'),
                      validator: (value) => (value?.trim().isEmpty ?? true)
                          ? 'Add the brand.'
                          : null,
                    ),
                    const SizedBox(height: 12),
                    TextFormField(
                      controller: _name,
                      maxLength: 120,
                      decoration: const InputDecoration(
                        labelText: 'Product name',
                      ),
                      validator: (value) => (value?.trim().length ?? 0) < 2
                          ? 'Add the product name.'
                          : null,
                    ),
                    const SizedBox(height: 12),
                    DropdownButtonFormField<String>(
                      initialValue: _productType,
                      decoration: const InputDecoration(
                        labelText: 'Product type',
                      ),
                      items: discoveryProductTypes.entries
                          .map(
                            (entry) => DropdownMenuItem(
                              value: entry.key,
                              child: Text(entry.value),
                            ),
                          )
                          .toList(),
                      onChanged: (value) =>
                          setState(() => _productType = value ?? 'other'),
                    ),
                    const SizedBox(height: 18),
                    TextFormField(
                      controller: _review,
                      minLines: 4,
                      maxLines: 7,
                      maxLength: 2000,
                      decoration: const InputDecoration(
                        labelText: 'Your review',
                        hintText: 'What did you like? How did it feel to use?',
                      ),
                      validator: (value) => (value?.trim().length ?? 0) < 10
                          ? 'Write at least 10 characters.'
                          : null,
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      'Your rating (optional)',
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    Wrap(
                      children: [
                        for (var star = 1; star <= 5; star++)
                          IconButton(
                            tooltip: '$star stars',
                            onPressed: () => setState(() => _rating = star),
                            icon: Icon(
                              (_rating ?? 0) >= star
                                  ? Icons.star_rounded
                                  : Icons.star_outline_rounded,
                              color: const Color(0xFFB78E45),
                              size: 30,
                            ),
                          ),
                        if (_rating != null)
                          TextButton(
                            onPressed: () => setState(() => _rating = null),
                            child: const Text('Clear'),
                          ),
                      ],
                    ),
                    OutlinedButton.icon(
                      onPressed: _chooseDate,
                      icon: const Icon(Icons.calendar_today_outlined),
                      label: Text('Tried on $_dateText'),
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      'Each distinct product counts once. Your review reflects your personal experience.',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppTheme.textSecondary,
                        height: 1.5,
                      ),
                    ),
                    if (_error != null)
                      Padding(
                        padding: const EdgeInsets.only(top: 16),
                        child: Text(
                          _error!,
                          style: const TextStyle(color: AppTheme.error),
                        ),
                      ),
                    const SizedBox(height: 22),
                    SizedBox(
                      width: double.infinity,
                      child: FilledButton.icon(
                        onPressed: _saving || _picking ? null : _save,
                        icon: _saving
                            ? const SizedBox(
                                width: 18,
                                height: 18,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                ),
                              )
                            : const Icon(Icons.collections_bookmark_outlined),
                        label: Text(
                          _saving
                              ? 'Saving your card…'
                              : _editing
                              ? 'Save changes'
                              : 'Add to my collection',
                        ),
                        style: FilledButton.styleFrom(
                          padding: const EdgeInsets.all(18),
                        ),
                      ),
                    ),
                    const SizedBox(height: 32),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
