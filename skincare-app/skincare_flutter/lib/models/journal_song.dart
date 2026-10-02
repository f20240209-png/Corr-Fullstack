// Both the client and server accept song links only, never arbitrary embed HTML.
bool isSpotifyTrackId(String? value) =>
    value != null &&
    value.length == 22 &&
    RegExp(r'^[A-Za-z0-9]{22}$').hasMatch(value);

String? spotifyTrackIdFromLink(String value) {
  if (value.length > 2048) return null;
  final link = value.trim();
  if (link.isEmpty || RegExp(r'[\x00-\x20\x7f]').hasMatch(link)) return null;
  final spotifyUri = RegExp(
    r'^spotify:track:([A-Za-z0-9]{22})$',
  ).firstMatch(link);
  if (spotifyUri != null) return spotifyUri.group(1);
  // Uri.path decodes escaped characters; validate the original path as well.
  if (link.split(RegExp(r'[?#]')).first.contains('%')) return null;
  final uri = Uri.tryParse(link);
  if (uri == null ||
      uri.scheme != 'https' ||
      uri.host != 'open.spotify.com' ||
      (uri.hasPort && uri.port != 443) ||
      uri.userInfo.isNotEmpty) {
    return null;
  }
  return RegExp(
    r'^/(?:intl-[a-z]{2}/)?track/([A-Za-z0-9]{22})/?$',
  ).firstMatch(uri.path)?.group(1);
}

String spotifyTrackUrl(String trackId) {
  if (!isSpotifyTrackId(trackId)) throw ArgumentError('Invalid Spotify song.');
  return 'https://open.spotify.com/track/$trackId';
}

String spotifyTrackEmbedUrl(String trackId) {
  if (!isSpotifyTrackId(trackId)) throw ArgumentError('Invalid Spotify song.');
  return 'https://open.spotify.com/embed/track/$trackId?theme=0';
}
