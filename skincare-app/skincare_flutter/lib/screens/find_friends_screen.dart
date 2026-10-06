import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import 'friend_profile_screen.dart';

class FindFriendsScreen extends StatefulWidget {
  const FindFriendsScreen({super.key});

  @override
  State<FindFriendsScreen> createState() => _FindFriendsScreenState();
}

class _FindFriendsScreenState extends State<FindFriendsScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final _searchController = TextEditingController();
  List<Map<String, dynamic>> _searchResults = [];
  List<Map<String, dynamic>> _pendingRequests = [];
  Timer? _searchDebounce;
  int _searchRevision = 0;
  bool _searching = false;
  bool _loadingRequests = true;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _loadPendingRequests();
  }

  @override
  void dispose() {
    _searchDebounce?.cancel();
    _tabController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _loadPendingRequests() async {
    setState(() => _loadingRequests = true);
    try {
      final token = context.read<AuthProvider>().token;
      if (token == null) return;
      final data = await ApiService.getPendingRequests(token);
      if (mounted)
        setState(() {
          _pendingRequests = List<Map<String, dynamic>>.from(
            data['requests'] ?? [],
          );
        });
    } catch (error) {
      if (mounted)
        _showSnack(
          error is ApiException ? error.message : 'Could not load requests.',
          isError: true,
        );
    } finally {
      if (mounted) setState(() => _loadingRequests = false);
    }
  }

  void _queueSearch(String query) {
    _searchDebounce?.cancel();
    final revision = ++_searchRevision;
    if (query.trim().length < 2) {
      setState(() {
        _searchResults = [];
        _searching = false;
      });
      return;
    }
    _searchDebounce = Timer(
      const Duration(milliseconds: 350),
      () => _searchUsers(query, revision),
    );
  }

  Future<void> _searchUsers(String query, int revision) async {
    setState(() => _searching = true);
    try {
      final token = context.read<AuthProvider>().token;
      if (token == null) return;
      final data = await ApiService.searchUsers(token, query.trim());
      if (mounted && revision == _searchRevision)
        setState(() {
          _searchResults = List<Map<String, dynamic>>.from(data['users'] ?? []);
        });
    } catch (error) {
      if (mounted && revision == _searchRevision)
        _showSnack(
          error is ApiException
              ? error.message
              : 'Search is unavailable. Please try again.',
          isError: true,
        );
    } finally {
      if (mounted && revision == _searchRevision)
        setState(() => _searching = false);
    }
  }

  Future<void> _sendRequest(int userId) async {
    try {
      final token = context.read<AuthProvider>().token!;
      final data = await ApiService.sendFriendRequest(token, userId);
      if (mounted)
        setState(() {
          for (final user in _searchResults.where(
            (user) => user['id'] == userId,
          )) {
            user['relationStatus'] = 'PENDING_SENT';
            user['requestId'] = data['request']?['id'];
          }
        });
    } catch (error) {
      if (mounted)
        _showSnack(
          error is ApiException ? error.message : 'Failed to send request',
          isError: true,
        );
    }
  }

  Future<void> _cancelRequest(int requestId) async {
    try {
      final token = context.read<AuthProvider>().token!;
      await ApiService.cancelFriendRequest(token, requestId);
      if (mounted)
        setState(() {
          for (final user in _searchResults.where(
            (user) => user['requestId'] == requestId,
          )) {
            user['relationStatus'] = 'NONE';
            user['requestId'] = null;
          }
        });
    } catch (error) {
      if (mounted)
        _showSnack(
          error is ApiException ? error.message : 'Failed to cancel',
          isError: true,
        );
    }
  }

  Future<void> _acceptRequest(int requestId) async {
    try {
      final token = context.read<AuthProvider>().token!;
      await ApiService.acceptFriendRequest(token, requestId);
      if (mounted)
        setState(() {
          _pendingRequests.removeWhere((request) => request['id'] == requestId);
          for (final user in _searchResults.where(
            (user) => user['requestId'] == requestId,
          )) {
            user['relationStatus'] = 'FRIENDS';
          }
        });
      if (mounted) _showSnack('Friend request accepted!');
    } catch (error) {
      if (mounted)
        _showSnack(
          error is ApiException ? error.message : 'Failed to accept',
          isError: true,
        );
    }
  }

  Future<void> _rejectRequest(int requestId) async {
    try {
      final token = context.read<AuthProvider>().token!;
      await ApiService.rejectFriendRequest(token, requestId);
      if (mounted)
        setState(() {
          _pendingRequests.removeWhere((request) => request['id'] == requestId);
          for (final user in _searchResults.where(
            (user) => user['requestId'] == requestId,
          )) {
            user['relationStatus'] = 'NONE';
            user['requestId'] = null;
          }
        });
    } catch (error) {
      if (mounted)
        _showSnack(
          error is ApiException ? error.message : 'Failed to reject',
          isError: true,
        );
    }
  }

  String _initial(Object? name) {
    final text = name is String ? name.trim() : '';
    return text.isEmpty ? '?' : text.characters.first.toUpperCase();
  }

  void _showSnack(String msg, {bool isError = false}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(msg),
        backgroundColor: isError ? AppTheme.error : AppTheme.primary,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        backgroundColor: AppTheme.surface,
        foregroundColor: AppTheme.textPrimary,
        elevation: 0,
        title: const Text(
          'Find Friends',
          style: TextStyle(
            fontWeight: FontWeight.w600,
            color: AppTheme.textPrimary,
          ),
        ),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(49),
          child: Column(
            children: [
              Container(height: 1, color: AppTheme.border),
              TabBar(
                controller: _tabController,
                indicatorColor: AppTheme.primary,
                labelColor: AppTheme.primary,
                unselectedLabelColor: AppTheme.textHint,
                tabs: [
                  const Tab(text: 'Search'),
                  Tab(
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Text('Requests'),
                        if (_pendingRequests.isNotEmpty) ...[
                          const SizedBox(width: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 6,
                              vertical: 2,
                            ),
                            decoration: BoxDecoration(
                              color: AppTheme.error,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Text(
                              '${_pendingRequests.length}',
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [_buildSearchTab(), _buildRequestsTab()],
      ),
    );
  }

  // ── Search tab ─────────────────────────────────────────────────────────────
  Widget _buildSearchTab() {
    return Column(
      children: [
        Container(
          color: AppTheme.surface,
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
          child: TextField(
            controller: _searchController,
            onChanged: _queueSearch,
            autocorrect: false,
            decoration: InputDecoration(
              hintText: 'Search by username...',
              prefixIcon: const Icon(
                Icons.search_rounded,
                color: AppTheme.textSecondary,
                size: 20,
              ),
              suffixIcon: _searching
                  ? const Padding(
                      padding: EdgeInsets.all(14),
                      child: SizedBox(
                        width: 16,
                        height: 16,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: AppTheme.primary,
                        ),
                      ),
                    )
                  : _searchController.text.isNotEmpty
                  ? IconButton(
                      icon: const Icon(
                        Icons.close_rounded,
                        size: 18,
                        color: AppTheme.textHint,
                      ),
                      onPressed: () {
                        _searchController.clear();
                        _queueSearch('');
                      },
                    )
                  : null,
            ),
          ),
        ),
        Expanded(
          child: _searchResults.isEmpty
              ? _emptySearch()
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: _searchResults.length,
                  itemBuilder: (_, i) =>
                      _searchResultCard(_searchResults[i], i),
                ),
        ),
      ],
    );
  }

  Widget _searchResultCard(Map<String, dynamic> user, int index) {
    final status = user['relationStatus'] as String;
    final requestId = user['requestId'] as int?;
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppTheme.border),
      ),
      child: Row(
        children: [
          // Avatar
          CircleAvatar(
            radius: 24,
            backgroundColor: AppTheme.primary.withOpacity(0.12),
            child: Text(
              _initial(user['name']),
              style: const TextStyle(
                color: AppTheme.primary,
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
            ),
          ),
          const SizedBox(width: 12),
          // Public identity only
          Expanded(
            child: GestureDetector(
              onTap: status == 'FRIENDS'
                  ? () async {
                      final removed = await Navigator.push<bool>(
                        context,
                        MaterialPageRoute(
                          builder: (_) => FriendProfileScreen(
                            userId: user['id'] as int,
                            name: user['name'] as String? ?? '',
                          ),
                        ),
                      );
                      if (removed == true && mounted) {
                        setState(() {
                          user['relationStatus'] = 'NONE';
                          user['requestId'] = null;
                        });
                      }
                    }
                  : null,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    user['name'] as String? ?? 'Unknown',
                    style: const TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 14,
                      color: AppTheme.textPrimary,
                    ),
                  ),
                  Text(
                    '@${user['username']}',
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppTheme.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
          ),
          // Action button
          _actionButton(status, user['id'] as int, requestId, index),
        ],
      ),
    );
  }

  Widget _actionButton(String status, int userId, int? requestId, int index) {
    switch (status) {
      case 'FRIENDS':
        return const Chip(
          label: Text(
            'Friends',
            style: TextStyle(fontSize: 11, color: AppTheme.primary),
          ),
          backgroundColor: Color(0xFFEAF3DE),
          side: BorderSide.none,
        );
      case 'PENDING_SENT':
        return OutlinedButton(
          onPressed: requestId != null ? () => _cancelRequest(requestId) : null,
          style: OutlinedButton.styleFrom(
            foregroundColor: AppTheme.textSecondary,
            side: const BorderSide(color: AppTheme.border),
            padding: const EdgeInsets.symmetric(horizontal: 12),
            minimumSize: const Size(0, 34),
          ),
          child: const Text('Cancel', style: TextStyle(fontSize: 12)),
        );
      case 'PENDING_RECEIVED':
        return ElevatedButton(
          onPressed: requestId != null ? () => _acceptRequest(requestId) : null,
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(horizontal: 12),
            minimumSize: const Size(0, 34),
          ),
          child: const Text('Accept', style: TextStyle(fontSize: 12)),
        );
      default: // NONE
        return ElevatedButton(
          onPressed: () => _sendRequest(userId),
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(horizontal: 12),
            minimumSize: const Size(0, 34),
          ),
          child: const Text('Add', style: TextStyle(fontSize: 12)),
        );
    }
  }

  Widget _emptySearch() {
    if (_searchController.text.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.search_rounded, size: 56, color: AppTheme.border),
              const SizedBox(height: 16),
              const Text(
                'Find your friends',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.textPrimary,
                ),
              ),
              const SizedBox(height: 6),
              const Text(
                'Search by their username to connect',
                textAlign: TextAlign.center,
                style: TextStyle(color: AppTheme.textSecondary, fontSize: 13),
              ),
            ],
          ),
        ),
      );
    }
    return const Center(
      child: Text(
        'No users found',
        style: TextStyle(color: AppTheme.textSecondary),
      ),
    );
  }

  // ── Requests tab ───────────────────────────────────────────────────────────
  Widget _buildRequestsTab() {
    if (_loadingRequests) {
      return const Center(
        child: CircularProgressIndicator(color: AppTheme.primary),
      );
    }
    if (_pendingRequests.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.people_outline_rounded,
                size: 56,
                color: AppTheme.border,
              ),
              const SizedBox(height: 16),
              const Text(
                'No pending requests',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.textPrimary,
                ),
              ),
              const SizedBox(height: 6),
              const Text(
                'Friend requests you receive will appear here',
                textAlign: TextAlign.center,
                style: TextStyle(color: AppTheme.textSecondary, fontSize: 13),
              ),
            ],
          ),
        ),
      );
    }
    return RefreshIndicator(
      color: AppTheme.primary,
      onRefresh: _loadPendingRequests,
      child: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: _pendingRequests.length,
        itemBuilder: (_, i) => _requestCard(_pendingRequests[i], i),
      ),
    );
  }

  Widget _requestCard(Map<String, dynamic> req, int index) {
    final sentAt = DateTime.tryParse(req['sentAt'] as String? ?? '');
    final diff = sentAt != null ? DateTime.now().difference(sentAt) : null;
    String timeAgo = '';
    if (diff != null) {
      if (diff.inMinutes < 60)
        timeAgo = '${diff.inMinutes}m ago';
      else if (diff.inHours < 24)
        timeAgo = '${diff.inHours}h ago';
      else
        timeAgo = '${diff.inDays}d ago';
    }
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppTheme.border),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 22,
            backgroundColor: AppTheme.primary.withOpacity(0.12),
            child: Text(
              _initial(req['name']),
              style: const TextStyle(
                color: AppTheme.primary,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  req['name'] as String? ?? 'Unknown',
                  style: const TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 14,
                    color: AppTheme.textPrimary,
                  ),
                ),
                Text(
                  '@${req['username']}',
                  style: const TextStyle(
                    fontSize: 12,
                    color: AppTheme.textSecondary,
                  ),
                ),
                if (timeAgo.isNotEmpty)
                  Text(
                    timeAgo,
                    style: const TextStyle(
                      fontSize: 11,
                      color: AppTheme.textHint,
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          OutlinedButton(
            onPressed: () => _rejectRequest(req['id'] as int),
            style: OutlinedButton.styleFrom(
              foregroundColor: AppTheme.textSecondary,
              side: const BorderSide(color: AppTheme.border),
              padding: const EdgeInsets.symmetric(horizontal: 10),
              minimumSize: const Size(0, 32),
            ),
            child: const Text('Decline', style: TextStyle(fontSize: 11)),
          ),
          const SizedBox(width: 6),
          ElevatedButton(
            onPressed: () => _acceptRequest(req['id'] as int),
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(horizontal: 10),
              minimumSize: const Size(0, 32),
            ),
            child: const Text('Accept', style: TextStyle(fontSize: 11)),
          ),
        ],
      ),
    );
  }
}
