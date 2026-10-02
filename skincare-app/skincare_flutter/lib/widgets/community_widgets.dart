import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_theme.dart';
import '../models/community_post_model.dart';
import 'routine_step_card.dart';

const communityCategories = [
  'Acne',
  'Oily',
  'Dry',
  'Sensitive',
  'Anti-aging',
  'Brightening',
  'Hydration',
  'General',
];

String communityLabel(String value) => value.isEmpty
    ? 'General'
    : '${value[0].toUpperCase()}${value.substring(1)}';

String communityTimeAgo(DateTime date) {
  final difference = DateTime.now().difference(date);
  if (difference.inMinutes < 1) return 'Just now';
  if (difference.inMinutes < 60) return '${difference.inMinutes}m ago';
  if (difference.inHours < 24) return '${difference.inHours}h ago';
  if (difference.inDays < 7) return '${difference.inDays}d ago';
  return '${date.day}/${date.month}/${date.year}';
}

class CommunityHero extends StatelessWidget {
  final VoidCallback onAsk;
  const CommunityHero({super.key, required this.onAsk});
  @override
  Widget build(BuildContext context) => Container(
    width: double.infinity,
    padding: const EdgeInsets.all(24),
    decoration: BoxDecoration(
      gradient: const LinearGradient(
        colors: [Color(0xFF284E3C), Color(0xFF456D54)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      borderRadius: BorderRadius.circular(26),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Row(
          children: [
            Icon(Icons.forum_outlined, color: Color(0xFFDCE7DB), size: 18),
            SizedBox(width: 8),
            Text(
              'THE CORR COMMUNITY',
              style: TextStyle(
                fontSize: 10,
                letterSpacing: 1.6,
                color: Color(0xFFDCE7DB),
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
        const SizedBox(height: 14),
        Text(
          'A little advice.\nA lot of care.',
          style: GoogleFonts.playfairDisplay(
            fontSize: 30,
            height: 1.2,
            color: Colors.white,
          ),
        ),
        const SizedBox(height: 12),
        const Text(
          'Ask a question, share what worked, and learn from each other.',
          style: TextStyle(color: Color(0xFFDCE7DB), fontSize: 13, height: 1.6),
        ),
        const SizedBox(height: 18),
        FilledButton.icon(
          style: FilledButton.styleFrom(
            backgroundColor: const Color(0xFFEAF1E5),
            foregroundColor: const Color(0xFF284E3C),
            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
          ),
          onPressed: onAsk,
          icon: const Icon(Icons.add_rounded, size: 18),
          label: const Text('Ask a question'),
        ),
      ],
    ),
  );
}

class CommunityStateCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String message;
  final String? actionLabel;
  final VoidCallback? onAction;
  const CommunityStateCard({
    super.key,
    required this.icon,
    required this.title,
    required this.message,
    this.actionLabel,
    this.onAction,
  });
  @override
  Widget build(BuildContext context) => SizedBox(
    width: double.infinity,
    child: CorrPanel(
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppTheme.surfaceWarm,
              borderRadius: BorderRadius.circular(18),
            ),
            child: Icon(icon, color: AppTheme.primaryDark, size: 26),
          ),
          const SizedBox(height: 14),
          Text(
            title,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 8),
          Text(
            message,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 13,
              height: 1.6,
              color: AppTheme.textSecondary,
            ),
          ),
          if (onAction != null) ...[
            const SizedBox(height: 16),
            OutlinedButton(
              onPressed: onAction,
              child: Text(actionLabel ?? 'Retry'),
            ),
          ],
        ],
      ),
    ),
  );
}

class CommunityAuthor extends StatelessWidget {
  final String name;
  final DateTime date;
  const CommunityAuthor({super.key, required this.name, required this.date});
  @override
  Widget build(BuildContext context) => Row(
    children: [
      CircleAvatar(
        radius: 16,
        backgroundColor: AppTheme.surfaceWarm,
        child: Icon(
          name == 'Anonymous'
              ? Icons.visibility_off_outlined
              : Icons.person_outline,
          size: 17,
          color: AppTheme.primaryDark,
        ),
      ),
      const SizedBox(width: 9),
      Expanded(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              name,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 2),
            Text(
              communityTimeAgo(date),
              style: const TextStyle(
                fontSize: 11,
                color: AppTheme.textSecondary,
              ),
            ),
          ],
        ),
      ),
    ],
  );
}

class CommunityPostCard extends StatelessWidget {
  final CommunityPost post;
  final VoidCallback onTap;
  const CommunityPostCard({super.key, required this.post, required this.onTap});
  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(bottom: 14),
    child: Material(
      color: AppTheme.surface,
      borderRadius: BorderRadius.circular(22),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(22),
            border: Border.all(color: AppTheme.border),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              CommunityAuthor(name: post.author, date: post.createdAt),
              const SizedBox(height: 14),
              Wrap(
                spacing: 7,
                runSpacing: 7,
                children: [
                  CorrPill(label: communityLabel(post.category)),
                  if (post.skinType != null)
                    CorrPill(label: '${communityLabel(post.skinType!)} skin'),
                ],
              ),
              const SizedBox(height: 12),
              Text(
                post.question,
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  fontSize: 17,
                  height: 1.4,
                  fontWeight: FontWeight.w700,
                ),
              ),
              if (post.details?.trim().isNotEmpty == true) ...[
                const SizedBox(height: 8),
                Text(
                  post.details!,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 13,
                    height: 1.5,
                    color: AppTheme.textSecondary,
                  ),
                ),
              ],
              const SizedBox(height: 16),
              const Divider(height: 1),
              const SizedBox(height: 12),
              Wrap(
                spacing: 14,
                runSpacing: 9,
                children: [
                  _metric(
                    Icons.chat_bubble_outline_rounded,
                    '${post.answerCount} ${post.answerCount == 1 ? 'reply' : 'replies'}',
                  ),
                  _metric(Icons.favorite_border_rounded, '${post.likes} likes'),
                  Text(
                    post.answerCount == 0
                        ? 'Be the first to reply'
                        : 'Join the conversation',
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppTheme.primaryDark,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    ),
  );
  Widget _metric(IconData icon, String label) => Row(
    mainAxisSize: MainAxisSize.min,
    children: [
      Icon(icon, size: 15, color: AppTheme.textSecondary),
      const SizedBox(width: 5),
      Text(
        label,
        style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary),
      ),
    ],
  );
}

class CommunityPrivacyToggle extends StatelessWidget {
  final bool value;
  final ValueChanged<bool>? onChanged;
  final bool answering;
  const CommunityPrivacyToggle({
    super.key,
    required this.value,
    required this.onChanged,
    this.answering = false,
  });
  @override
  Widget build(BuildContext context) => SwitchListTile.adaptive(
    contentPadding: EdgeInsets.zero,
    activeTrackColor: AppTheme.primaryDark,
    title: Text(
      answering ? 'Reply anonymously' : 'Post anonymously',
      style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
    ),
    subtitle: const Text(
      'Show Anonymous instead of your name.',
      style: TextStyle(fontSize: 12, color: AppTheme.textSecondary),
    ),
    value: value,
    onChanged: onChanged,
  );
}
