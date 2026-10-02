import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

Widget spotifyPlayer(String trackId) => const Center(
  child: Padding(
    padding: EdgeInsets.all(20),
    child: Text(
      'Use the song link below to listen in Spotify.',
      textAlign: TextAlign.center,
      style: TextStyle(color: AppTheme.textSecondary, height: 1.6),
    ),
  ),
);

// Native builds remain usable without importing browser-only libraries.
bool openSpotifyLink(String url) => false;
