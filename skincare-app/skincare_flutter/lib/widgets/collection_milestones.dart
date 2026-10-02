import 'package:flutter/material.dart';
import '../models/collection_progress.dart';
import '../theme/app_theme.dart';

class CollectionMilestones extends StatelessWidget {
  final int count;
  final bool compact;
  const CollectionMilestones({
    super.key,
    required this.count,
    this.compact = false,
  });
  @override
  Widget build(BuildContext context) {
    final progress = CollectionProgress(count);
    final next = progress.next;
    return Container(
      padding: EdgeInsets.all(compact ? 14 : 20),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        border: Border.all(color: AppTheme.border),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(
                Icons.workspace_premium_outlined,
                size: 20,
                color: AppTheme.primaryDark,
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  compact
                      ? 'Collection milestones'
                      : 'Little discoveries, lovely milestones.',
                  style: TextStyle(
                    fontSize: compact ? 14 : 17,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            next == null
                ? 'All four milestones collected.'
                : '${next.target - progress.count} more ${next.target - progress.count == 1 ? 'card' : 'cards'} to ${next.name}',
            style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary),
          ),
          const SizedBox(height: 10),
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: LinearProgressIndicator(
              value: progress.fraction,
              minHeight: 6,
              backgroundColor: AppTheme.border,
              color: AppTheme.primaryDark,
            ),
          ),
          const SizedBox(height: 14),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: collectionMilestones.map((milestone) {
              final earned = progress.count >= milestone.target;
              return Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 10,
                  vertical: 9,
                ),
                decoration: BoxDecoration(
                  color: earned
                      ? const Color(0xFFEAF1E5)
                      : AppTheme.surfaceWarm,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppTheme.border),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      earned
                          ? Icons.verified_rounded
                          : Icons.lock_outline_rounded,
                      size: 16,
                      color: earned
                          ? AppTheme.primaryDark
                          : AppTheme.textSecondary,
                    ),
                    const SizedBox(width: 6),
                    Text(
                      compact
                          ? '${milestone.target} cards'
                          : '${milestone.name} · ${milestone.target}',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                        color: earned
                            ? AppTheme.primaryDark
                            : AppTheme.textSecondary,
                      ),
                    ),
                  ],
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}
