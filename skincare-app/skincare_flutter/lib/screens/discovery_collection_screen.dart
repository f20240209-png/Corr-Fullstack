import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../models/collection_progress.dart';
import '../widgets/collection_milestones.dart';
import '../widgets/discovery_card.dart';
import 'discovery_form_screen.dart';
import 'discovery_detail_screen.dart';

class DiscoveryCollectionScreen extends StatefulWidget {
  final Map<String, dynamic>? recommendation;
  const DiscoveryCollectionScreen({super.key, this.recommendation});
  @override
  State<DiscoveryCollectionScreen> createState() =>
      _DiscoveryCollectionScreenState();
}

class _DiscoveryCollectionScreenState extends State<DiscoveryCollectionScreen> {
  final _search = TextEditingController();
  Timer? _debounce;
  List<Map<String, dynamic>> _items = [];
  int? _count, _filtered, _next;
  int _request = 0;
  bool _loading = true, _more = false, _retryMore = false;
  String? _error, _type;
  String _sort = 'newest';
  int? _minRating;
  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    _debounce?.cancel();
    _search.dispose();
    super.dispose();
  }

  void _searchChanged(String _) {
    _debounce?.cancel();
    // Invalidate the preceding query immediately, including during debounce.
    _request++;
    setState(() {
      _loading = true;
      _more = false;
    });
    _debounce = Timer(const Duration(milliseconds: 350), _load);
  }

  Future<void> _load({bool more = false}) async {
    if (!mounted || (more && (_more || _loading || _next == null))) return;
    _debounce?.cancel();
    final request = ++_request, before = more ? _next : null;
    setState(() {
      _error = null;
      _retryMore = false;
      if (more) {
        _more = true;
      } else {
        _loading = true;
        _more = false;
      }
    });
    try {
      final token =
          context.read<AuthProvider>().token ??
          (throw const ApiException('Please sign in again.'));
      final data = await ApiService.getDiscoveries(
        token,
        before: before,
        search: _search.text,
        productType: _type,
        sort: _sort,
        minRating: _minRating,
      );
      if (!mounted || request != _request) return;
      final items = List<Map<String, dynamic>>.from(data['discoveries']);
      setState(() {
        final ids = _items.map((item) => item['id']).toSet();
        _items = more
            ? [..._items, ...items.where((item) => ids.add(item['id']))]
            : items;
        _count = (data['count'] as num).toInt();
        _filtered = (data['filteredCount'] as num?)?.toInt() ?? _count;
        _next = data['nextCursor'] as int?;
      });
    } catch (e) {
      if (mounted && request == _request)
        setState(() {
          _error = e.toString();
          _retryMore = more;
        });
    } finally {
      if (mounted && request == _request)
        setState(() {
          _loading = false;
          _more = false;
        });
    }
  }

  Future<void> _open(Widget screen) async {
    await Navigator.push(
      context,
      MaterialPageRoute<void>(builder: (_) => screen),
    );
    if (mounted) await _load();
  }

  void _clearFilters() {
    _search.clear();
    setState(() {
      _type = null;
      _minRating = null;
      _sort = 'newest';
    });
    _load();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    backgroundColor: AppTheme.background,
    appBar: AppBar(
      title: const Text('My Discoveries'),
      backgroundColor: AppTheme.background,
    ),
    body: RefreshIndicator(
      onRefresh: _load,
      child: SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.all(18),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 1100),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    gradient: AppTheme.warmGradient,
                    borderRadius: BorderRadius.circular(26),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Icon(
                        Icons.collections_bookmark_outlined,
                        size: 28,
                        color: Color(0xFFDCE7DB),
                      ),
                      const SizedBox(height: 12),
                      const Text(
                        'Your shelf of stories.',
                        style: TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.w700,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        _count == null
                            ? 'Your personal product collection'
                            : '$_count products discovered · $_count collection points',
                        style: const TextStyle(
                          color: Color(0xFFDCE7DB),
                          height: 1.5,
                        ),
                      ),
                      const SizedBox(height: 18),
                      FilledButton.icon(
                        onPressed: () => _open(const DiscoveryFormScreen()),
                        icon: const Icon(Icons.add_a_photo_outlined),
                        label: const Text('Collect a discovery'),
                        style: FilledButton.styleFrom(
                          backgroundColor: AppTheme.surface,
                          foregroundColor: AppTheme.primaryDark,
                        ),
                      ),
                    ],
                  ),
                ),
                if (_count != null) ...[
                  const SizedBox(height: 20),
                  CollectionMilestones(count: _count!),
                ],
                const SizedBox(height: 22),
                TextField(
                  controller: _search,
                  maxLength: 120,
                  onChanged: _searchChanged,
                  decoration: InputDecoration(
                    hintText: 'Search your products or brands...',
                    counterText: '',
                    prefixIcon: const Icon(Icons.search_rounded),
                    suffixIcon: IconButton(
                      tooltip: 'Clear search',
                      onPressed: () {
                        _search.clear();
                        _load();
                      },
                      icon: const Icon(Icons.close_rounded),
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                Wrap(
                  spacing: 10,
                  runSpacing: 10,
                  children: [
                    SizedBox(
                      width: 185,
                      child: DropdownButtonFormField<String>(
                        key: ValueKey(_sort),
                        initialValue: _sort,
                        decoration: const InputDecoration(
                          labelText: 'Sort collection',
                        ),
                        items: const [
                          DropdownMenuItem(
                            value: 'newest',
                            child: Text('Newest added'),
                          ),
                          DropdownMenuItem(
                            value: 'oldest',
                            child: Text('Oldest added'),
                          ),
                          DropdownMenuItem(
                            value: 'rating',
                            child: Text('Highest rated'),
                          ),
                          DropdownMenuItem(
                            value: 'name',
                            child: Text('Product name'),
                          ),
                        ],
                        onChanged: (value) {
                          setState(() => _sort = value ?? 'newest');
                          _load();
                        },
                      ),
                    ),
                    FilterChip(
                      label: const Text('4+ stars'),
                      selected: _minRating != null,
                      onSelected: (value) {
                        setState(() => _minRating = value ? 4 : null);
                        _load();
                      },
                      selectedColor: AppTheme.primaryLight.withValues(
                        alpha: 0.35,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 14),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    _typeChip(null, 'All products'),
                    ...discoveryProductTypes.entries.map(
                      (entry) => _typeChip(entry.key, entry.value),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                if (_loading)
                  const Padding(
                    padding: EdgeInsets.all(40),
                    child: Center(child: CircularProgressIndicator()),
                  )
                else ...[
                  if (_error != null) ...[
                    Text(
                      _error!,
                      style: const TextStyle(color: AppTheme.error),
                    ),
                    TextButton(
                      onPressed: () => _load(more: _retryMore),
                      child: const Text('Retry'),
                    ),
                    if (_retryMore)
                      TextButton(
                        onPressed: _load,
                        child: const Text('Refresh collection'),
                      ),
                  ],
                  if (_error == null || _retryMore) ...[
                    Text(
                      '${_filtered ?? 0} ${_filtered == 1 ? 'card' : 'cards'} found',
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: AppTheme.textSecondary,
                      ),
                    ),
                    const SizedBox(height: 12),
                    if (_items.isEmpty)
                      Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(28),
                        decoration: BoxDecoration(
                          color: AppTheme.surface,
                          borderRadius: BorderRadius.circular(22),
                        ),
                        child: Column(
                          children: [
                            const Icon(
                              Icons.collections_bookmark_outlined,
                              color: AppTheme.primaryDark,
                              size: 32,
                            ),
                            const SizedBox(height: 12),
                            Text(
                              _count == 0
                                  ? 'Your first card is waiting.'
                                  : 'No cards match these filters.',
                              style: const TextStyle(
                                fontSize: 17,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              _count == 0
                                  ? 'Add a photo and your review to start your shelf.'
                                  : 'Try a different name, brand, rating or product type.',
                              textAlign: TextAlign.center,
                              style: const TextStyle(
                                color: AppTheme.textSecondary,
                                height: 1.5,
                              ),
                            ),
                            if (_count != 0)
                              TextButton(
                                onPressed: _clearFilters,
                                child: const Text('Clear filters'),
                              ),
                          ],
                        ),
                      ),
                    LayoutBuilder(
                      builder: (context, bounds) {
                        final columns = bounds.maxWidth >= 1000
                            ? 4
                            : bounds.maxWidth >= 720
                            ? 3
                            : bounds.maxWidth >= 420
                            ? 2
                            : 1;
                        final width =
                            (bounds.maxWidth - 16 * (columns - 1)) / columns;
                        return Wrap(
                          spacing: 16,
                          runSpacing: 16,
                          children: _items
                              .map(
                                (item) => SizedBox(
                                  width: width,
                                  child: DiscoveryCard(
                                    discovery: item,
                                    onTap: () => _open(
                                      DiscoveryDetailScreen(
                                        discovery: item,
                                        recommendation: widget.recommendation,
                                      ),
                                    ),
                                  ),
                                ),
                              )
                              .toList(),
                        );
                      },
                    ),
                    if (_next != null)
                      Padding(
                        padding: const EdgeInsets.only(top: 22),
                        child: Center(
                          child: OutlinedButton(
                            onPressed: _more ? null : () => _load(more: true),
                            child: Text(
                              _more ? 'Loading...' : 'More discoveries',
                            ),
                          ),
                        ),
                      ),
                  ],
                ],
                const SizedBox(height: 30),
              ],
            ),
          ),
        ),
      ),
    ),
  );
  Widget _typeChip(String? type, String label) => ChoiceChip(
    label: Text(label),
    selected: _type == type,
    showCheckmark: false,
    selectedColor: AppTheme.primaryDark,
    labelStyle: TextStyle(
      fontSize: 12,
      color: _type == type ? Colors.white : AppTheme.textSecondary,
    ),
    onSelected: (_) {
      setState(() => _type = type);
      _load();
    },
  );
}
