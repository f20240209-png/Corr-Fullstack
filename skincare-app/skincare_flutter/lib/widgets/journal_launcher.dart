import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../screens/journal_screen.dart';

class JournalLauncher extends StatelessWidget {
  const JournalLauncher({super.key});
  @override
  Widget build(BuildContext context) => Material(
    color: AppTheme.surfaceWarm,
    borderRadius: BorderRadius.circular(24),
    clipBehavior: Clip.antiAlias,
    child: InkWell(
      onTap: () => Navigator.push(
        context,
        MaterialPageRoute<void>(builder: (_) => const JournalScreen()),
      ),
      child: Container(
        padding: const EdgeInsets.all(22),
        decoration: BoxDecoration(
          border: Border.all(color: AppTheme.border),
          borderRadius: BorderRadius.circular(24),
        ),
        child: Row(
          children: [
            Container(
              width: 46,
              height: 52,
              decoration: BoxDecoration(
                color: const Color(0xFFE1E8DA),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Icon(
                Icons.auto_stories_outlined,
                color: AppTheme.primaryDark,
                size: 26,
              ),
            ),
            const SizedBox(width: 16),
            const Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Skincare Journal',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
                  ),
                  SizedBox(height: 6),
                  Text(
                    'A private page for anything on your mind.',
                    style: TextStyle(
                      fontSize: 12,
                      height: 1.5,
                      color: AppTheme.textSecondary,
                    ),
                  ),
                  SizedBox(height: 8),
                  Row(
                    children: [
                      Icon(
                        Icons.lock_outline_rounded,
                        size: 13,
                        color: AppTheme.primaryDark,
                      ),
                      SizedBox(width: 4),
                      Flexible(
                        child: Text(
                          'Only you can open these pages.',
                          style: TextStyle(
                            fontSize: 10,
                            color: AppTheme.primaryDark,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(width: 8),
            const Icon(
              Icons.arrow_outward_rounded,
              size: 18,
              color: AppTheme.primaryDark,
            ),
          ],
        ),
      ),
    ),
  );
}
