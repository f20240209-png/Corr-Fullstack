import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:pointer_interceptor/pointer_interceptor.dart';
import '../models/journal_song.dart';
import '../theme/app_theme.dart';
import 'journal_spotify_player.dart';

class JournalSongCard extends StatefulWidget {
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
  State<JournalSongCard> createState() => _JournalSongCardState();
}

class _JournalSongCardState extends State<JournalSongCard> {
  bool _playerLoaded = false;

  @override
  void didUpdateWidget(covariant JournalSongCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.trackId != widget.trackId) _playerLoaded = false;
  }

  @override
  Widget build(BuildContext context) {
    final trackId = widget.trackId;
    final enabled = widget.enabled;
    final onChoose = widget.onChoose;
    final onRemove = widget.onRemove;
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
            if (_playerLoaded)
              JournalSpotifyPlayer(key: ValueKey(trackId), trackId: trackId!)
            else
              _playerCover(),
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

  Widget _playerCover() => Container(
    width: double.infinity,
    padding: const EdgeInsets.all(14),
    decoration: BoxDecoration(
      color: AppTheme.surface,
      borderRadius: BorderRadius.circular(12),
      border: Border.all(color: AppTheme.border),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Your song is saved',
          style: TextStyle(fontWeight: FontWeight.w600),
        ),
        const SizedBox(height: 6),
        const Text(
          'Loading the player connects to Spotify and may use its cookies. Your journal text and photos stay in Corr.',
          style: TextStyle(
            fontSize: 12,
            height: 1.5,
            color: AppTheme.textSecondary,
          ),
        ),
        const SizedBox(height: 10),
        OutlinedButton.icon(
          key: const ValueKey('load-spotify-player'),
          onPressed: () => setState(() => _playerLoaded = true),
          icon: const Icon(Icons.play_circle_outline_rounded, size: 18),
          label: const Text('Load Spotify player'),
        ),
      ],
    ),
  );
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

  void _choose() {
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
              onSubmitted: (_) => _choose(),
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
              'Add the link, then save your journal page. The player loads when you choose.',
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
          onPressed: _choose,
          icon: const Icon(Icons.music_note_rounded, size: 17),
          label: const Text('Use this song'),
        ),
      ],
    ),
  );
}
