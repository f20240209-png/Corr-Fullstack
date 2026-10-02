import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../services/api_service.dart';
import '../models/community_post_model.dart';
import '../theme/app_theme.dart';
import '../widgets/community_widgets.dart';
import '../widgets/routine_step_card.dart';

class QuestionDetailScreen extends StatefulWidget {
  final int postId;
  const QuestionDetailScreen({super.key, required this.postId});
  @override
  State<QuestionDetailScreen> createState() => _QuestionDetailScreenState();
}

class _QuestionDetailScreenState extends State<QuestionDetailScreen> {
  CommunityPostDetail? _post;
  bool _loading = true,
      _submitting = false,
      _anonymous = true,
      _reacting = false;
  String? _error, _answerError;
  int _request = 0;
  final _answer = TextEditingController();
  final _replyKey = GlobalKey();

  @override
  void initState() {
    super.initState();
    _fetchPost();
  }

  @override
  void dispose() {
    _answer.dispose();
    super.dispose();
  }

  String get _token =>
      context.read<AuthProvider>().token ??
      (throw const ApiException('Please sign in again.'));

  Future<void> _fetchPost({bool showLoading = true}) async {
    if (!mounted) return;
    final request = ++_request;
    setState(() {
      if (showLoading && _post == null) _loading = true;
      _error = null;
    });
    try {
      final data = await ApiService.getPostById(_token, widget.postId);
      final post = CommunityPostDetail.fromJson(data);
      if (mounted && request == _request) setState(() => _post = post);
    } catch (e) {
      if (mounted && request == _request) setState(() => _error = e.toString());
    } finally {
      if (mounted && request == _request) setState(() => _loading = false);
    }
  }

  Future<void> _submitAnswer() async {
    if (_submitting) return;
    final text = _answer.text.trim();
    if (text.length < 5) {
      setState(() => _answerError = 'Write at least 5 characters.');
      return;
    }
    setState(() {
      _submitting = true;
      _answerError = null;
    });
    try {
      final data = await ApiService.answerPost(
        _token,
        widget.postId,
        answer: text,
        isAnonymous: _anonymous,
      );
      if (data['answer'] == null)
        throw const ApiException('Could not post your reply. Please retry.');
      if (!mounted) return;
      _answer.clear();
      FocusScope.of(context).unfocus();
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Your reply is posted.')));
      await _fetchPost(showLoading: false);
    } catch (e) {
      if (mounted) setState(() => _answerError = e.toString());
    } finally {
      if (mounted) setState(() => _submitting = false);
    }
  }

