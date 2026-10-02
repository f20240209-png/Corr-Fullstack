import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../screens/discovery_collection_screen.dart';
import '../screens/discovery_form_screen.dart';
import '../screens/discovery_detail_screen.dart';
import 'discovery_card.dart';
import 'collection_milestones.dart';

class DiscoveryProfileSection extends StatefulWidget {
  final Map<String, dynamic>? recommendation;
  final bool dashboard;
  final int refreshVersion;
  final VoidCallback? onReturn;
  const DiscoveryProfileSection({
    super.key,
    this.recommendation,
    this.dashboard = false,
    this.refreshVersion = 0,
    this.onReturn,
  });
  @override
  State<DiscoveryProfileSection> createState() =>
      _DiscoveryProfileSectionState();
}

class _DiscoveryProfileSectionState extends State<DiscoveryProfileSection> {
  List<Map<String, dynamic>> _items = [];
  int _count = 0;
  bool _loading = true;
  String? _error;
  int _request = 0;
  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void didUpdateWidget(covariant DiscoveryProfileSection oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.refreshVersion != oldWidget.refreshVersion) _load();
  }

  Future<void> _load() async {
    final request = ++_request;
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await ApiService.getDiscoveries(
        context.read<AuthProvider>().token ??
            (throw const ApiException('Please sign in again.')),
        limit: 3,
      );
      if (mounted && request == _request)
        setState(() {
          _items = List<Map<String, dynamic>>.from(data['discoveries']);
          _count = (data['count'] as num).toInt();
        });
    } catch (e) {
      if (mounted && request == _request) setState(() => _error = e.toString());
    } finally {
      if (mounted && request == _request) setState(() => _loading = false);
    }
  }

  Future<void> _open(Widget screen) async {
    await Navigator.push(context, MaterialPageRoute(builder: (_) => screen));
    if (!mounted) return;
    widget.onReturn?.call();
    await _load();
  }

  @override
  Widget build(BuildContext context) => Container(
    width: double.infinity,
    padding: const EdgeInsets.all(20),
    decoration: BoxDecoration(
      color: AppTheme.surfaceWarm,
      borderRadius: BorderRadius.circular(24),
      border: Border.all(color: AppTheme.border),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'MY DISCOVERIES',
          style: TextStyle(
            color: AppTheme.primaryDark,
            fontWeight: FontWeight.w700,
            letterSpacing: 1,
          ),
        ),
        const SizedBox(height: 10),
        if (widget.dashboard) ...[
          const Text(
            'Your skincare shelf, collected.',
            style: TextStyle(fontSize: 25, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 8),
        ],
        Text(
          _loading
              ? 'Loading your collection…'
              : _error != null
              ? 'Could not load your collection'
              : '$_count products discovered',
          style: TextStyle(
            fontSize: widget.dashboard ? 18 : 24,
            fontWeight: FontWeight.w700,
            color: AppTheme.primaryDark,
          ),
        ),
        const SizedBox(height: 5),
        Text(
          _loading || _error != null
              ? 'Your personal product cards'
              : '$_count collection points · One distinct product, one point',
          style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary),
        ),
        const SizedBox(height: 14),
        Wrap(
          spacing: 10,
          runSpacing: 8,
          children: [
            FilledButton.icon(
              onPressed: () => _open(const DiscoveryFormScreen()),
              icon: const Icon(Icons.add_a_photo_outlined, size: 18),
              label: const Text('Add discovery'),
            ),
            OutlinedButton(
              onPressed: () => _open(
                DiscoveryCollectionScreen(
                  recommendation: widget.recommendation,
                ),
              ),
              child: const Text('View collection'),
            ),
          ],
        ),
        if (!_loading && _error == null) ...[
          const SizedBox(height: 16),
          CollectionMilestones(count: _count, compact: true),
        ],
        if (_error != null) ...[
          const SizedBox(height: 10),
          Text(_error!, style: const TextStyle(color: AppTheme.error)),
          TextButton(onPressed: _load, child: const Text('Retry')),
        ],
        if (!_loading && _error == null && _items.isEmpty)
          const Padding(
            padding: EdgeInsets.only(top: 16),
            child: Text(
              'Tried something new? Add its photo and your review to collect your first card.',
              style: TextStyle(color: AppTheme.textSecondary, height: 1.5),
            ),
          ),
        if (!_loading && _error == null && _items.isNotEmpty) ...[
          const SizedBox(height: 18),
          LayoutBuilder(
            builder: (context, constraints) {
              final columns = constraints.maxWidth >= 900
                  ? 3
                  : constraints.maxWidth >= 560
                  ? 2
                  : 1;
              final width =
                  (constraints.maxWidth - 14 * (columns - 1)) / columns;
              return Wrap(
                spacing: 14,
                runSpacing: 14,
                children: _items
                    .map(
                      (item) => SizedBox(
                        width: width,
                        child: widget.dashboard
                            ? _dashboardCard(item)
                            : DiscoveryCard(
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
        ],
      ],
    ),
  );

  Widget _dashboardCard(Map<String, dynamic> item) => Material(
    color: AppTheme.surface,
    borderRadius: BorderRadius.circular(18),
    clipBehavior: Clip.antiAlias,
    child: InkWell(
      onTap: () => _open(
        DiscoveryDetailScreen(
          discovery: item,
          recommendation: widget.recommendation,
        ),
      ),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          border: Border.all(color: AppTheme.border),
          borderRadius: BorderRadius.circular(18),
        ),
        child: Row(
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: SizedBox(
                width: 64,
                height: 76,
                child: DiscoveryPhoto(path: item['thumbnailPath'] as String),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    item['brand'] as String,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 11,
                      color: AppTheme.primaryDark,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    item['productName'] as String,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    item['rating'] == null
                        ? 'View your card'
                        : '${item['rating']}/5 rating',
                    style: const TextStyle(
                      fontSize: 11,
                      color: AppTheme.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: 4),
            const Icon(
              Icons.chevron_right_rounded,
              size: 18,
              color: AppTheme.primaryDark,
            ),
          ],
        ),
      ),
    ),
  );
}
