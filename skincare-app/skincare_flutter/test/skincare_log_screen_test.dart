import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:provider/provider.dart';
import 'package:skincare_flutter/providers/auth_provider.dart';
import 'package:skincare_flutter/screens/skincare_log_screen.dart';
import 'package:skincare_flutter/services/api_service.dart';

class TestAuthProvider extends AuthProvider {
  @override
  String get token => 'test-token';
}

const recommendation = {
  'routine': {
    'morning': [
      {'product': 'Gentle cleanser', 'action': 'Cleanse'},
      {'product': 'Daily moisturiser', 'action': 'Moisturise'},
    ],
    'evening': [
      {'product': 'Gentle cleanser', 'action': 'Cleanse'},
    ],
  },
};

void main() {
  late TestAuthProvider auth;
  late List<Map<String, dynamic>> saved;

  setUp(() {
    auth = TestAuthProvider();
    saved = [];
    ApiService.client = MockClient((request) async {
      if (request.method == 'POST' && request.url.path.endsWith('/logs')) {
        saved.add(jsonDecode(request.body) as Map<String, dynamic>);
        return http.Response('{"log":{"id":1}}', 201);
      }
      return http.Response('{"logs":[],"conflicts":[]}', 200);
    });
  });
  tearDown(() {
    ApiService.client.close();
    ApiService.client = http.Client();
    ApiService.onUnauthorized = null;
    auth.dispose();
  });

  Future<void> open(WidgetTester tester, {bool withRoutine = true}) async {
    await tester.pumpWidget(
      ChangeNotifierProvider<AuthProvider>.value(
        value: auth,
        child: MaterialApp(
          home: SkincareLogScreen(
            recommendation: withRoutine ? recommendation : null,
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    await tester.tap(find.text('Morning'));
    await tester.pumpAndSettle();
  }

  testWidgets(
    'saved routine starts unchecked; save sends only the current session',
    (tester) async {
      await open(tester);
      expect(
        tester
            .widgetList<CheckboxListTile>(find.byType(CheckboxListTile))
            .every((tile) => tile.value == false),
        isTrue,
      );
      expect(
        tester.widget<FilledButton>(find.byType(FilledButton)).onPressed,
        isNull,
      );
      await tester.tap(find.text('Gentle cleanser'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Evening'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Gentle cleanser'));
      await tester.pumpAndSettle();
      await tester.tap(find.byType(FilledButton));
      await tester.pumpAndSettle();
      expect(saved, hasLength(1));
      expect(saved.single['productsUsed'], ['Evening: Gentle cleanser']);
      await tester.tap(find.text('Log Routine'));
      await tester.pumpAndSettle();
      expect(
        tester.widget<FilledButton>(find.byType(FilledButton)).onPressed,
        isNull,
      );
      await tester.tap(find.text('Morning'));
      await tester.pumpAndSettle();
      expect(
        tester
            .widget<CheckboxListTile>(find.byType(CheckboxListTile).first)
            .value,
        isTrue,
      );
    },
  );

  testWidgets('narrow screen shows checklist without overflow', (tester) async {
    tester.view.physicalSize = const Size(360, 800);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    await open(tester);
    expect(find.text('Gentle cleanser'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('manual search remains available without a saved routine', (
    tester,
  ) async {
    await open(tester, withRoutine: false);
    expect(find.byType(CheckboxListTile), findsNothing);
    final search = tester.widget<TextField>(find.byType(TextField).first);
    expect(search.decoration?.hintText, startsWith('Search products'));
    expect(
      tester.widget<FilledButton>(find.byType(FilledButton)).onPressed,
      isNull,
    );
  });
  testWidgets('failed save keeps the selection available for retry', (
    tester,
  ) async {
    ApiService.client.close();
    ApiService.client = MockClient((request) async {
      if (request.method == 'POST') {
        return http.Response('{"message":"Unable to save"}', 500);
      }
      return http.Response('{"logs":[]}', 200);
    });
    await open(tester);
    await tester.tap(find.text('Gentle cleanser'));
    await tester.pumpAndSettle();
    await tester.tap(find.byType(FilledButton));
    await tester.pumpAndSettle();
    expect(find.text('Unable to save'), findsOneWidget);
    expect(
      tester
          .widget<CheckboxListTile>(find.byType(CheckboxListTile).first)
          .value,
      isTrue,
    );
    expect(
      tester.widget<FilledButton>(find.byType(FilledButton)).onPressed,
      isNotNull,
    );
  });
}
