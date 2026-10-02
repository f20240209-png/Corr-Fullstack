import 'dart:typed_data';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:skincare_flutter/services/api_service.dart';

void main() {
  test(
    'journal songs send authenticated multipart fields and reload persisted values',
    () async {
      const song = 'https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC';
      var writes = 0;
      ApiService.client = MockClient((request) async {
        expect(request.headers['Authorization'], 'Bearer token');
        if (request.method == 'PUT') {
          writes++;
          expect(request.body, contains('name="spotifyUrl"'));
          expect(
            request.body,
            writes == 1 ? contains(song) : isNot(contains(song)),
          );
          return http.Response(
            '{"entry":{"spotifyUrl":${writes == 1 ? '"$song"' : 'null'},"version":$writes}}',
            200,
          );
        }
        return http.Response(
          '{"entry":{"spotifyUrl":"$song","spotifyTrackId":"4uLU6hMCjMI75M1A2tKUQC","version":1}}',
          200,
        );
      });
      expect(
        (await ApiService.saveJournalEntry('token', '2026-10-02', {
          'title': '',
          'body': '',
          'version': '0',
          'spotifyUrl': song,
        }))['entry']['spotifyUrl'],
        song,
      );
      expect(
        (await ApiService.getJournalEntry(
          'token',
          '2026-10-02',
        ))['entry']['spotifyUrl'],
        song,
      );
      expect(
        (await ApiService.saveJournalEntry('token', '2026-10-02', {
          'title': '',
          'body': 'Keep the writing.',
          'version': '1',
          'spotifyUrl': '',
        }))['entry']['spotifyUrl'],
        isNull,
      );
    },
  );
  tearDown(() {
    ApiService.client.close();
    ApiService.client = http.Client();
    ApiService.onUnauthorized = null;
  });
  test(
    'journal month and day request only the authenticated private endpoints',
    () async {
      ApiService.client = MockClient((request) async {
        expect(request.headers['Authorization'], 'Bearer token');
        if (request.url.path.endsWith('/journal')) {
          expect(request.url.queryParameters, {'month': '2026-10'});
          return http.Response('{"entries":[]}', 200);
        }
        expect(request.url.path, '/api/journal/2026-10-02');
        return http.Response('{"entry":null}', 200);
      });
      expect(
        (await ApiService.getJournalMonth('token', '2026-10'))['entries'],
        isEmpty,
      );
      expect(
        (await ApiService.getJournalEntry('token', '2026-10-02'))['entry'],
        isNull,
      );
    },
  );
  test(
    'writing without a photo uses multipart and sends the loaded version',
    () async {
      ApiService.client = MockClient((request) async {
        expect(request.method, 'PUT');
        expect(request.headers['Authorization'], 'Bearer token');
        expect(
          request.headers['content-type'],
          contains('multipart/form-data'),
        );
        expect(request.body, contains('A free thought'));
        expect(request.body, contains('name="version"'));
        expect(request.body, isNot(contains('name="photo"')));
        return http.Response('{"entry":{"version":2}}', 200);
      });
      expect(
        (await ApiService.saveJournalEntry('token', '2026-10-02', {
          'title': '',
          'body': 'A free thought',
          'version': '1',
        }))['entry']['version'],
        2,
      );
    },
  );
  test(
    'optional photos upload bytes and a conflict remains an error',
    () async {
      ApiService.client = MockClient((request) async {
        expect(request.body, contains('name="photo"'));
        expect(request.body, contains('journal-photo.jpg'));
        return http.Response('{"message":"This page changed"}', 409);
      });
      await expectLater(
        ApiService.saveJournalEntry('token', '2026-10-02', {
          'title': '',
          'body': 'My draft',
          'version': '1',
        }, photo: Uint8List.fromList([1, 2, 3])),
        throwsA(isA<ApiException>().having((e) => e.statusCode, 'status', 409)),
      );
    },
  );
  test(
    'journal photos are authenticated and refuse external or unrelated paths',
    () async {
      ApiService.client = MockClient((request) async {
        expect(request.url.path, '/api/journal/2026-10-02/photo');
        expect(request.headers['Authorization'], 'Bearer token');
        return http.Response.bytes([1, 2, 3], 200);
      });
      expect(
        await ApiService.getJournalPhoto(
          'token',
          '/journal/2026-10-02/photo?v=1',
        ),
        [1, 2, 3],
      );
      for (final path in [
        'https://example.com/photo',
        '/friends/1/photo?v=1',
      ]) {
        await expectLater(
          ApiService.getJournalPhoto('token', path),
          throwsA(isA<ApiException>()),
        );
      }
    },
  );
  test(
    'collection filters are encoded and journal deletes include the loaded version',
    () async {
      ApiService.client = MockClient((request) async {
        if (request.method == 'GET') {
          expect(request.url.queryParameters, {
            'limit': '24',
            'before': '20',
            'q': 'Brand & name',
            'type': 'serum',
            'sort': 'rating',
            'minRating': '4',
          });
          return http.Response(
            '{"discoveries":[],"count":10,"filteredCount":0}',
            200,
          );
        }
        expect(request.url.path, '/api/journal/2026-10-02');
        expect(request.url.queryParameters, {'version': '3'});
        return http.Response('{"deleted":true}', 200);
      });
      expect(
        (await ApiService.getDiscoveries(
          'token',
          before: 20,
          search: ' Brand & name ',
          productType: 'serum',
          sort: 'rating',
          minRating: 4,
        ))['count'],
        10,
      );
      expect(
        (await ApiService.deleteJournalEntry(
          'token',
          '2026-10-02',
          3,
        ))['deleted'],
        true,
      );
    },
  );
}
