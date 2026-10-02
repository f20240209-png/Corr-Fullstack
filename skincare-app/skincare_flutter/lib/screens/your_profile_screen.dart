import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/consistency_heatmap_widget.dart';
import '../widgets/discovery_profile_section.dart';
import '../widgets/journal_launcher.dart';
import 'edit_profile_screen.dart';
import 'friend_profile_screen.dart';

class YourProfileScreen extends StatefulWidget {
  final Map<String, dynamic> profile;
  final Map<String, dynamic>? recommendation;
  const YourProfileScreen({
    super.key,
    required this.profile,
    this.recommendation,
  });

  @override
  State<YourProfileScreen> createState() => _YourProfileScreenState();
}

class _YourProfileScreenState extends State<YourProfileScreen> {
  List<Map<String, dynamic>> _friends = [];
  List<Map<String, dynamic>> _logs = [];
  bool _loadingFriends = true;
  bool _loadingLogs = true;
  int _heatmapVersion = 0;
  String? _friendsError;
  String? _logsError;

  @override
  void initState() {
    super.initState();
    _loadFriends();
    _loadLogs();
  }

  Future<void> _loadFriends() async {
    if (mounted)
      setState(() {
        _loadingFriends = true;
        _friendsError = null;
      });
    try {
      final token = context.read<AuthProvider>().token!;
      final data = await ApiService.getFriends(token);
      if (!mounted) return;
      setState(
        () => _friends = List<Map<String, dynamic>>.from(data['friends'] ?? []),
      );
    } catch (e) {
      if (mounted) setState(() => _friendsError = e.toString());
    } finally {
      if (mounted) setState(() => _loadingFriends = false);
    }
  }

  Future<void> _loadLogs() async {
    if (mounted)
      setState(() {
        _loadingLogs = true;
        _logsError = null;
      });
    try {
      final token = context.read<AuthProvider>().token!;
      final data = await ApiService.getSkincareLogs(token);
      if (!mounted) return;
      setState(
        () => _logs = List<Map<String, dynamic>>.from(data['logs'] ?? []),
      );
    } catch (e) {
      if (mounted) setState(() => _logsError = e.toString());
    } finally {
      if (mounted) setState(() => _loadingLogs = false);
    }
  }

