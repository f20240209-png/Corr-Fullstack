import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../models/collection_progress.dart';

class DiscoveryPhoto extends StatefulWidget {
  final String path;
  final BoxFit fit;
  const DiscoveryPhoto({
    super.key,
    required this.path,
    this.fit = BoxFit.cover,
  });
  @override
  State<DiscoveryPhoto> createState() => _DiscoveryPhotoState();
}

class _DiscoveryPhotoState extends State<DiscoveryPhoto> {
  Future<Uint8List>? _future;
  String? _loadedKey;
  @override
  Widget build(BuildContext context) {
    final token = context.watch<AuthProvider>().token;
    final key = '$token:${widget.path}';
    if (_loadedKey != key) {
      _loadedKey = key;
      _future = token == null
          ? Future.error(const ApiException('Please sign in.'))
          : ApiService.getDiscoveryPhoto(token, widget.path);
    }
    return ColoredBox(
      color: AppTheme.surfaceWarm,
      child: FutureBuilder<Uint8List>(
        key: ValueKey(key),
        future: _future,
        builder: (context, snapshot) {
          if (snapshot.hasError)
            return Center(
              child: IconButton(
                tooltip: 'Retry photo',
                icon: const Icon(Icons.refresh, color: AppTheme.primary),
                onPressed: () => setState(() => _loadedKey = null),
              ),
            );
          if (!snapshot.hasData)
            return const Center(
              child: SizedBox(
                width: 22,
                height: 22,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  color: AppTheme.primary,
                ),
              ),
            );
          return Image.memory(
            snapshot.data!,
            fit: widget.fit,
            width: double.infinity,
            height: double.infinity,
            gaplessPlayback: false,
            errorBuilder: (_, __, ___) =>
                const Center(child: Icon(Icons.broken_image_outlined)),
          );
        },
      ),
    );
  }
}

class DiscoveryCard extends StatelessWidget {
  final Map<String, dynamic> discovery;
  final VoidCallback onTap;
  const DiscoveryCard({
    super.key,
    required this.discovery,
    required this.onTap,
  });
  @override
  Widget build(BuildContext context) => Material(
    color: AppTheme.surface,
    borderRadius: BorderRadius.circular(22),
    clipBehavior: Clip.antiAlias,
    child: InkWell(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(22),
          border: Border.all(color: AppTheme.border),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            AspectRatio(
              aspectRatio: 1.25,
              child: DiscoveryPhoto(path: discovery['thumbnailPath'] as String),
            ),
            Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    discovery['brand'] as String,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: AppTheme.primaryDark,
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    discovery['productName'] as String,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: AppTheme.textPrimary,
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    discovery['review'] as String,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: AppTheme.textSecondary,
                      height: 1.4,
                      fontSize: 12,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    discoveryProductTypes[discovery['productType']] ?? 'Other',
                    style: const TextStyle(
                      fontSize: 11,
                      color: AppTheme.primaryDark,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      const Icon(
                        Icons.collections_bookmark_outlined,
                        color: AppTheme.primary,
                        size: 15,
                      ),
                      const SizedBox(width: 5),
                      const Expanded(
                        child: Text(
                          'Collected',
                          style: TextStyle(
                            fontSize: 11,
                            color: AppTheme.primaryDark,
                          ),
                        ),
                      ),
                      if (discovery['rating'] != null) ...[
                        const Icon(
                          Icons.star_rounded,
                          size: 16,
                          color: Color(0xFFB78E45),
                        ),
                        Text(
                          '${discovery['rating']}/5',
                          style: const TextStyle(fontSize: 11),
                        ),
                      ],
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
