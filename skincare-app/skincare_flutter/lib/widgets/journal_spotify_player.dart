import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../models/journal_song.dart';
import 'journal_spotify_player_stub.dart'
    if (dart.library.js_interop) 'journal_spotify_player_web.dart'
    as platform;

class JournalSpotifyPlayer extends StatelessWidget {
  final String trackId;
  const JournalSpotifyPlayer({super.key, required this.trackId});

  @override
  Widget build(BuildContext context) {
    if (!isSpotifyTrackId(trackId)) return const SizedBox.shrink();
    return SizedBox(
      height: 152,
      width: double.infinity,
      child: platform.spotifyPlayer(trackId),
    );
  }
}

Future<void> openJournalSong(BuildContext context, String trackId) async {
  final url = spotifyTrackUrl(trackId);
  if (platform.openSpotifyLink(url)) return;
  await Clipboard.setData(ClipboardData(text: url));
  if (context.mounted) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Song link copied. Open it in Spotify.')),
    );
  }
}
