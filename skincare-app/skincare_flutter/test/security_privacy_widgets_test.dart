import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:provider/provider.dart';
import 'package:skincare_flutter/providers/auth_provider.dart';
import 'package:skincare_flutter/services/api_service.dart';
import 'package:skincare_flutter/screens/friend_profile_screen.dart';
import 'package:skincare_flutter/screens/find_friends_screen.dart';
import 'package:skincare_flutter/widgets/journal_song_card.dart';
import 'package:skincare_flutter/widgets/journal_spotify_player.dart';

class _PrivacyAuth extends AuthProvider {
  @override
  String get token => 'privacy-test-token';
}

void main() {
  late _PrivacyAuth auth;
  setUp(() => auth = _PrivacyAuth());
  tearDown(() {
    ApiService.client.close();
    ApiService.client = http.Client();
    ApiService.onUnauthorized = null;
    auth.dispose();
  });
  Widget app(Widget home) => ChangeNotifierProvider<AuthProvider>.value(
    value: auth,
    child: MaterialApp(home: home),
  );

  testWidgets(
    'friend identity fits a narrow screen and ignores private fields from an older backend',
    (tester) async {
      await tester.binding.setSurfaceSize(const Size(320, 760));
      addTearDown(() => tester.binding.setSurfaceSize(null));
      ApiService.client = MockClient(
        (request) async => http.Response(
          jsonEncode({
            'name': '',
            'username': 'myfriend',
            'profile': {
              'skinType': 'PRIVATE_SKIN',
              'budget': 123456,
              'skinGoals': ['PRIVATE_GOAL'],
            },
            'skincareLogs': [
              {'notes': 'PRIVATE_NOTE', 'photo': 'PRIVATE_PHOTO'},
            ],
          }),
          200,
        ),
      );
      await tester.pumpWidget(
        app(const FriendProfileScreen(userId: 2, name: 'Friend')),
      );
      await tester.pumpAndSettle();
      expect(find.text('@myfriend'), findsOneWidget);
      expect(find.text('Personal stays personal'), findsOneWidget);
      for (final value in [
        'PRIVATE_SKIN',
        '123456',
        'PRIVATE_GOAL',
        'PRIVATE_NOTE',
        'PRIVATE_PHOTO',
      ]) {
        expect(find.text(value), findsNothing);
      }
      expect(find.byType(Image), findsNothing);
      expect(tester.takeException(), isNull);
    },
  );

  testWidgets(
    'unfriend requires confirmation and uses the authenticated DELETE endpoint',
    (tester) async {
      var deletes = 0, disconnected = false;
      ApiService.client = MockClient((request) async {
        expect(request.headers['Authorization'], 'Bearer privacy-test-token');
        if (request.method == 'DELETE') {
          expect(request.url.path, '/api/friends/2');
          deletes++;
          return http.Response('{"message":"Friend removed."}', 200);
        }
        return http.Response('{"name":"My friend","username":"myfriend"}', 200);
      });
      await tester.pumpWidget(
        app(
          Builder(
            builder: (context) => Scaffold(
              body: TextButton(
                onPressed: () async {
                  disconnected =
                      await Navigator.push<bool>(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const FriendProfileScreen(
                            userId: 2,
                            name: 'Friend',
                          ),
                        ),
                      ) ==
                      true;
                },
                child: const Text('Visit friend'),
              ),
            ),
          ),
        ),
      );
      await tester.tap(find.text('Visit friend'));
      await tester.pumpAndSettle();
      await tester.ensureVisible(find.text('Remove friend'));
      await tester.tap(find.text('Remove friend'));
      await tester.pumpAndSettle();
      expect(deletes, 0);
      await tester.tap(find.text('Keep friend'));
      await tester.pumpAndSettle();
      expect(deletes, 0);
      await tester.tap(find.text('Remove friend'));
      await tester.pumpAndSettle();
      await tester.tap(find.widgetWithText(FilledButton, 'Remove friend'));
      await tester.pumpAndSettle();
      expect(deletes, 1);
      expect(disconnected, isTrue);
      expect(find.text('Visit friend'), findsOneWidget);
      expect(tester.takeException(), isNull);
    },
  );

  testWidgets('a delayed friend response is ignored after leaving the screen', (
    tester,
  ) async {
    final response = Completer<http.Response>();
    ApiService.client = MockClient((_) => response.future);
    await tester.pumpWidget(
      app(const FriendProfileScreen(userId: 2, name: 'Friend')),
    );
    await tester.pump();
    await tester.pumpWidget(app(const Scaffold()));
    response.complete(
      http.Response('{"name":"Friend","username":"myfriend"}', 200),
    );
    await tester.pumpAndSettle();
    expect(tester.takeException(), isNull);
  });

  testWidgets(
    'friend search debounces typing and accepts a result without indexing the pending list',
    (tester) async {
      var searches = 0, accepts = 0;
      ApiService.client = MockClient((request) async {
        if (request.url.path.endsWith('/users/search')) {
          searches++;
          return http.Response(
            '{"users":[{"id":2,"name":"My friend","username":"myfriend","skinType":"PRIVATE_SKIN","relationStatus":"PENDING_RECEIVED","requestId":57}]}',
            200,
          );
        }
        if (request.url.path.endsWith('/accept/57')) {
          accepts++;
          return http.Response('{"message":"Accepted"}', 200);
        }
        return http.Response('{"requests":[]}', 200);
      });
      await tester.pumpWidget(app(const FindFriendsScreen()));
      await tester.pumpAndSettle();
      for (final query in ['m', 'my', 'myf', 'myfriend']) {
        await tester.enterText(find.byType(TextField), query);
        await tester.pump(const Duration(milliseconds: 50));
      }
      expect(searches, 0);
      await tester.pump(const Duration(milliseconds: 400));
      await tester.pumpAndSettle();
      expect(searches, 1);
      expect(find.text('PRIVATE_SKIN'), findsNothing);
      await tester.tap(find.text('Accept'));
      await tester.pumpAndSettle();
      expect(accepts, 1);
      expect(find.text('Friends'), findsOneWidget);
      expect(tester.takeException(), isNull);
    },
  );

  testWidgets(
    'a saved soundtrack creates no player until clicked and changing tracks resets the choice',
    (tester) async {
      const id = '4uLU6hMCjMI75M1A2tKUQC';
      Widget card(String? trackId) => MaterialApp(
        home: Scaffold(
          body: SingleChildScrollView(
            child: JournalSongCard(
              trackId: trackId,
              enabled: true,
              onChoose: () {},
              onRemove: () {},
            ),
          ),
        ),
      );
      await tester.pumpWidget(card(id));
      expect(find.byType(JournalSpotifyPlayer), findsNothing);
      expect(find.text('Your song is saved'), findsOneWidget);
      await tester.tap(find.text('Load Spotify player'));
      await tester.pumpAndSettle();
      expect(find.byType(JournalSpotifyPlayer), findsOneWidget);
      await tester.pumpWidget(card('0123456789012345678901'));
      expect(find.byType(JournalSpotifyPlayer), findsNothing);
      await tester.pumpWidget(card(null));
      expect(find.text('Add a song'), findsOneWidget);
      expect(tester.takeException(), isNull);
    },
  );
}
