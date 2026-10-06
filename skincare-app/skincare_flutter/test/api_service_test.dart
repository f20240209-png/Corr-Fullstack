import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:skincare_flutter/services/api_service.dart';

void main() {
  tearDown(() {
    ApiService.onUnauthorized = null;
    ApiService.client = http.Client();
  });
  test(
    'non-success responses throw instead of reporting generation or log success',
    () async {
      ApiService.client = MockClient(
        (_) async => http.Response('{"message":"AI unavailable"}', 503),
      );
      await expectLater(
        ApiService.refreshRecommendations('token'),
        throwsA(isA<ApiException>()),
      );
      await expectLater(
        ApiService.createSkincareLog('token', {'timeOfDay': 'morning'}),
        throwsA(isA<ApiException>()),
      );
    },
  );
  test('only protected 401 requests invalidate the rejected session', () async {
    String? rejected;
    ApiService.onUnauthorized = (token) => rejected = token;
    ApiService.client = MockClient(
      (_) async => http.Response('{"message":"Sign in again"}', 401),
    );
    await expectLater(
      ApiService.login('a@b.com', 'invalid'),
      throwsA(isA<ApiException>()),
    );
    expect(rejected, isNull);
    await expectLater(
      ApiService.getProfile('expired-token'),
      throwsA(isA<ApiException>()),
    );
    expect(rejected, 'expired-token');
  });
  test('missing profile remains an intentional empty state', () async {
    ApiService.client = MockClient(
      (_) async => http.Response('{"message":"Profile not found"}', 404),
    );
    expect((await ApiService.getProfile('token'))['statusCode'], 404);
  });
  test(
    'rate limits explain the wait without invalidating the signed-in session',
    () async {
      var expired = false;
      ApiService.onUnauthorized = (_) => expired = true;
      ApiService.client = MockClient(
        (_) async => http.Response(
          '{"message":"Too many routine generation requests.","retryAfterSeconds":121}',
          429,
        ),
      );
      await expectLater(
        ApiService.refreshRecommendations('valid-token'),
        throwsA(
          isA<ApiException>()
              .having((error) => error.statusCode, 'status', 429)
              .having(
                (error) => error.message,
                'wait',
                contains('about 3 minutes'),
              ),
        ),
      );
      expect(expired, isFalse);
    },
  );
  test(
    'query strings are encoded rather than interpreted as extra parameters',
    () async {
      ApiService.client = MockClient((request) async {
        expect(request.url.queryParameters['query'], 'A & B + SPF');
        expect(request.url.queryParameters.length, 1);
        return http.Response('{"products":[]}', 200);
      });
      await ApiService.searchProducts('A & B + SPF');
    },
  );
  test(
    'heatmap accepts valid numeric values and preserves calendar entries',
    () async {
      ApiService.client = MockClient(
        (_) async => http.Response(
          jsonEncode({
            'heatmapData': [
              {'date': '2026-10-01', 'dayNumber': 1, 'status': 2},
            ],
            'currentStreak': 3,
          }),
          200,
        ),
      );
      final data = await ApiService.getMonthlyHeatmap('token', 2026, 10);
      expect(data['currentStreak'], 3);
      expect((data['heatmapData'] as List).length, 1);
    },
  );
  test('proxy HTML yields a readable error', () {
    expect(
      () => ApiService.decodeResponse(
        http.Response('<html>Unavailable</html>', 503),
      ),
      throwsA(isA<ApiException>()),
    );
  });
}
