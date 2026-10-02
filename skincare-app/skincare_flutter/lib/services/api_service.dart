import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';

import 'package:http/http.dart' as http;

import '../models/heatmap_day_model.dart';
import 'time_zone.dart';

class ApiException implements Exception {
  final String message;
  final int? statusCode;
  const ApiException(this.message, [this.statusCode]);
  @override
  String toString() => message;
}

class ApiService {
  static const String baseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'https://glowguide-fullstack.onrender.com/api',
  );
  static http.Client client = http.Client();
  static void Function(String token)? onUnauthorized;

  static Map<String, dynamic> decodeResponse(
    http.Response response, {
    bool allowNotFound = false,
    String? token,
  }) {
    if (response.statusCode == 401 && token != null)
      onUnauthorized?.call(token);
    Map<String, dynamic> data;
    try {
      final decoded = jsonDecode(response.body);
      if (decoded is! Map<String, dynamic>) throw const FormatException();
      data = decoded;
    } on FormatException {
      throw ApiException(
        'The server returned an unreadable response. Please try again.',
        response.statusCode,
      );
    }
    if (response.statusCode < 200 || response.statusCode >= 300) {
      if (!(allowNotFound && response.statusCode == 404)) {
        throw ApiException(
          data['message'] is String
              ? data['message'] as String
              : 'The request failed. Please try again.',
          response.statusCode,
        );
      }
    }
    return {...data, 'statusCode': response.statusCode};
  }

  static Future<Map<String, dynamic>> _request(
    String method,
    String path, {
    String? token,
    Map<String, dynamic>? body,
    Map<String, String>? query,
    bool allowNotFound = false,
    Duration timeout = const Duration(seconds: 30),
  }) async {
    final uri = Uri.parse('$baseUrl$path').replace(queryParameters: query);
    final request = http.Request(method, uri);
    request.headers['Content-Type'] = 'application/json';
    if (token != null) request.headers['Authorization'] = 'Bearer $token';
    if (body != null) request.body = jsonEncode(body);
    try {
      final response = await (() async {
        final streamed = await client.send(request);
        return http.Response.fromStream(streamed);
      })().timeout(timeout);
      return decodeResponse(
        response,
        allowNotFound: allowNotFound,
        token: token,
      );
    } on TimeoutException {
      throw const ApiException('The request timed out. Please try again.');
    } on http.ClientException {
      throw const ApiException(
        'Unable to connect to Corr. Check your connection and try again.',
      );
    }
  }

  static Future<Map<String, dynamic>> getSession(String token) =>
      _request('GET', '/auth/session', token: token);
  static Future<Map<String, dynamic>> register(
    String name,
    String email,
    String password,
  ) => _request(
    'POST',
    '/auth/register',
    body: {'name': name, 'email': email, 'password': password},
  );
  static Future<Map<String, dynamic>> login(String email, String password) =>
      _request(
        'POST',
        '/auth/login',
        body: {'email': email, 'password': password},
      );
  static Future<Map<String, dynamic>> googleLogin(String idToken) =>
      _request('POST', '/auth/google', body: {'idToken': idToken});
  static Future<Map<String, dynamic>> firebaseLogin(
    String idToken,
    String email,
    String name,
  ) => _request(
    'POST',
    '/auth/firebase-login',
    body: {'idToken': idToken, 'email': email, 'name': name},
  );
  static Future<Map<String, dynamic>> phoneLogin(
    String idToken, {
    String? name,
  }) => _request(
    'POST',
    '/auth/phone-login',
    body: {'idToken': idToken, if (name != null) 'name': name},
  );
  static Future<Map<String, dynamic>> createProfile(
    String token,
    Map<String, dynamic> data,
  ) => _request('POST', '/profile', token: token, body: data);
  static Future<Map<String, dynamic>> getProfile(String token) =>
      _request('GET', '/profile', token: token, allowNotFound: true);
  static Future<Map<String, dynamic>> updateProfile(
    String token,
    Map<String, dynamic> data,
  ) => _request('PUT', '/profile', token: token, body: data);
  static Future<Map<String, dynamic>> checkUsername(
    String username, {
    String? token,
  }) => _request(
    'GET',
    '/profile/check-username',
    token: token,
    query: {'username': username},
  );
  static Future<Map<String, dynamic>> setUsername(
    String token,
    String username,
  ) => _request(
    'POST',
    '/profile/username',
    token: token,
    body: {'username': username},
  );
  static Future<Map<String, dynamic>> searchProducts(String query) =>
      _request('GET', '/profile/search-products', query: {'query': query});
  static Future<Map<String, dynamic>> getRecommendations(String token) =>
      _request(
        'GET',
        '/recommendations',
        token: token,
        timeout: const Duration(seconds: 240),
      );
  static Future<Map<String, dynamic>> refreshRecommendations(String token) =>
      _request(
        'POST',
        '/recommendations/refresh',
        token: token,
        timeout: const Duration(seconds: 240),
      );
  static Future<Map<String, dynamic>> createSkincareLog(
    String token,
    Map<String, dynamic> data,
  ) => _request('POST', '/logs', token: token, body: data);
  static Future<Map<String, dynamic>> getSkincareLogs(String token) =>
      _request('GET', '/logs', token: token);
  static Future<Map<String, dynamic>> analyzeIngredients(
    String token,
    List<String> ingredients,
  ) => _request(
    'POST',
    '/analyze-routine',
    token: token,
    body: {'ingredients': ingredients},
  );

  static Future<Map<String, dynamic>> getMonthlyHeatmap(
    String token,
    int year,
    int month,
  ) async {
    final zone = browserTimeZone();
    final data = await _request(
      'GET',
      '/logs/heatmap',
      token: token,
      query: {
        'year': '$year',
        'month': '$month',
        'offsetMinutes': '${DateTime.now().timeZoneOffset.inMinutes}',
        if (zone != null) 'timeZone': zone,
      },
    );
    final days = data['heatmapData'];
    if (days is! List)
      throw const ApiException(
        'Consistency data is incomplete. Please try again.',
      );
    return {
      ...data,
      'heatmapData': days
          .map(
            (day) => HeatmapDay.fromJson(Map<String, dynamic>.from(day as Map)),
          )
          .toList(),
      'currentStreak': int.tryParse('${data['currentStreak']}') ?? 0,
    };
  }

  static Future<Map<String, dynamic>> getCommunityPosts(
    String token, {
    int page = 1,
    String? category,
  }) => _request(
    'GET',
    '/community',
    token: token,
    query: {'page': '$page', if (category != null) 'category': category},
  );
  static Future<Map<String, dynamic>> getMyPosts(String token) =>
      _request('GET', '/community/my-posts', token: token);
  static Future<Map<String, dynamic>> getPostById(String token, int postId) =>
      _request('GET', '/community/$postId', token: token);
  static Future<Map<String, dynamic>> createPost(
    String token, {
    required String question,
    String? details,
    required String category,
    String? skinType,
    bool isAnonymous = true,
  }) => _request(
    'POST',
    '/community',
    token: token,
    body: {
      'question': question,
      'details': details,
      'category': category,
      'skinType': skinType,
      'isAnonymous': isAnonymous,
    },
  );
  static Future<Map<String, dynamic>> answerPost(
    String token,
    int postId, {
    required String answer,
    bool isAnonymous = true,
  }) => _request(
    'POST',
    '/community/$postId/answer',
    token: token,
    body: {'answer': answer, 'isAnonymous': isAnonymous},
  );
  static Future<void> likePost(String token, int postId) async {
    await _request('POST', '/community/$postId/like', token: token);
  }

  static Future<void> markAnswerHelpful(String token, int answerId) async {
    await _request(
      'POST',
      '/community/answers/$answerId/helpful',
      token: token,
    );
  }

  static Future<Map<String, dynamic>> searchUsers(
    String token,
    String username,
  ) => _request(
    'GET',
    '/users/search',
    token: token,
    query: {'username': username},
  );
  static Future<Map<String, dynamic>> getFriends(String token) =>
      _request('GET', '/friends', token: token);
  static Future<Map<String, dynamic>> getPendingRequests(String token) =>
      _request('GET', '/friends/requests', token: token);
  static Future<Map<String, dynamic>> sendFriendRequest(
    String token,
    int userId,
  ) => _request('POST', '/friends/request/$userId', token: token);
  static Future<Map<String, dynamic>> acceptFriendRequest(
    String token,
    int requestId,
  ) => _request('POST', '/friends/accept/$requestId', token: token);
  static Future<Map<String, dynamic>> rejectFriendRequest(
    String token,
    int requestId,
  ) => _request('POST', '/friends/reject/$requestId', token: token);
  static Future<Map<String, dynamic>> cancelFriendRequest(
    String token,
    int requestId,
  ) => _request('DELETE', '/friends/request/$requestId', token: token);
  static Future<Map<String, dynamic>> getFriendProfile(
    String token,
    int userId,
  ) => _request('GET', '/friends/$userId/profile', token: token);

  static Future<Map<String, dynamic>> getDiscoveries(
    String token, {
    int limit = 24,
    int? before,
    String? search,
    String? productType,
    String? sort,
    int? minRating,
  }) => _request(
    'GET',
    '/discoveries',
    token: token,
    query: {
      'limit': '$limit',
      if (before != null) 'before': '$before',
      if (search?.trim().isNotEmpty == true) 'q': search!.trim(),
      if (productType?.isNotEmpty == true) 'type': productType!,
      if (sort != null) 'sort': sort,
      if (minRating != null) 'minRating': '$minRating',
    },
  );

  static Future<Map<String, dynamic>> saveDiscovery(
    String token,
    Map<String, String> fields, {
    int? id,
    Uint8List? photo,
  }) async {
    final request = http.MultipartRequest(
      id == null ? 'POST' : 'PUT',
      Uri.parse('$baseUrl/discoveries${id == null ? '' : '/$id'}'),
    );
    request.headers['Authorization'] = 'Bearer $token';
    request.fields.addAll(fields);
    if (photo != null)
      request.files.add(
        http.MultipartFile.fromBytes(
          'photo',
          photo,
          filename: 'product-photo.jpg',
        ),
      );
    try {
      final response = await (() async {
        final streamed = await client.send(request);
        return http.Response.fromStream(streamed);
      })().timeout(const Duration(seconds: 60));
      return decodeResponse(response, token: token);
    } on TimeoutException {
      throw const ApiException(
        'Upload timed out. Check your collection before retrying.',
      );
    } on http.ClientException {
      throw const ApiException(
        'Unable to upload. Check your connection and try again.',
      );
    }
  }

  static Future<Map<String, dynamic>> deleteDiscovery(
    String token,
    int id,
    int version,
  ) => _request(
    'DELETE',
    '/discoveries/$id',
    token: token,
    query: {'version': '$version'},
  );

  static Future<Uint8List> getDiscoveryPhoto(String token, String path) async {
    // Only application-relative discovery image endpoints may receive the session token.
    if (!RegExp(r'^/discoveries/\d+/photo\?').hasMatch(path))
      throw const ApiException('Invalid photo reference.');
    try {
      final response = await client
          .get(
            Uri.parse('$baseUrl$path'),
            headers: {'Authorization': 'Bearer $token'},
          )
          .timeout(const Duration(seconds: 30));
      if (response.statusCode != 200) decodeResponse(response, token: token);
      return response.bodyBytes;
    } on TimeoutException {
      throw const ApiException('Photo loading timed out.');
    } on http.ClientException {
      throw const ApiException('Unable to load photo.');
    }
  }

  static Future<Map<String, dynamic>> getJournalMonth(
    String token,
    String month,
  ) => _request('GET', '/journal', token: token, query: {'month': month});
  static Future<Map<String, dynamic>> getJournalEntry(
    String token,
    String date,
  ) => _request('GET', '/journal/${Uri.encodeComponent(date)}', token: token);
  static Future<Map<String, dynamic>> deleteJournalEntry(
    String token,
    String date,
    int version,
  ) => _request(
    'DELETE',
    '/journal/${Uri.encodeComponent(date)}',
    token: token,
    query: {'version': '$version'},
  );
  static Future<Map<String, dynamic>> saveJournalEntry(
    String token,
    String date,
    Map<String, String> fields, {
    Uint8List? photo,
  }) async {
    final request = http.MultipartRequest(
      'PUT',
      Uri.parse('$baseUrl/journal/${Uri.encodeComponent(date)}'),
    );
    request.headers['Authorization'] = 'Bearer $token';
    request.fields.addAll(fields);
    if (photo != null)
      request.files.add(
        http.MultipartFile.fromBytes(
          'photo',
          photo,
          filename: 'journal-photo.jpg',
        ),
      );
    try {
      final response = await (() async {
        final streamed = await client.send(request);
        return http.Response.fromStream(streamed);
      })().timeout(const Duration(seconds: 60));
      return decodeResponse(response, token: token);
    } on TimeoutException {
      throw const ApiException(
        'Saving timed out. Reload the saved page before retrying; your draft is still here.',
      );
    } on http.ClientException {
      throw const ApiException(
        'Unable to save your page. Check your connection and try again.',
      );
    }
  }

  static Future<Uint8List> getJournalPhoto(String token, String path) async {
    if (!RegExp(r'^/journal/\d{4}-\d{2}-\d{2}/photo\?').hasMatch(path)) {
      throw const ApiException('Invalid journal photo reference.');
    }
    try {
      final response = await client
          .get(
            Uri.parse('$baseUrl$path'),
            headers: {'Authorization': 'Bearer $token'},
          )
          .timeout(const Duration(seconds: 30));
      if (response.statusCode != 200) decodeResponse(response, token: token);
      return response.bodyBytes;
    } on TimeoutException {
      throw const ApiException('Photo loading timed out.');
    } on http.ClientException {
      throw const ApiException('Unable to load your journal photo.');
    }
  }
}
