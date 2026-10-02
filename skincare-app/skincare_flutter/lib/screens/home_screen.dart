import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../models/heatmap_day_model.dart';
import '../widgets/consistency_heatmap_widget.dart';
import '../widgets/routine_step_card.dart';
import '../widgets/discovery_profile_section.dart';
import '../widgets/journal_launcher.dart';
import 'login_screen.dart';
import 'profile_setup_screen.dart';
import 'routine_screen.dart';
import 'skincare_log_screen.dart';
import 'edit_profile_screen.dart';
import 'community_screen.dart';
import 'your_profile_screen.dart';
import 'find_friends_screen.dart';
import 'generating_routine_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  Map<String, dynamic>? _profile, _recommendation, _insights;
  bool _isLoading = true, _routineLoading = false, _insightsLoading = false;
  String? _loadError, _routineError, _insightsError;
  int _request = 0, _heatmapVersion = 0;

  String get _greeting {
    final hour = DateTime.now().hour;
    return hour < 12
        ? 'Good morning'
        : hour < 17
        ? 'Good afternoon'
        : 'Good evening';
  }

  String get _todayLabel {
    final now = DateTime.now();
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return '${days[now.weekday - 1]}, ${now.day} ${months[now.month - 1]}';
  }

  List<Map<String, dynamic>> _steps(String slot) {
    final routine = _recommendation?['routine'];
    if (routine is! Map || routine[slot] is! List) return [];
    return (routine[slot] as List)
        .whereType<Map>()
        .map((s) => Map<String, dynamic>.from(s))
        .toList();
  }

  int? get _todaySessions {
    final days = _insights?['heatmapData'];
    final today = _insights?['today'];
    if (days is! List || today == null) return null;
    for (final day in days.whereType<HeatmapDay>()) {
      if (day.date == today) return day.status;
    }
    return null;
  }

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    if (!mounted) return;
    final request = ++_request;
    setState(() {
      _isLoading = true;
      _loadError = null;
      _routineError = null;
      _insightsError = null;
    });
    try {
      final token = context.read<AuthProvider>().token;
      if (token == null) throw const ApiException('Please sign in again.');
      final profile = await ApiService.getProfile(token);
      if (!mounted || request != _request) return;
      setState(() {
        _profile = profile['id'] != null ? profile : null;
        _recommendation = null;
        _insights = null;
        _isLoading = false;
        _routineLoading = _profile != null;
        _insightsLoading = _profile != null;
        _heatmapVersion++;
      });
      if (_profile != null)
        await Future.wait([
          _loadRoutine(token, request),
          _loadInsights(token, request),
        ]);
    } catch (e) {
      if (mounted && request == _request)
        setState(() {
          _loadError = e.toString();
          _isLoading = false;
        });
    }
  }

  Future<void> _loadRoutine(String token, int request) async {
    try {
      final data = await ApiService.getRecommendations(token);
      if (data['recommendation'] is! Map)
        throw const ApiException(
          'Your routine is incomplete. Please generate again.',
        );
      if (mounted && request == _request)
        setState(
          () => _recommendation = Map<String, dynamic>.from(
            data['recommendation'] as Map,
          ),
        );
    } catch (e) {
      if (mounted && request == _request)
        setState(() => _routineError = e.toString());
    } finally {
      if (mounted && request == _request)
        setState(() => _routineLoading = false);
    }
  }

  Future<void> _loadInsights(String token, int request) async {
    try {
      final now = DateTime.now();
      final data = await ApiService.getMonthlyHeatmap(
        token,
        now.year,
        now.month,
      );
      if (mounted && request == _request) setState(() => _insights = data);
    } catch (e) {
      if (mounted && request == _request)
        setState(() => _insightsError = e.toString());
    } finally {
      if (mounted && request == _request)
        setState(() => _insightsLoading = false);
    }
  }

  Future<void> _open(Widget screen, {bool refresh = false}) async {
    await Navigator.of(
      context,
    ).push(MaterialPageRoute<void>(builder: (_) => screen));
    if (mounted && refresh) await _loadData();
  }

  void _refreshDiscoveryActivity() {
    final token = context.read<AuthProvider>().token;
    if (token == null) return;
    setState(() => _heatmapVersion++);
    _loadInsights(token, _request);
  }

  void _openRoutine() {
    if (_recommendation != null) {
      _open(RoutineScreen(recommendation: _recommendation!));
    } else {
      _open(const GeneratingRoutineScreen(), refresh: true);
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final name = auth.userName?.trim().split(' ').first ?? '';
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        toolbarHeight: 76,
        backgroundColor: AppTheme.background,
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 34,
              height: 34,
              decoration: BoxDecoration(
                color: AppTheme.primaryDark,
                borderRadius: BorderRadius.circular(11),
              ),
              child: const Icon(
                Icons.spa_outlined,
                color: Colors.white,
                size: 19,
              ),
            ),
            const SizedBox(width: 10),
            Text(
              'Corr',
              style: GoogleFonts.playfairDisplay(
                fontSize: 25,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            tooltip: 'Refresh dashboard',
            onPressed: _isLoading ? null : _loadData,
            icon: const Icon(Icons.refresh_rounded),
          ),
          if (_profile != null)
            IconButton(
              tooltip: 'Your profile',
              icon: const Icon(Icons.person_outline_rounded),
              onPressed: () => _open(
                YourProfileScreen(
                  profile: _profile!,
                  recommendation: _recommendation,
                ),
                refresh: true,
              ),
            ),
          IconButton(
            tooltip: 'Sign out',
            icon: const Icon(Icons.logout_rounded),
            onPressed: () async {
              final navigator = Navigator.of(context);
              await auth.logout();
              if (!mounted) return;
              navigator.pushAndRemoveUntil(
                MaterialPageRoute<void>(builder: (_) => const LoginScreen()),
                (_) => false,
              );
            },
          ),
          const SizedBox(width: 12),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _loadError != null
          ? Center(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(
                      Icons.cloud_off_outlined,
                      size: 36,
                      color: AppTheme.textSecondary,
                    ),
                    const SizedBox(height: 16),
                    Text(_loadError!, textAlign: TextAlign.center),
                    const SizedBox(height: 16),
                    FilledButton(
                      onPressed: _loadData,
                      child: const Text('Try again'),
                    ),
                  ],
                ),
              ),
            )
          : RefreshIndicator(
              onRefresh: _loadData,
              child: LayoutBuilder(
                builder: (context, bounds) {
                  final desktop = bounds.maxWidth >= 920;
                  final padding = bounds.maxWidth < 600 ? 18.0 : 32.0;
                  return SingleChildScrollView(
                    physics: const AlwaysScrollableScrollPhysics(),
                    padding: EdgeInsets.fromLTRB(padding, 14, padding, 40),
                    child: Center(
                      child: ConstrainedBox(
                        constraints: const BoxConstraints(maxWidth: 1180),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              _todayLabel.toUpperCase(),
                              style: const TextStyle(
                                fontSize: 11,
                                letterSpacing: 1.8,
                                fontWeight: FontWeight.w700,
                                color: AppTheme.primaryDark,
                              ),
                            ),
                            const SizedBox(height: 10),
                            Text(
                              '$_greeting${name.isEmpty ? '' : ', $name'}.',
                              style: GoogleFonts.playfairDisplay(
                                fontSize: desktop ? 36 : 29,
                                height: 1.2,
                                color: AppTheme.textPrimary,
                              ),
                            ),
                            const SizedBox(height: 8),
                            const Text(
                              'A little care, every day.',
                              style: TextStyle(
                                fontSize: 14,
                                color: AppTheme.textSecondary,
                              ),
                            ),
                            const SizedBox(height: 26),
                            _hero(),
                            const SizedBox(height: 22),
                            if (_profile != null) ...[
                              _stats(),
                              const SizedBox(height: 26),
                              DiscoveryProfileSection(
                                recommendation: _recommendation,
                                dashboard: true,
                                refreshVersion: _request,
                                onReturn: _refreshDiscoveryActivity,
                              ),
                              const SizedBox(height: 26),
                              const JournalLauncher(),
                              const SizedBox(height: 26),
                              if (desktop)
                                Row(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Expanded(
                                      flex: 7,
                                      child: _routineOverview(),
                                    ),
                                    const SizedBox(width: 24),
                                    Expanded(flex: 4, child: _sidebar()),
                                  ],
                                )
                              else ...[
                                _routineOverview(),
                                const SizedBox(height: 24),
                                _sidebar(),
                              ],
                              const SizedBox(height: 28),
                              _sectionTitle(
                                'Your space',
                                'Make room for your daily care.',
                              ),
                              const SizedBox(height: 16),
                              _quickLinks(),
                            ],
                            const SizedBox(height: 32),
                            const Center(
                              child: Text(
                                'Small steps. Steady progress.',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: AppTheme.textSecondary,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
    );
  }

  Widget _hero() {
    final status = _todaySessions;
    final hasProfile = _profile != null;
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(28),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF284E3C), Color(0xFF456D54)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(26),
      ),
      child: LayoutBuilder(
        builder: (context, bounds) {
          final content = Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'YOUR DAILY RITUAL',
                style: TextStyle(
                  color: Color(0xFFC4D8C2),
                  fontSize: 10,
                  letterSpacing: 2.2,
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 14),
              Text(
                !hasProfile
                    ? 'Care that starts with you.'
                    : status == 2
                    ? 'Your daily care, recorded.'
                    : 'Make time for your skin.',
                style: GoogleFonts.playfairDisplay(
                  fontSize: bounds.maxWidth > 600 ? 30 : 26,
                  height: 1.25,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                !hasProfile
                    ? 'Tell us about your skin, goals and budget to create your first routine.'
                    : status == null
                    ? 'Keep your routine close and record each session as you go.'
                    : status == 2
                    ? 'Morning and PM sessions are logged today. Keep building the habit.'
                    : status == 1
                    ? 'One session logged today. Your next small step is waiting.'
                    : 'Start with one session. A consistent habit grows one day at a time.',
                style: const TextStyle(
                  color: Color(0xFFDCE7DB),
                  fontSize: 13,
                  height: 1.7,
                ),
              ),
              const SizedBox(height: 22),
              Wrap(
                spacing: 12,
                runSpacing: 10,
                children: [
                  FilledButton.icon(
                    style: FilledButton.styleFrom(
                      backgroundColor: const Color(0xFFEAF1E5),
                      foregroundColor: const Color(0xFF284E3C),
                      padding: const EdgeInsets.symmetric(
                        horizontal: 20,
                        vertical: 18,
                      ),
                    ),
                    onPressed: () => _open(
                      hasProfile
                          ? SkincareLogScreen(recommendation: _recommendation)
                          : const ProfileSetupScreen(),
                      refresh: true,
                    ),
                    icon: Icon(
                      hasProfile ? Icons.add_rounded : Icons.spa_outlined,
                      size: 18,
                    ),
                    label: Text(
                      hasProfile ? 'Log skincare' : 'Set up your profile',
                    ),
                  ),
                  if (hasProfile)
                    TextButton.icon(
                      style: TextButton.styleFrom(
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(
                          horizontal: 18,
                          vertical: 18,
                        ),
                      ),
                      onPressed: _routineLoading ? null : _openRoutine,
                      icon: const Icon(Icons.arrow_forward_rounded, size: 17),
                      label: Text(
                        _recommendation != null
                            ? 'View your routine'
                            : 'Create a routine',
                      ),
                    ),
                ],
              ),
            ],
          );
          return Row(
            children: [
              Expanded(child: content),
              if (bounds.maxWidth > 740) ...[
                const SizedBox(width: 30),
                Container(
                  width: 130,
                  height: 130,
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.05),
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: Colors.white.withValues(alpha: 0.12),
                    ),
                  ),
                  child: const Icon(
                    Icons.spa_outlined,
                    size: 62,
                    color: Color(0xFFBAD1B7),
                  ),
                ),
              ],
            ],
          );
        },
      ),
    );
  }

  Widget _stats() {
    final value = _insightsLoading
        ? '…'
        : _insightsError != null
        ? '—'
        : '${_insights?['loggedDays'] ?? '—'}';
    return LayoutBuilder(
      builder: (context, bounds) {
        final narrow = bounds.maxWidth < 560;
        final items = [
          _stat(
            Icons.spa_outlined,
            'Skin profile',
            '${_profile?['skinType'] ?? 'Not set'}',
            'Personalised to your skin',
          ),
          _stat(
            Icons.account_balance_wallet_outlined,
            'Product budget',
            '₹${_profile?['budget'] ?? '—'}',
            'Your chosen budget',
          ),
          _stat(
            Icons.calendar_today_outlined,
            'Days logged',
            value,
            _insightsError != null
                ? 'Tracking unavailable · refresh to retry'
                : 'This month · any session',
          ),
        ];
        if (narrow)
          return Column(
            children: [
              for (final item in items)
                Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: item,
                ),
            ],
          );
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            for (var i = 0; i < items.length; i++) ...[
              if (i > 0) const SizedBox(width: 14),
              Expanded(child: items[i]),
            ],
          ],
        );
      },
    );
  }

  Widget _stat(IconData icon, String label, String value, String detail) =>
      CorrPanel(
        padding: const EdgeInsets.all(20),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, size: 19, color: AppTheme.primaryDark),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    label,
                    style: const TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w600,
                      color: AppTheme.textSecondary,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    value,
                    style: const TextStyle(
                      fontSize: 23,
                      fontWeight: FontWeight.w700,
                      color: AppTheme.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    detail,
                    style: const TextStyle(
                      fontSize: 11,
                      height: 1.5,
                      color: AppTheme.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      );
  Widget _sectionTitle(String title, String subtitle) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(
        title,
        style: GoogleFonts.playfairDisplay(
          fontSize: 23,
          fontWeight: FontWeight.w500,
          color: AppTheme.textPrimary,
        ),
      ),
      const SizedBox(height: 6),
      Text(
        subtitle,
        style: const TextStyle(
          fontSize: 12,
          height: 1.5,
          color: AppTheme.textSecondary,
        ),
      ),
    ],
  );

  Widget _routineOverview() => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      _sectionTitle(
        'Your routine, at a glance',
        'A simple plan for the start and end of your day.',
      ),
      const SizedBox(height: 16),
      if (_routineLoading)
        const CorrPanel(
          child: Row(
            children: [
              SizedBox(
                width: 18,
                height: 18,
                child: CircularProgressIndicator(strokeWidth: 2),
              ),
              SizedBox(width: 14),
              Expanded(
                child: Text(
                  'Loading your routine…',
                  style: TextStyle(color: AppTheme.textSecondary),
                ),
              ),
            ],
          ),
        )
      else if (_recommendation == null)
        CorrPanel(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Icon(
                Icons.auto_awesome_outlined,
                color: AppTheme.primaryDark,
                size: 28,
              ),
              const SizedBox(height: 14),
              const Text(
                'Your routine is waiting',
                style: TextStyle(fontSize: 19, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 10),
              Text(
                _routineError ??
                    'Create a routine around your skin profile and budget.',
                style: const TextStyle(
                  fontSize: 13,
                  height: 1.6,
                  color: AppTheme.textSecondary,
                ),
              ),
              const SizedBox(height: 18),
              FilledButton.icon(
                onPressed: _openRoutine,
                icon: const Icon(Icons.auto_awesome_outlined, size: 16),
                label: Text(
                  _routineError != null
                      ? 'Try generating again'
                      : 'Create my routine',
                ),
              ),
            ],
          ),
        )
      else ...[
        _sessionPreview(
          'morning',
          'Morning',
          'Start fresh',
          Icons.wb_sunny_outlined,
        ),
        const SizedBox(height: 16),
        _sessionPreview(
          'evening',
          'Evening',
          'Wind down',
          Icons.nightlight_outlined,
        ),
      ],
    ],
  );
  Widget _sessionPreview(
    String slot,
    String title,
    String subtitle,
    IconData icon,
  ) {
    final steps = _steps(slot);
    return CorrPanel(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: slot == 'morning'
                      ? const Color(0xFFFFF0D7)
                      : const Color(0xFFEBEAF5),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  icon,
                  color: slot == 'morning'
                      ? const Color(0xFF9B773F)
                      : const Color(0xFF747197),
                  size: 20,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      subtitle,
                      style: const TextStyle(
                        fontSize: 11,
                        color: AppTheme.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
              CorrPill(label: '${steps.length} steps'),
            ],
          ),
          const SizedBox(height: 18),
          if (steps.isEmpty)
            const Text(
              'No steps added for this session.',
              style: TextStyle(color: AppTheme.textSecondary),
            ),
          for (final step in steps.take(2))
            RoutineStepCard(step: step, compact: true),
          TextButton.icon(
            onPressed: _openRoutine,
            icon: const Icon(Icons.arrow_forward_rounded, size: 16),
            label: Text(
              steps.length > 2
                  ? 'View all ${steps.length} steps'
                  : 'Open routine',
            ),
          ),
        ],
      ),
    );
  }

  Widget _sidebar() => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      _sectionTitle(
        'Keep showing up',
        'Your consistency, one session at a time.',
      ),
      const SizedBox(height: 16),
      ConsistencyHeatmapWidget(refreshVersion: _heatmapVersion, embedded: true),
      const SizedBox(height: 18),
      CorrPanel(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Made for your skin',
              style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 10),
            const Text(
              'Your goals guide your routine. Update them as your needs change.',
              style: TextStyle(
                fontSize: 12,
                height: 1.6,
                color: AppTheme.textSecondary,
              ),
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                if (_profile?['skinGoals'] is List)
                  for (final goal in _profile!['skinGoals'] as List)
                    CorrPill(label: '$goal'),
              ],
            ),
            const SizedBox(height: 12),
            TextButton.icon(
              onPressed: () =>
                  _open(EditProfileScreen(profile: _profile!), refresh: true),
              icon: const Icon(Icons.tune_rounded, size: 16),
              label: const Text('Edit skin profile'),
            ),
          ],
        ),
      ),
    ],
  );
  Widget _quickLinks() => LayoutBuilder(
    builder: (context, bounds) {
      final columns = bounds.maxWidth > 800
          ? 3
          : bounds.maxWidth > 520
          ? 2
          : 1;
      final width = (bounds.maxWidth - (columns - 1) * 14) / columns;
      return Wrap(
        spacing: 14,
        runSpacing: 14,
        children: [
          SizedBox(
            width: width,
            child: _action(
              Icons.person_outline_rounded,
              'Your profile',
              'Goals, friends and log history',
              () => _open(
                YourProfileScreen(
                  profile: _profile!,
                  recommendation: _recommendation,
                ),
                refresh: true,
              ),
            ),
          ),
          SizedBox(
            width: width,
            child: _action(
              Icons.people_outline_rounded,
              'Community',
              'Ask, share and learn together',
              () => _open(const CommunityScreen()),
            ),
          ),
          SizedBox(
            width: width,
            child: _action(
              Icons.person_add_alt_1_outlined,
              'Find friends',
              'Build your circle of care',
              () => _open(const FindFriendsScreen()),
            ),
          ),
        ],
      );
    },
  );
  Widget _action(
    IconData icon,
    String title,
    String subtitle,
    VoidCallback onTap,
  ) => Material(
    color: AppTheme.surface,
    borderRadius: BorderRadius.circular(20),
    clipBehavior: Clip.antiAlias,
    child: InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(22),
        decoration: BoxDecoration(
          border: Border.all(color: AppTheme.border),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          children: [
            Icon(icon, size: 23, color: AppTheme.primaryDark),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      fontSize: 11,
                      height: 1.5,
                      color: AppTheme.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: 10),
            const Icon(
              Icons.arrow_outward_rounded,
              size: 17,
              color: AppTheme.textSecondary,
            ),
          ],
        ),
      ),
    ),
  );
}
