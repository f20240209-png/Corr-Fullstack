import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/discovery_card.dart';
import '../models/collection_progress.dart';
import '../widgets/routine_step_card.dart';
import 'discovery_form_screen.dart';
import 'skincare_log_screen.dart';

class DiscoveryDetailScreen extends StatefulWidget {
  final Map<String, dynamic> discovery;
  final Map<String, dynamic>? recommendation;
  const DiscoveryDetailScreen({
    super.key,
    required this.discovery,
    this.recommendation,
  });
  @override
  State<DiscoveryDetailScreen> createState() => _DiscoveryDetailScreenState();
}

class _DiscoveryDetailScreenState extends State<DiscoveryDetailScreen> {
  bool _deleting = false;
  String? _error;
  Future<void> _edit() async {
    final changed = await Navigator.push<bool>(
      context,
      MaterialPageRoute(
        builder: (_) => DiscoveryFormScreen(discovery: widget.discovery),
      ),
    );
    if (mounted && changed == true) Navigator.pop(context, true);
  }

  Future<void> _delete() async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Remove this discovery?'),
        content: const Text(
          'Its photo and review will be deleted and your collection count will decrease. Existing daily logs will stay.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(dialogContext, false),
            child: const Text('Keep card'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(dialogContext, true),
            child: const Text('Remove'),
          ),
        ],
      ),
    );
    if (!mounted || confirmed != true) return;
    setState(() {
      _deleting = true;
      _error = null;
    });
    try {
      final result = await ApiService.deleteDiscovery(
        context.read<AuthProvider>().token!,
        widget.discovery['id'] as int,
        widget.discovery['version'] as int,
      );
      if (result['deleted'] != true)
        throw const ApiException('Unable to remove this discovery.');
      if (mounted) Navigator.pop(context, true);
    } catch (e) {
      if (mounted) setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _deleting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final item = widget.discovery;
    return PopScope(
      canPop: !_deleting,
      child: Scaffold(
        backgroundColor: AppTheme.background,
        appBar: AppBar(title: const Text('Discovery card')),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 680),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(24),
                    child: AspectRatio(
                      aspectRatio: 1.2,
                      child: DiscoveryPhoto(
                        path: item['imagePath'] as String,
                        fit: BoxFit.contain,
                      ),
                    ),
                  ),
                  const SizedBox(height: 22),
                  Text(
                    item['brand'] as String,
                    style: const TextStyle(
                      color: AppTheme.primaryDark,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    item['productName'] as String,
                    style: const TextStyle(
                      fontSize: 26,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 12),
                  CorrPill(
                    label:
                        discoveryProductTypes[item['productType']] ?? 'Other',
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Tried on ${item['discoveredOn']}',
                    style: const TextStyle(color: AppTheme.textSecondary),
                  ),
                  if (item['rating'] != null)
                    Padding(
                      padding: const EdgeInsets.only(top: 10),
                      child: Text(
                        '★ ${item['rating']}/5 · Your rating',
                        style: const TextStyle(color: Color(0xFF9C7638)),
                      ),
                    ),
                  const SizedBox(height: 24),
                  const Text(
                    'Your experience',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    item['review'] as String,
                    style: const TextStyle(
                      height: 1.7,
                      color: AppTheme.textSecondary,
                    ),
                  ),
                  const SizedBox(height: 24),
                  FilledButton.icon(
                    onPressed: _deleting
                        ? null
                        : () => Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => SkincareLogScreen(
                                recommendation: widget.recommendation,
                                initialProduct:
                                    '${item['productName']} by ${item['brand']}',
                              ),
                            ),
                          ),
                    icon: const Icon(Icons.checklist_rounded),
                    label: const Text('Log this product'),
                  ),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 10,
                    children: [
                      OutlinedButton.icon(
                        onPressed: _deleting ? null : _edit,
                        icon: const Icon(Icons.edit_outlined),
                        label: const Text('Edit card'),
                      ),
                      TextButton.icon(
                        onPressed: _deleting ? null : _delete,
                        icon: const Icon(Icons.delete_outline),
                        label: Text(_deleting ? 'Removing…' : 'Remove card'),
                      ),
                    ],
                  ),
                  if (_error != null)
                    Text(
                      _error!,
                      style: const TextStyle(color: AppTheme.error),
                    ),
                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