  Future<void> _react({int? answerId}) async {
    if (_reacting) return;
    setState(() => _reacting = true);
    try {
      if (answerId == null) {
        await ApiService.likePost(_token, widget.postId);
      } else {
        await ApiService.markAnswerHelpful(_token, answerId);
      }
      if (mounted) await _fetchPost(showLoading: false);
    } catch (e) {
      if (mounted)
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text(e.toString())));
    } finally {
      if (mounted) setState(() => _reacting = false);
    }
  }

  @override
  Widget build(BuildContext context) => PopScope(
    canPop: !_submitting,
    child: Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        backgroundColor: AppTheme.background,
        title: const Text('Conversation'),
        actions: [
          IconButton(
            tooltip: 'Write a reply',
            icon: const Icon(Icons.edit_note_rounded),
            onPressed: _post == null
                ? null
                : () {
                    final target = _replyKey.currentContext;
                    if (target != null)
                      Scrollable.ensureVisible(
                        target,
                        duration: const Duration(milliseconds: 250),
                        alignment: 0.1,
                      );
                  },
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : SafeArea(
              top: false,
              child: RefreshIndicator(
                onRefresh: () => _fetchPost(showLoading: false),
                child: ListView(
                  physics: const AlwaysScrollableScrollPhysics(),
                  padding: const EdgeInsets.fromLTRB(18, 12, 18, 32),
                  children: [
                    Center(
                      child: ConstrainedBox(
                        constraints: const BoxConstraints(maxWidth: 840),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            if (_error != null) ...[
                              CommunityStateCard(
                                icon: Icons.cloud_off_outlined,
                                title: _post == null
                                    ? 'Could not load this conversation'
                                    : 'Could not refresh replies',
                                message: _error!,
                                onAction: () => _fetchPost(showLoading: false),
                              ),
                              const SizedBox(height: 18),
                            ],
                            if (_post != null) ...[
                              _questionCard(),
                              const SizedBox(height: 22),
                              Text(
                                '${_post!.answers.length} ${_post!.answers.length == 1 ? 'reply' : 'replies'}',
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                              const SizedBox(height: 12),
                              if (_post!.answers.isEmpty)
                                const CommunityStateCard(
                                  icon: Icons.chat_bubble_outline_rounded,
                                  title: 'Be the first to share',
                                  message:
                                      'Have a similar experience? Your reply could help someone find their next small step.',
                                )
                              else
                                ..._post!.answers.map(_answerCard),
                              const SizedBox(height: 22),
                              Container(key: _replyKey, child: _answerInput()),
                            ],
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
    ),
  );

  Widget _questionCard() {
    final post = _post!;
    return SizedBox(
      width: double.infinity,
      child: CorrPanel(
        padding: const EdgeInsets.all(22),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CommunityAuthor(name: post.author, date: post.createdAt),
            const SizedBox(height: 18),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                CorrPill(label: communityLabel(post.category)),
                if (post.skinType != null)
                  CorrPill(label: '${communityLabel(post.skinType!)} skin'),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              post.question,
              style: GoogleFonts.playfairDisplay(fontSize: 25, height: 1.3),
            ),
            if (post.details?.trim().isNotEmpty == true) ...[
              const SizedBox(height: 14),
              Text(
                post.details!,
                style: const TextStyle(
                  fontSize: 14,
                  height: 1.7,
                  color: AppTheme.textSecondary,
                ),
              ),
            ],
            const SizedBox(height: 16),
            const Divider(),
            OutlinedButton.icon(
              onPressed: _reacting ? null : () => _react(),
              icon: const Icon(Icons.favorite_border_rounded, size: 17),
              label: Text('Like (${post.likes})'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _answerCard(CommunityAnswer answer) => Padding(
    padding: const EdgeInsets.only(bottom: 12),
    child: SizedBox(
      width: double.infinity,
      child: CorrPanel(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CommunityAuthor(name: answer.author, date: answer.createdAt),
            const SizedBox(height: 14),
            Text(
              answer.answer,
              style: const TextStyle(fontSize: 14, height: 1.7),
            ),
            const SizedBox(height: 12),
            TextButton.icon(
              onPressed: _reacting ? null : () => _react(answerId: answer.id),
              icon: const Icon(Icons.thumb_up_outlined, size: 16),
              label: Text('${answer.isHelpful} helpful'),
              style: TextButton.styleFrom(
                foregroundColor: AppTheme.primaryDark,
              ),
            ),
          ],
        ),
      ),
    ),
  );

  Widget _answerInput() => SizedBox(
    width: double.infinity,
    child: CorrPanel(
      color: AppTheme.surfaceWarm,
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Share your experience',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 8),
          const Text(
            'What helped you? A specific, kind reply goes a long way.',
            style: TextStyle(
              fontSize: 13,
              height: 1.5,
              color: AppTheme.textSecondary,
            ),
          ),
          const SizedBox(height: 16),
          TextField(
            controller: _answer,
            enabled: !_submitting,
            minLines: 3,
            maxLines: 7,
            maxLength: 3000,
            textCapitalization: TextCapitalization.sentences,
            decoration: InputDecoration(
              hintText: 'Share what worked for you...',
              errorText: _answerError,
              errorMaxLines: 4,
              fillColor: AppTheme.surface,
            ),
          ),
          CommunityPrivacyToggle(
            value: _anonymous,
            answering: true,
            onChanged: _submitting
                ? null
                : (value) => setState(() => _anonymous = value),
          ),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            child: FilledButton.icon(
              style: FilledButton.styleFrom(
                backgroundColor: AppTheme.primaryDark,
                padding: const EdgeInsets.symmetric(vertical: 17),
              ),
              onPressed: _submitting ? null : _submitAnswer,
              icon: _submitting
                  ? const SizedBox(
                      width: 18,
                      height: 18,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : const Icon(Icons.send_rounded, size: 17),
              label: Text(_submitting ? 'Posting...' : 'Post reply'),
            ),
          ),
        ],
      ),
    ),
  );
}
