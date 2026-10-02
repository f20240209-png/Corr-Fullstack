import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:pointer_interceptor/pointer_interceptor.dart';
import '../models/journal_song.dart';
import '../theme/app_theme.dart';
import 'journal_spotify_player.dart';

class JournalSongCard extends StatelessWidget {
  final String? trackId;
  final bool enabled;
  final VoidCallback onChoose, onRemove;
  const JournalSongCard({
    super.key,
    required this.trackId,
    required this.enabled,
    required this.onChoose,
    required this.onRemove,
  });

  @override
  Widget build(BuildContext context) {
    final hasSong = isSpotifyTrackId(trackId);
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceWarm,
        border: Border.all(color: AppTheme.border),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const CircleAvatar(
                radius: 18,
                backgroundColor: AppTheme.primaryLight,
                child: Icon(
                  Icons.music_note_rounded,
                  color: AppTheme.primaryDark,
                  size: 20,
                ),
              ),
              const SizedBox(width: 12),
              const Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Soundtrack for this day',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    SizedBox(height: 4),
                    Text(
                      'A song to remember this moment.',
                      style: TextStyle(
                        color: AppTheme.textSecondary,
                        fontSize: 12,
                        height: 1.5,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          if (hasSong) ...[
            JournalSpotifyPlayer(key: ValueKey(trackId), trackId: trackId!),
            const SizedBox(height: 10),
            Wrap(
              spacing: 6,
              runSpacing: 4,
              children: [
                TextButton.icon(
                  onPressed: () => openJournalSong(context, trackId!),
                  icon: const Icon(Icons.open_in_new_rounded, size: 15),
                  label: Text(kIsWeb ? 'Open in Spotify' : 'Copy song link'),
                ),
                TextButton(
                  onPressed: enabled ? onChoose : null,
                  child: const Text('Change song'),
                ),
                TextButton(
                  onPressed: enabled ? onRemove : null,
                  child: const Text('Remove song'),
                ),
              ],
            ),
            const Text(
              'Spotify provides playback; a preview may be shown.',
              style: TextStyle(
                fontSize: 11,
                color: AppTheme.textSecondary,
                height: 1.5,
              ),
            ),
          ] else ...[
            OutlinedButton.icon(
              onPressed: enabled ? onChoose : null,
              icon: const Icon(Icons.add_rounded, size: 17),
              label: const Text('Add a song'),
            ),
            const SizedBox(height: 6),
            const Text(
              'Optional. Paste a Spotify song link to keep it with this page.',
              style: TextStyle(
                fontSize: 12,
                color: AppTheme.textSecondary,
                height: 1.5,
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class JournalSongDialog extends StatefulWidget {
  final String? trackId;
  const JournalSongDialog({super.key, this.trackId});
  @override
  State<JournalSongDialog> createState() => _JournalSongDialogState();
}

class _JournalSongDialogState extends State<JournalSongDialog> {
  late final TextEditingController _link;
  String? _error;
  @override
  void initState() {
    super.initState();
    _link = TextEditingController(
      text: isSpotifyTrackId(widget.trackId)
          ? spotifyTrackUrl(widget.trackId!)
          : '',
    );
  }

  @override
  void dispose() {
    _link.dispose();
    super.dispose();
  }

  void _preview() {
    final id = spotifyTrackIdFromLink(_link.text);
    if (id == null) {
      setState(
        () => _error = 'Paste a Spotify song link from open.spotify.com/track.',
      );
      return;
    }
    Navigator.pop(context, id);
  }

  @override
  Widget build(BuildContext context) => PointerInterceptor(
    child: AlertDialog(
      backgroundColor: AppTheme.surfaceWarm,
      title: Text(widget.trackId == null ? 'Add a song' : 'Change song'),
      content: SizedBox(
        width: 420,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'In Spotify, open a song and choose Share → Copy song link.',
              style: TextStyle(color: AppTheme.textSecondary, height: 1.6),
            ),
            const SizedBox(height: 16),
            TextField(
              key: const ValueKey('journal-song-link'),
              controller: _link,
              autofocus: true,
              keyboardType: TextInputType.url,
              textInputAction: TextInputAction.done,
              autocorrect: false,
              enableSuggestions: false,
              maxLength: 2048,
              onSubmitted: (_) => _preview(),
              onChanged: (_) {
                if (_error != null) setState(() => _error = null);
              },
              decoration: InputDecoration(
                labelText: 'Spotify song link',
                hintText: 'https://open.spotify.com/track/...',
                counterText: '',
                errorText: _error,
                errorMaxLines: 3,
              ),
            ),
            const SizedBox(height: 12),
            const Text(
              'Preview it, then save your journal page to keep the song.',
              style: TextStyle(
                color: AppTheme.textSecondary,
                fontSize: 12,
                height: 1.5,
              ),
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Cancel'),
        ),
        FilledButton.icon(
          onPressed: _preview,
          icon: const Icon(Icons.music_note_rounded, size: 17),
          label: const Text('Preview song'),
        ),
      ],
    ),
  );
}
