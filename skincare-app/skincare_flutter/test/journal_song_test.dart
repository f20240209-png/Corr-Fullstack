import 'package:flutter_test/flutter_test.dart';
import 'package:skincare_flutter/models/journal_song.dart';

void main() {
  const id = '4uLU6hMCjMI75M1A2tKUQC';
  const link = 'https://open.spotify.com/track/$id';
  test(
    'Spotify song links normalize share queries, locales and Spotify URIs',
    () {
      for (final input in [
        link,
        ' $link?si=abc&utm_source=copy#section ',
        'https://open.spotify.com/intl-en/track/$id',
        '$link/',
        'spotify:track:$id',
        'https://OPEN.SPOTIFY.COM:443/track/$id',
      ]) {
        expect(spotifyTrackIdFromLink(input), id);
      }
      expect(spotifyTrackUrl(id), link);
      expect(
        spotifyTrackEmbedUrl(id),
        'https://open.spotify.com/embed/track/$id?theme=0',
      );
    },
  );
  test(
    'untrusted, unsupported and malformed links cannot become embedded content',
    () {
      for (final input in [
        '',
        '   ',
        'javascript:alert(1)',
        '<iframe src="$link"></iframe>',
        link.replaceFirst('https:', 'http:'),
        link.replaceFirst('track/', 'playlist/'),
        link.replaceFirst('open.spotify.com', 'open.spotify.com.evil.example'),
        link.replaceFirst('open.spotify.com', 'user@open.spotify.com'),
        link.replaceFirst('open.spotify.com', 'open.spotify.com:444'),
        'https://spotify.link/short',
        '$link/extra',
        link.substring(0, link.length - 1),
        '${link}x',
        'x' * 2049,
        link.replaceFirst('spotify', 'spoti\nfy'),
        'https://open.spotify.com/track/%34uLU6hMCjMI75M1A2tKUQC',
      ]) {
        expect(spotifyTrackIdFromLink(input), isNull, reason: input);
      }
      expect(isSpotifyTrackId(null), isFalse);
      expect(
        () => spotifyTrackEmbedUrl('javascript:alert(1)'),
        throwsArgumentError,
      );
    },
  );
}
