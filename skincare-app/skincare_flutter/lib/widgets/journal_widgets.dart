import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../models/journal_dates.dart';

class JournalPhoto extends StatefulWidget {
  final String path;
  const JournalPhoto({super.key, required this.path});
  @override
  State<JournalPhoto> createState() => _JournalPhotoState();
}

class _JournalPhotoState extends State<JournalPhoto> {
  String? _key;
  Future<Uint8List>? _photo;
  @override
  Widget build(BuildContext context) {
    final token = context.watch<AuthProvider>().token;
    final key = '$token:${widget.path}';
    if (_key != key) {
      _key = key;
      _photo = token == null
          ? Future.error(const ApiException('Please sign in again.'))
          : ApiService.getJournalPhoto(token, widget.path);
    }
    return FutureBuilder<Uint8List>(
      key: ValueKey(key),
      future: _photo,
      builder: (context, state) {
        if (state.hasError)
          return Center(
            child: IconButton(
              tooltip: 'Retry journal photo',
              onPressed: () => setState(() => _key = null),
              icon: const Icon(
                Icons.refresh_rounded,
                color: AppTheme.primaryDark,
              ),
            ),
          );
        if (!state.hasData)
          return const Center(
            child: SizedBox(
              width: 22,
              height: 22,
              child: CircularProgressIndicator(strokeWidth: 2),
            ),
          );
        return Image.memory(
          state.data!,
          width: double.infinity,
          height: double.infinity,
          fit: BoxFit.cover,
          gaplessPlayback: false,
          errorBuilder: (_, __, ___) =>
              const Center(child: Icon(Icons.broken_image_outlined)),
        );
      },
    );
  }
}