  String _timeAgo(String dateStr) {
    final diff = DateTime.now().difference(DateTime.parse(dateStr).toLocal());
    if (diff.inMinutes < 60) return '${diff.inMinutes}m ago';
    if (diff.inHours < 24) return '${diff.inHours}h ago';
    return '${diff.inDays}d ago';
  }

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        backgroundColor: AppTheme.surface,
        foregroundColor: AppTheme.textPrimary,
        elevation: 0,
        title: const Text(
          'Your Profile',
          style: TextStyle(
            fontWeight: FontWeight.w600,
            color: AppTheme.textPrimary,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(
              Icons.edit_outlined,
              color: AppTheme.textSecondary,
              size: 20,
            ),
            onPressed: () => Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => EditProfileScreen(profile: widget.profile),
              ),
            ),
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(height: 1, color: AppTheme.border),
        ),
      ),
      body: RefreshIndicator(
        color: AppTheme.primary,
        onRefresh: () async {
          await Future.wait([_loadFriends(), _loadLogs()]);
          if (mounted) setState(() => _heatmapVersion++);
        },
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.all(20),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 1100),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // ── Profile header ────────────────────────────────────────────
                  Row(
                    children: [
                      CircleAvatar(
                        radius: 30,
                        backgroundColor: AppTheme.primary.withOpacity(0.12),
                        child: Text(
                          (auth.userName?.isNotEmpty == true
                                  ? auth.userName![0]
                                  : '?')
                              .toUpperCase(),
                          style: const TextStyle(
                            color: AppTheme.primary,
                            fontWeight: FontWeight.bold,
                            fontSize: 24,
                          ),
                        ),
                      ),
                      const SizedBox(width: 14),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            auth.userName ?? '',
                            style: const TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.w700,
                              color: AppTheme.textPrimary,
                            ),
                          ),
                          const Text(
                            'Your skincare profile',
                            style: TextStyle(
                              fontSize: 12,
                              color: AppTheme.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),

                  // ── Skin stats ────────────────────────────────────────────────
                  _sectionLabel('SKIN PROFILE'),
                  const SizedBox(height: 12),
                  _card(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _stat(
                          Icons.face_outlined,
                          widget.profile['skinType'] as String? ?? '-',
                          'Skin Type',
                        ),
                        _divV(),
                        _stat(
                          Icons.currency_rupee_rounded,
                          '${widget.profile['budget']}',
                          'Budget/mo',
                        ),
                        _divV(),
                        _stat(
                          Icons.flag_outlined,
                          '${(widget.profile['skinGoals'] as List).length}',
                          'Goals',
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 28),

                  DiscoveryProfileSection(
                    key: ValueKey('discoveries-$_heatmapVersion'),
                    recommendation: widget.recommendation,
                  ),
                  const SizedBox(height: 28),

                  const JournalLauncher(),
                  const SizedBox(height: 28),

                  // ── Friends ───────────────────────────────────────────────────
                  Row(
                    children: [
                      _sectionLabel('FRIENDS'),
                      const SizedBox(width: 8),
                      if (!_loadingFriends)
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 2,
                          ),
                          decoration: BoxDecoration(
                            color: AppTheme.primary.withOpacity(0.10),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text(
                            '${_friends.length}',
                            style: const TextStyle(
                              fontSize: 11,
                              color: AppTheme.primary,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  _loadingFriends
                      ? const Center(
                          child: CircularProgressIndicator(
                            color: AppTheme.primary,
                          ),
                        )
                      : _friendsError != null
                      ? _card(child: Text(_friendsError!))
                      : _friends.isEmpty
                      ? _card(
                          child: Column(
                            children: [
                              Icon(
                                Icons.people_outline_rounded,
                                size: 40,
                                color: AppTheme.border,
                              ),
                              const SizedBox(height: 10),
                              const Text(
                                'No friends yet',
                                style: TextStyle(
                                  fontWeight: FontWeight.w600,
                                  color: AppTheme.textPrimary,
                                ),
                              ),
                              const SizedBox(height: 4),
                              const Text(
                                'Use Find Friends to connect with others',
                                style: TextStyle(
                                  color: AppTheme.textSecondary,
                                  fontSize: 13,
                                ),
                              ),
                            ],
                          ),
                        )
                      : Column(
                          children: _friends
                              .map((f) => _friendTile(f))
                              .toList(),
                        ),
                  const SizedBox(height: 28),

                  // ── Monthly consistency ────────────────────────────────────────
                  _sectionLabel('MONTHLY CONSISTENCY'),
                  const SizedBox(height: 12),
                  ConsistencyHeatmapWidget(refreshVersion: _heatmapVersion),
                  const SizedBox(height: 28),

                  // ── Past logs ─────────────────────────────────────────────────
                  _sectionLabel('SKINCARE HISTORY'),
                  const SizedBox(height: 12),
                  _loadingLogs
                      ? const Center(
                          child: CircularProgressIndicator(
                            color: AppTheme.primary,
                          ),
                        )
                      : _logsError != null
                      ? _card(child: Text(_logsError!))
                      : _logs.isEmpty
                      ? _card(
                          child: Column(
                            children: [
                              Icon(
                                Icons.photo_library_outlined,
                                size: 40,
                                color: AppTheme.border,
                              ),
                              const SizedBox(height: 10),
                              const Text(
                                'No logs yet',
                                style: TextStyle(
                                  fontWeight: FontWeight.w600,
                                  color: AppTheme.textPrimary,
                                ),
                              ),
                              const SizedBox(height: 4),
                              const Text(
                                'Log your skincare routine to see history here',
                                style: TextStyle(
                                  color: AppTheme.textSecondary,
                                  fontSize: 13,
                                ),
                              ),
                            ],
                          ),
                        )
                      : Column(
                          children: _logs.map((l) => _logCard(l)).toList(),
                        ),
                  const SizedBox(height: 20),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  // ── Friend tile ────────────────────────────────────────────────────────────
  Widget _friendTile(Map<String, dynamic> f) {
    return GestureDetector(
      onTap: () => Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => FriendProfileScreen(
            userId: f['id'] as int,
            name: f['name'] as String? ?? '',
          ),
        ),
      ),
      child: Container(
        margin: const EdgeInsets.only(bottom: 8),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: AppTheme.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppTheme.border),
        ),
        child: Row(
          children: [
            CircleAvatar(
              radius: 20,
              backgroundColor: AppTheme.primary.withOpacity(0.12),
              child: Text(
                (f['name'] as String? ?? '?')[0].toUpperCase(),
                style: const TextStyle(
                  color: AppTheme.primary,
                  fontWeight: FontWeight.bold,
                  fontSize: 15,
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    f['name'] as String? ?? '',
                    style: const TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 13,
                      color: AppTheme.textPrimary,
                    ),
                  ),
                  Text(
                    '@${f['username']}',
                    style: const TextStyle(
                      fontSize: 11,
                      color: AppTheme.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            if (f['skinType'] != null)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: AppTheme.primary.withOpacity(0.08),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  f['skinType'] as String,
                  style: const TextStyle(color: AppTheme.primary, fontSize: 11),
                ),
              ),
            const SizedBox(width: 6),
            const Icon(
              Icons.chevron_right_rounded,
              color: AppTheme.textHint,
              size: 18,
            ),
          ],
        ),
      ),
    );
  }

  // ── Log card ───────────────────────────────────────────────────────────────
  Widget _logCard(Map<String, dynamic> log) {
    final products = List<String>.from(log['productsUsed'] ?? []);
    final hasPhoto =
        log['photo'] != null && (log['photo'] as String).isNotEmpty;

    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppTheme.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(12),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 16,
                  backgroundColor: AppTheme.primary.withOpacity(0.10),
                  child: const Icon(
                    Icons.spa_outlined,
                    color: AppTheme.primary,
                    size: 14,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        log['timeOfDay'] as String? ?? '',
                        style: const TextStyle(
                          fontWeight: FontWeight.w600,
                          fontSize: 13,
                          color: AppTheme.textPrimary,
                        ),
                      ),
                      Text(
                        _timeAgo(log['createdAt'] as String),
                        style: const TextStyle(
                          fontSize: 11,
                          color: AppTheme.textSecondary,
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 3,
                  ),
                  decoration: BoxDecoration(
                    color: AppTheme.primary.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Text(
                    '${products.length} products',
                    style: const TextStyle(
                      color: AppTheme.primary,
                      fontSize: 11,
                    ),
                  ),
                ),
              ],
            ),
          ),

          if (hasPhoto)
            Builder(
              builder: (ctx) {
                try {
                  final bytes = base64Decode(log['photo'] as String);
                  return ClipRRect(
                    child: Image.memory(
                      bytes,
                      width: double.infinity,
                      height: 180,
                      fit: BoxFit.cover,
                    ),
                  );
                } catch (_) {
                  return const SizedBox.shrink();
                }
              },
            ),

          if (products.isNotEmpty)
            Padding(
              padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
              child: Wrap(
                spacing: 6,
                runSpacing: 6,
                children: products
                    .map(
                      (p) => Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: AppTheme.primary.withOpacity(0.07),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: AppTheme.primary.withOpacity(0.2),
                          ),
                        ),
                        child: Text(
                          p,
                          style: const TextStyle(
                            fontSize: 11,
                            color: AppTheme.primary,
                          ),
                        ),
                      ),
                    )
                    .toList(),
              ),
            ),
        ],
      ),
    );
  }

  Widget _sectionLabel(String t) => Text(
    t,
    style: const TextStyle(
      fontSize: 11,
      fontWeight: FontWeight.w600,
      color: AppTheme.textHint,
      letterSpacing: 1.2,
    ),
  );

  Widget _card({required Widget child}) => Container(
    width: double.infinity,
    padding: const EdgeInsets.all(18),
    decoration: BoxDecoration(
      color: AppTheme.surface,
      borderRadius: BorderRadius.circular(16),
      border: Border.all(color: AppTheme.border),
    ),
    child: child,
  );

  Widget _stat(IconData icon, String value, String label) => Column(
    children: [
      Icon(icon, color: AppTheme.primary, size: 20),
      const SizedBox(height: 5),
      Text(
        value,
        style: const TextStyle(
          fontWeight: FontWeight.w700,
          fontSize: 13,
          color: AppTheme.textPrimary,
        ),
      ),
      Text(
        label,
        style: const TextStyle(fontSize: 11, color: AppTheme.textSecondary),
      ),
    ],
  );

  Widget _divV() => Container(height: 36, width: 1, color: AppTheme.border);
}
