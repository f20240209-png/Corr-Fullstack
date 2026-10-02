import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:provider/provider.dart';
import 'package:skincare_flutter/providers/auth_provider.dart';
import 'package:skincare_flutter/services/api_service.dart';
import 'package:skincare_flutter/screens/journal_screen.dart';
import 'package:skincare_flutter/widgets/journal_launcher.dart';
import 'package:skincare_flutter/widgets/journal_spotify_player.dart';

class JournalTestAuth extends AuthProvider {
  @override
  String get token => 'test-token';
}

void main() {
  late JournalTestAuth auth;
  setUp(() => auth = JournalTestAuth());
  tearDown(() {
    ApiService.client.close();
    ApiService.client = http.Client();
    ApiService.onUnauthorized = null;
    auth.dispose();
  });
  Widget journal() => ChangeNotifierProvider<AuthProvider>.value(
    value: auth,
    child: MaterialApp(home: JournalScreen(initialDate: DateTime(2026, 10, 2))),
  );
  testWidgets(
    'a song-only draft survives failed saves and prompts before changing dates',
    (tester) async {
      var writes = 0;
      ApiService.client = MockClient((request) async {
        if (request.method == 'PUT') {
          writes++;
          expect(
            request.body,
            contains('https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC'),
          );
          return http.Response('{"message":"Saving unavailable"}', 503);
        }
        return http.Response(
          request.url.path.endsWith('/journal')
              ? '{"entries":[]}'
              : '{"entry":null}',
          200,
        );
      });
      await tester.pumpWidget(journal());
      await tester.pumpAndSettle();
      await tester.ensureVisible(find.text('Add a song'));
      await tester.tap(find.text('Add a song'));
      await tester.pumpAndSettle();
      await tester.enterText(
        find.byKey(const ValueKey('journal-song-link')),
        'https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=share',
      );
      await tester.tap(find.text('Preview song'));
      await tester.pumpAndSettle();
      expect(find.byType(JournalSpotifyPlayer), findsOneWidget);
      await tester.ensureVisible(find.text('Save this page'));
      await tester.tap(find.text('Save this page'));
      await tester.pumpAndSettle();
      expect(writes, 1);
      expect(find.text('Saving unavailable'), findsOneWidget);
      expect(
        tester
            .widget<JournalSpotifyPlayer>(find.byType(JournalSpotifyPlayer))
            .trackId,
        '4uLU6hMCjMI75M1A2tKUQC',
      );
      await tester.ensureVisible(find.byTooltip('Next day'));
      await tester.tap(find.byTooltip('Next day'));
      await tester.pumpAndSettle();
      expect(find.text('Discard draft'), findsOneWidget);
      await tester.tap(find.text('Keep writing'));
      await tester.pumpAndSettle();
      expect(find.byType(JournalSpotifyPlayer), findsOneWidget);
    },
  );
  testWidgets(
    'removing a saved song sends an explicit clear and keeps the writing',
    (tester) async {
      var writes = 0;
      ApiService.client = MockClient((request) async {
        if (request.method == 'PUT') {
          writes++;
          expect(request.body, contains('name="spotifyUrl"'));
          expect(request.body, isNot(contains('open.spotify.com')));
          return http.Response(
            '{"entry":{"title":"My day","body":"A thought.","version":2,"spotifyTrackId":null}}',
            200,
          );
        }
        return http.Response(
          request.url.path.endsWith('/journal')
              ? '{"entries":[]}'
              : '{"entry":{"title":"My day","body":"A thought.","version":1,"spotifyTrackId":"4uLU6hMCjMI75M1A2tKUQC"}}',
          200,
        );
      });
      await tester.pumpWidget(journal());
      await tester.pumpAndSettle();
      await tester.ensureVisible(find.text('Remove song'));
      await tester.tap(find.text('Remove song'));
      await tester.pumpAndSettle();
      await tester.ensureVisible(find.text('Save this page'));
      await tester.tap(find.text('Save this page'));
      await tester.pumpAndSettle();
      expect(writes, 1);
      expect(find.byType(JournalSpotifyPlayer), findsNothing);
      expect(
        tester.widget<TextField>(find.byType(TextField).at(1)).controller!.text,
        'A thought.',
      );
    },
  );
  testWidgets('failed page load cannot show a blank editable replacement', (
    tester,
  ) async {
    ApiService.client = MockClient(
      (request) async => request.url.path.endsWith('/journal')
          ? http.Response('{"entries":[]}', 200)
          : http.Response('{"message":"Journal unavailable"}', 503),
    );
    await tester.pumpWidget(journal());
    await tester.pumpAndSettle();
    expect(find.text('Journal unavailable'), findsOneWidget);
    expect(find.byType(TextField), findsNothing);
    expect(find.text('Save this page'), findsNothing);
  });
  testWidgets(
    'failed save retains a free-form draft and date navigation asks before discarding',
    (tester) async {
      var dayLoads = 0, writes = 0;
      ApiService.client = MockClient((request) async {
        if (request.method == 'PUT') {
          writes++;
          return http.Response('{"message":"Saving unavailable"}', 503);
        }
        if (request.url.path.endsWith('/journal'))
          return http.Response('{"entries":[]}', 200);
        dayLoads++;
        return http.Response('{"entry":null}', 200);
      });
      await tester.pumpWidget(journal());
      await tester.pumpAndSettle();
      await tester.enterText(find.byType(TextField).at(0), 'My day');
      await tester.enterText(
        find.byType(TextField).at(1),
        'A walk and a thought. Nothing about skin.',
      );
      await tester.ensureVisible(find.text('Save this page'));
      await tester.tap(find.text('Save this page'));
      await tester.pumpAndSettle();
      expect(writes, 1);
      expect(find.text('Saving unavailable'), findsOneWidget);
      expect(
        tester.widget<TextField>(find.byType(TextField).at(1)).controller!.text,
        'A walk and a thought. Nothing about skin.',
      );
      await tester.ensureVisible(find.byTooltip('Next day'));
      await tester.tap(find.byTooltip('Next day'));
      await tester.pumpAndSettle();
      expect(find.text('Discard draft'), findsOneWidget);
      await tester.tap(find.text('Keep writing'));
      await tester.pumpAndSettle();
      expect(dayLoads, 1);
    },
  );
  testWidgets(
    'saved pages can change dates without a draft warning and diary fits a narrow viewport',
    (tester) async {
      await tester.binding.setSurfaceSize(const Size(320, 900));
      addTearDown(() => tester.binding.setSurfaceSize(null));
      final loaded = <String>[];
      ApiService.client = MockClient((request) async {
        if (request.method == 'PUT')
          return http.Response(
            jsonEncode({
              'entry': {
                'title': 'My day',
                'body': 'A moment worth remembering.',
                'version': 1,
                'photoPath': null,
              },
            }),
            200,
          );
        if (request.url.path.endsWith('/journal'))
          return http.Response('{"entries":[]}', 200);
        loaded.add(request.url.path);
        return http.Response('{"entry":null}', 200);
      });
      await tester.pumpWidget(journal());
      await tester.pumpAndSettle();
      await tester.enterText(find.byType(TextField).at(0), 'My day');
      await tester.enterText(
        find.byType(TextField).at(1),
        'A moment worth remembering.',
      );
      await tester.ensureVisible(find.text('Save this page'));
      await tester.tap(find.text('Save this page'));
      await tester.pumpAndSettle();
      await tester.ensureVisible(find.byTooltip('Next day'));
      await tester.tap(find.byTooltip('Next day'));
      await tester.pumpAndSettle();
      expect(find.text('Discard draft'), findsNothing);
      expect(loaded.last, '/api/journal/2026-10-03');
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: Padding(
              padding: EdgeInsets.all(18),
              child: JournalLauncher(),
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
    },
  );
}