class JournalPolaroid extends StatelessWidget {
  final Widget? photo;
  final VoidCallback? onPick;
  final bool picking;
  const JournalPolaroid({
    super.key,
    this.photo,
    this.onPick,
    this.picking = false,
  });
  @override
  Widget build(BuildContext context) => Center(
    child: Padding(
      padding: const EdgeInsets.fromLTRB(8, 18, 8, 8),
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 285),
        child: Transform.rotate(
          angle: -0.025,
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              Material(
                color: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(3),
                  side: const BorderSide(color: Color(0xFFE8E2D9)),
                ),
                elevation: 4,
                shadowColor: AppTheme.shadow,
                child: InkWell(
                  onTap: onPick,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(12, 12, 12, 24),
                    child: Column(
                      children: [
                        AspectRatio(
                          aspectRatio: 1,
                          child: ColoredBox(
                            color: const Color(0xFFECEFE7),
                            child:
                                photo ??
                                Center(
                                  child: Padding(
                                    padding: const EdgeInsets.all(18),
                                    child: Column(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        if (picking)
                                          const CircularProgressIndicator(
                                            strokeWidth: 2,
                                          )
                                        else
                                          const Icon(
                                            Icons.add_a_photo_outlined,
                                            size: 34,
                                            color: AppTheme.primaryDark,
                                          ),
                                        const SizedBox(height: 12),
                                        Text(
                                          picking
                                              ? 'Opening your photo...'
                                              : 'Keep a little moment.',
                                          textAlign: TextAlign.center,
                                          style: const TextStyle(
                                            fontSize: 17,
                                            color: AppTheme.primaryDark,
                                            fontStyle: FontStyle.italic,
                                          ),
                                        ),
                                        const SizedBox(height: 8),
                                        const Text(
                                          'Tap to add any photo you want to remember.',
                                          textAlign: TextAlign.center,
                                          style: TextStyle(
                                            fontSize: 12,
                                            height: 1.5,
                                            color: AppTheme.textSecondary,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                          ),
                        ),
                        const SizedBox(height: 16),
                        const Text(
                          'a moment, just for you',
                          style: TextStyle(
                            fontSize: 14,
                            fontStyle: FontStyle.italic,
                            color: AppTheme.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              Positioned(
                top: -9,
                left: 0,
                right: 0,
                child: Center(
                  child: IgnorePointer(
                    child: Container(
                      width: 82,
                      height: 24,
                      decoration: BoxDecoration(
                        color: const Color(0xBFD7CBAA),
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    ),
  );
}

class DiaryLines extends CustomPainter {
  const DiaryLines();
  @override
  void paint(Canvas canvas, Size size) {
    final rule = Paint()
      ..color = const Color(0xFFDDE2D9)
      ..strokeWidth = 0.8;
    for (var y = 29.0; y < size.height; y += 30) {
      canvas.drawLine(Offset(0, y), Offset(size.width, y), rule);
    }
    final margin = Paint()
      ..color = const Color(0xFFE4C7BD)
      ..strokeWidth = 1;
    canvas.drawLine(const Offset(12, 0), Offset(12, size.height), margin);
  }

  @override
  bool shouldRepaint(covariant DiaryLines oldDelegate) => false;
}

class JournalCalendar extends StatelessWidget {
  final DateTime month, selected;
  final List<Map<String, dynamic>> entries;
  final bool loading;
  final String? error;
  final ValueChanged<int> onMonth;
  final ValueChanged<DateTime> onSelect;
  final VoidCallback onRetry;
  const JournalCalendar({
    super.key,
    required this.month,
    required this.selected,
    required this.entries,
    required this.onMonth,
    required this.onSelect,
    required this.onRetry,
    this.loading = false,
    this.error,
  });
  @override
  Widget build(BuildContext context) {
    final offset = DateTime(month.year, month.month, 1).weekday - 1;
    final days = DateTime(month.year, month.month + 1, 0).day;
    final slots = ((offset + days + 6) ~/ 7) * 7;
    final saved = entries.map((entry) => entry['entryDate']).toSet();
    return Column(
      children: [
        Row(
          children: [
            IconButton(
              tooltip: 'Previous month',
              onPressed:
                  validJournalDay(DateTime(month.year, month.month - 1, 1))
                  ? () => onMonth(-1)
                  : null,
              icon: const Icon(Icons.chevron_left_rounded),
            ),
            Expanded(
              child: Text(
                '${journalMonths[month.month - 1]} ${month.year}',
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontWeight: FontWeight.w700,
                  fontSize: 14,
                ),
              ),
            ),
            IconButton(
              tooltip: 'Next month',
              onPressed:
                  validJournalDay(DateTime(month.year, month.month + 1, 1))
                  ? () => onMonth(1)
                  : null,
              icon: const Icon(Icons.chevron_right_rounded),
            ),
          ],
        ),
        if (loading) const LinearProgressIndicator(minHeight: 2),
        if (error != null) ...[
          Text(
            'Could not load saved dates.',
            style: const TextStyle(color: AppTheme.error, fontSize: 12),
          ),
          TextButton(
            onPressed: onRetry,
            child: const Text('Retry saved dates'),
          ),
        ],
        const SizedBox(height: 8),
        Row(
          children: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
              .map(
                (day) => Expanded(
                  child: Text(
                    day,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 11,
                      color: AppTheme.textSecondary,
                    ),
                  ),
                ),
              )
              .toList(),
        ),
        const SizedBox(height: 6),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: slots,
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 7,
          ),
          itemBuilder: (context, index) {
            final day = index - offset + 1;
            if (day < 1 || day > days) return const SizedBox.shrink();
            final date = DateTime(month.year, month.month, day),
                key = journalDateKey(DateTime(month.year, month.month, day));
            final active = journalDateKey(selected) == key;
            final hasPage = !loading && error == null && saved.contains(key);
            return Semantics(
              button: true,
              label:
                  '${journalDateLabel(date)}${hasPage ? ', saved page' : ''}',
              child: Padding(
                padding: const EdgeInsets.all(2),
                child: Material(
                  color: active
                      ? AppTheme.primaryDark
                      : hasPage
                      ? const Color(0xFFEAF1E5)
                      : Colors.transparent,
                  borderRadius: BorderRadius.circular(10),
                  child: InkWell(
                    borderRadius: BorderRadius.circular(10),
                    onTap: () => onSelect(date),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          '$day',
                          style: TextStyle(
                            fontSize: 12,
                            color: active ? Colors.white : AppTheme.textPrimary,
                          ),
                        ),
                        const SizedBox(height: 3),
                        Container(
                          width: 4,
                          height: 4,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: hasPage
                                ? (active ? Colors.white : AppTheme.primaryDark)
                                : Colors.transparent,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        ),
        const SizedBox(height: 8),
        const Text(
          'A dot marks a saved page.',
          style: TextStyle(fontSize: 11, color: AppTheme.textSecondary),
        ),
      ],
    );
  }
}
