import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:skincare_flutter/widgets/journal_song_card.dart';
import 'package:skincare_flutter/widgets/journal_spotify_player.dart';

void main() {
  const id = '4uLU6hMCjMI75M1A2tKUQC';
  testWidgets(
    'invalid links stay in the dialog; a valid song returns its normalized ID',
    (tester) async {
      String? chosen;
      await tester.pumpWidget(
        MaterialApp(
          home: Builder(
            builder: (context) => Scaffold(
              body: TextButton(
                onPressed: () async {
                  chosen = await showDialog<String>(
                    context: context,
                    builder: (_) => const JournalSongDialog(),
                  );
                },
                child: const Text('Choose soundtrack'),
              ),
            ),
          ),
        ),
      );
      await tester.tap(find.text('Choose soundtrack'));
      await tester.pumpAndSettle();
      final input = find.byKey(const ValueKey('journal-song-link'));
      await tester.enterText(input, 'https://example.com/song');
      await tester.tap(find.text('Preview song'));
      await tester.pumpAndSettle();
      expect(chosen, isNull);
      expect(
        find.text('Paste a Spotify song link from open.spotify.com/track.'),
        findsOneWidget,
      );
      expect(
        tester.widget<TextField>(input).controller!.text,
        'https://example.com/song',
      );
      await tester.enterText(
        input,
        'https://open.spotify.com/track/$id?si=share',
      );
      await tester.tap(find.text('Preview song'));
      await tester.pumpAndSettle();
      expect(chosen, id);
      expect(find.byType(JournalSongDialog), findsNothing);
    },
  );
  testWidgets(
    'song controls and the edit dialog fit a narrow viewport; cancel keeps the existing song',
    (tester) async {
      await tester.binding.setSurfaceSize(const Size(320, 800));
      addTearDown(() => tester.binding.setSurfaceSize(null));
      var chosen = id;
      await tester.pumpWidget(
        MaterialApp(
          home: Builder(
            builder: (context) => Scaffold(
              body: SingleChildScrollView(
                padding: const EdgeInsets.all(18),
                child: JournalSongCard(
                  trackId: id,
                  enabled: true,
                  onChoose: () async {
                    final value = await showDialog<String>(
                      context: context,
                      builder: (_) => const JournalSongDialog(trackId: id),
                    );
                    if (value != null) chosen = value;
                  },
                  onRemove: () {},
                ),
              ),
            ),
          ),
        ),
      );
      expect(find.byType(JournalSpotifyPlayer), findsOneWidget);
      expect(tester.takeException(), isNull);
      await tester.tap(find.text('Change song'));
      await tester.pumpAndSettle();
      await tester.enterText(
        find.byKey(const ValueKey('journal-song-link')),
        'unfinished new link',
      );
      await tester.tap(find.text('Cancel'));
      await tester.pumpAndSettle();
      expect(chosen, id);
      expect(tester.takeException(), isNull);
    },
  );
}
