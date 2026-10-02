import 'package:flutter/widgets.dart';
import 'package:web/web.dart' as web;
import '../models/journal_song.dart';

Widget spotifyPlayer(String trackId) => HtmlElementView.fromTagName(
  key: ValueKey('spotify-frame-$trackId'),
  tagName: 'iframe',
  onElementCreated: (element) {
    final frame = element as web.HTMLIFrameElement;
    frame
      ..src = spotifyTrackEmbedUrl(trackId)
      ..title = 'Spotify song player'
      ..width = '100%'
      ..height = '152'
      ..loading = 'lazy'
      ..allowFullscreen = true
      ..allow =
          'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    frame.setAttribute('frameborder', '0');
    frame.setAttribute('referrerpolicy', 'no-referrer');
    frame.style
      ..width = '100%'
      ..height = '100%'
      ..border = '0'
      ..borderRadius = '12px';
  },
);

bool openSpotifyLink(String url) {
  // Reconstruct only validated Spotify song URLs. No arbitrary redirects.
  final trackId = spotifyTrackIdFromLink(url);
  if (trackId == null) return false;
  web.window.open(spotifyTrackUrl(trackId), '_blank', 'noopener,noreferrer');
  return true;
}
