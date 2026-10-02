import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../services/api_service.dart';
import '../models/community_post_model.dart';
import '../theme/app_theme.dart';
import '../widgets/community_widgets.dart';
import 'ask_question_screen.dart';
import 'question_detail_screen.dart';

class CommunityScreen extends StatefulWidget {
  const CommunityScreen({super.key});
  @override
  State<CommunityScreen> createState() => _CommunityScreenState();
}

class _CommunityScreenState extends State<CommunityScreen>
    with SingleTickerProviderStateMixin {
  late final TabController _tabs;
  List<CommunityPost> _posts = [], _mine = [];
  bool _loading = true, _loadingMine = true, _loadingMore = false;
  String? _error, _mineError, _moreError;
  String _category = 'All';
  int _request = 0, _mineRequest = 0, _page = 1, _totalPages = 1;

  @override
  void initState() {
    super.initState();
    _tabs = TabController(length: 2, vsync: this);
    _fetchAll();
    _fetchMine();
  }

  @override
  void dispose() {
    _tabs.dispose();
    super.dispose();
  }

  String get _token =>
      context.read<AuthProvider>().token ??
      (throw const ApiException('Please sign in again.'));

  Future<void> _fetchAll({bool more = false}) async {
    if (!mounted || (more && (_loading || _loadingMore))) return;
    final request = ++_request;
    final page = more ? _page + 1 : 1;
    final category = _category;
    setState(() {
      if (more) {
        _loadingMore = true;
      } else {
        _loading = true;
        _loadingMore = false;
        _error = null;
      }
      _moreError = null;
    });
    try {
      final data = await ApiService.getCommunityPosts(
        _token,
        page: page,
        category: category == 'All' ? null : category.toLowerCase(),
      );
      final posts = (data['posts'] as List)
          .map(
            (p) => CommunityPost.fromJson(Map<String, dynamic>.from(p as Map)),
          )
          .toList();
      if (!mounted || request != _request) return;
      setState(() {
        // Refreshes and filter changes can supersede a pagination request.
        if (more) {
          final ids = _posts.map((p) => p.id).toSet();
          _posts = [..._posts, ...posts.where((p) => ids.add(p.id))];
        } else {
          _posts = posts;
        }
        _page = page;
        _totalPages = (data['totalPages'] as num?)?.toInt() ?? 1;
      });
    } catch (e) {
      if (mounted && request == _request) {
        setState(() {
          if (more) {
            _moreError = e.toString();
          } else {
            _error = e.toString();
          }
        });
      }
    } finally {
      if (mounted && request == _request) {
        setState(() {
          _loading = false;
          _loadingMore = false;
        });
      }
    }
  }

  Future<void> _fetchMine() async {
    if (!mounted) return;
    final request = ++_mineRequest;
    setState(() {
      _loadingMine = true;
      _mineError = null;
    });
    try {
      final data = await ApiService.getMyPosts(_token);
      final posts = (data['posts'] as List)
          .map(
            (p) => CommunityPost.fromJson(Map<String, dynamic>.from(p as Map)),
          )
          .toList();
      if (mounted && request == _mineRequest) setState(() => _mine = posts);
    } catch (e) {
      if (mounted && request == _mineRequest)
        setState(() => _mineError = e.toString());
    } finally {
      if (mounted && request == _mineRequest)
        setState(() => _loadingMine = false);
    }
  }

  Future<void> _open(Widget screen) async {
    await Navigator.push(
      context,
      MaterialPageRoute<void>(builder: (_) => screen),
    );
    if (mounted) await Future.wait([_fetchAll(), _fetchMine()]);
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    backgroundColor: AppTheme.background,
    appBar: AppBar(
      backgroundColor: AppTheme.background,
      title: const Text('Community'),
      actions: [
        IconButton(
          tooltip: 'Ask a question',
          onPressed: () => _open(const AskQuestionScreen()),
          icon: const Icon(Icons.add_comment_outlined),
        ),
        const SizedBox(width: 8),
      ],
    ),
    body: SafeArea(
      top: false,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 960),
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(18, 8, 18, 14),
                child: Container(
                  decoration: BoxDecoration(
                    color: AppTheme.border.withValues(alpha: 0.45),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  padding: const EdgeInsets.all(5),
                  child: TabBar(
                    controller: _tabs,
                    dividerColor: Colors.transparent,
                    indicatorSize: TabBarIndicatorSize.tab,
                    indicator: BoxDecoration(
                      color: AppTheme.surface,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    labelColor: AppTheme.primaryDark,
                    unselectedLabelColor: AppTheme.textSecondary,
                    labelStyle: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w700,
                    ),
                    tabs: const [
                      Tab(text: 'Explore'),
                      Tab(text: 'Your questions'),
                    ],
                  ),
                ),
              ),
              Expanded(
                child: TabBarView(
                  controller: _tabs,
                  children: [_feed(mine: false), _feed(mine: true)],
                ),
              ),
            ],
          ),
        ),
      ),
    ),
  );

  Widget _feed({required bool mine}) {
    final loading = mine ? _loadingMine : _loading;
    final error = mine ? _mineError : _error;
    final posts = mine ? _mine : _posts;
    return RefreshIndicator(
      onRefresh: mine ? _fetchMine : () => _fetchAll(),
      child: ListView(
        key: PageStorageKey(mine ? 'my-community-posts' : 'community-feed'),
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(18, 0, 18, 32),
        children: [
          CommunityHero(onAsk: () => _open(const AskQuestionScreen())),
          const SizedBox(height: 22),
          if (!mine) ...[
            const Text(
              'Find your conversation',
              style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 7,
              children: ['All', ...communityCategories].map((category) {
                final selected = category == _category;
                return ChoiceChip(
                  label: Text(category),
                  selected: selected,
                  showCheckmark: false,
                  selectedColor: AppTheme.primaryDark,
                  backgroundColor: AppTheme.surface,
                  side: BorderSide(
                    color: selected ? AppTheme.primaryDark : AppTheme.border,
                  ),
                  labelStyle: TextStyle(
                    color: selected ? Colors.white : AppTheme.textSecondary,
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                  ),
                  onSelected: (_) {
                    if (selected) return;
                    setState(() => _category = category);
                    _fetchAll();
                  },
                );
              }).toList(),
            ),
            const SizedBox(height: 22),
          ],
          Text(
            mine ? 'Your questions' : 'Latest conversations',
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 14),
          if (loading)
            const Padding(
              padding: EdgeInsets.all(48),
              child: Center(child: CircularProgressIndicator()),
            )
          else if (error != null)
            CommunityStateCard(
              icon: Icons.cloud_off_outlined,
              title: 'Could not load questions',
              message: error,
              onAction: mine ? _fetchMine : () => _fetchAll(),
            )
          else if (posts.isEmpty)
            CommunityStateCard(
              icon: Icons.chat_bubble_outline_rounded,
              title: mine
                  ? 'Start your first conversation'
                  : 'Room for a new conversation',
              message: mine
                  ? 'Questions you post will live here, along with replies from the community.'
                  : 'No questions in this topic yet. Share what is on your mind.',
              actionLabel: 'Ask a question',
              onAction: () => _open(const AskQuestionScreen()),
            )
          else ...[
            ...posts.map(
              (post) => CommunityPostCard(
                post: post,
                onTap: () => _open(QuestionDetailScreen(postId: post.id)),
              ),
            ),
            if (!mine && _moreError != null)
              Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Text(
                  _moreError!,
                  style: const TextStyle(color: AppTheme.error),
                ),
              ),
            if (!mine && _page < _totalPages)
              Center(
                child: OutlinedButton.icon(
                  onPressed: _loadingMore ? null : () => _fetchAll(more: true),
                  icon: _loadingMore
                      ? const SizedBox(
                          width: 16,
                          height: 16,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Icon(Icons.expand_more_rounded, size: 18),
                  label: Text(
                    _moreError != null
                        ? 'Retry more questions'
                        : 'More conversations',
                  ),
                ),
              ),
          ],
        ],
      ),
    );
  }
}
