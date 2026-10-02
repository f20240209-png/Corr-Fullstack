import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/community_widgets.dart';
import '../widgets/routine_step_card.dart';

class AskQuestionScreen extends StatefulWidget {
  const AskQuestionScreen({super.key});
  @override
  State<AskQuestionScreen> createState() => _AskQuestionScreenState();
}

class _AskQuestionScreenState extends State<AskQuestionScreen> {
  final _form = GlobalKey<FormState>();
  final _question = TextEditingController();
  final _details = TextEditingController();
  String _category = 'Acne';
  String? _skinType, _error;
  bool _anonymous = true, _submitting = false;
  static const _skinTypes = [
    'Oily',
    'Dry',
    'Combination',
    'Sensitive',
    'Normal',
  ];

  @override
  void dispose() {
    _question.dispose();
    _details.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (_submitting || !_form.currentState!.validate()) return;
    setState(() {
      _submitting = true;
      _error = null;
    });
    try {
      final token =
          context.read<AuthProvider>().token ??
          (throw const ApiException('Please sign in again.'));
      final data = await ApiService.createPost(
        token,
        question: _question.text.trim(),
        details: _details.text.trim().isEmpty ? null : _details.text.trim(),
        category: _category.toLowerCase(),
        skinType: _skinType?.toLowerCase(),
        isAnonymous: _anonymous,
      );
      if (data['post'] == null)
        throw const ApiException('Could not post your question. Please retry.');
      if (!mounted) return;
      setState(() => _submitting = false);
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Your question is posted.')));
      Navigator.pop(context, true);
    } catch (e) {
      if (mounted) setState(() => _error = e.toString());
    } finally {
      if (mounted && _submitting) setState(() => _submitting = false);
    }
  }

  @override
  Widget build(BuildContext context) => PopScope(
    canPop: !_submitting,
    child: Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        backgroundColor: AppTheme.background,
        title: const Text('Ask the community'),
      ),
      body: SafeArea(
        top: false,
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(18, 12, 18, 32),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 760),
              child: Form(
                key: _form,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const CorrPill(
                      label: 'A SPACE TO ASK',
                      icon: Icons.forum_outlined,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Every routine starts\nwith a question.',
                      style: GoogleFonts.playfairDisplay(
                        fontSize: 29,
                        height: 1.2,
                      ),
                    ),
                    const SizedBox(height: 10),
                    const Text(
                      'Tell the community what you are curious about. A little context helps others share useful experiences.',
                      style: TextStyle(
                        color: AppTheme.textSecondary,
                        fontSize: 13,
                        height: 1.6,
                      ),
                    ),
                    const SizedBox(height: 22),
                    CorrPanel(
                      padding: const EdgeInsets.all(20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _label('Your question'),
                          const SizedBox(height: 10),
                          TextFormField(
                            controller: _question,
                            enabled: !_submitting,
                            minLines: 2,
                            maxLines: 4,
                            maxLength: 300,
                            textCapitalization: TextCapitalization.sentences,
                            decoration: const InputDecoration(
                              hintText:
                                  'Why does my skin feel dry after cleansing?',
                            ),
                            validator: (value) =>
                                (value?.trim().length ?? 0) < 10
                                ? 'Write at least 10 characters.'
                                : null,
                          ),
                          const SizedBox(height: 14),
                          _label('A little more context (optional)'),
                          const SizedBox(height: 10),
                          TextFormField(
                            controller: _details,
                            enabled: !_submitting,
                            minLines: 3,
                            maxLines: 6,
                            maxLength: 2000,
                            textCapitalization: TextCapitalization.sentences,
                            decoration: const InputDecoration(
                              hintText:
                                  'Your routine, products you tried, or how long this has been happening...',
                            ),
                          ),
                          const SizedBox(height: 16),
                          _label('Choose a topic'),
                          const SizedBox(height: 10),
                          _choices(
                            communityCategories,
                            _category,
                            (value) => setState(() => _category = value),
                          ),
                          const SizedBox(height: 22),
                          _label('Skin type (optional)'),
                          const SizedBox(height: 6),
                          const Text(
                            'Add context for people with similar skin.',
                            style: TextStyle(
                              fontSize: 12,
                              color: AppTheme.textSecondary,
                            ),
                          ),
                          const SizedBox(height: 10),
                          _choices(
                            _skinTypes,
                            _skinType,
                            (value) => setState(
                              () =>
                                  _skinType = _skinType == value ? null : value,
                            ),
                          ),
                          const SizedBox(height: 18),
                          const Divider(),
                          CommunityPrivacyToggle(
                            value: _anonymous,
                            onChanged: _submitting
                                ? null
                                : (value) => setState(() => _anonymous = value),
                          ),
                          if (_error != null) ...[
                            const SizedBox(height: 12),
                            Text(
                              _error!,
                              style: const TextStyle(color: AppTheme.error),
                            ),
                          ],
                          const SizedBox(height: 18),
                          SizedBox(
                            width: double.infinity,
                            child: FilledButton.icon(
                              style: FilledButton.styleFrom(
                                backgroundColor: AppTheme.primaryDark,
                                padding: const EdgeInsets.symmetric(
                                  vertical: 18,
                                ),
                              ),
                              onPressed: _submitting ? null : _submit,
                              icon: _submitting
                                  ? const SizedBox(
                                      width: 18,
                                      height: 18,
                                      child: CircularProgressIndicator(
                                        strokeWidth: 2,
                                        color: Colors.white,
                                      ),
                                    )
                                  : const Icon(
                                      Icons.arrow_upward_rounded,
                                      size: 18,
                                    ),
                              label: Text(
                                _submitting ? 'Posting...' : 'Post question',
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );

  Widget _label(String text) => Text(
    text,
    style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
  );
  Widget _choices(
    List<String> values,
    String? selected,
    ValueChanged<String> onSelect,
  ) => Wrap(
    spacing: 8,
    runSpacing: 8,
    children: values
        .map(
          (value) => ChoiceChip(
            label: Text(value),
            selected: value == selected,
            showCheckmark: false,
            selectedColor: AppTheme.primaryDark,
            backgroundColor: AppTheme.surfaceWarm,
            side: BorderSide(
              color: value == selected ? AppTheme.primaryDark : AppTheme.border,
            ),
            labelStyle: TextStyle(
              fontSize: 12,
              color: value == selected ? Colors.white : AppTheme.textSecondary,
            ),
            onSelected: _submitting ? null : (_) => onSelect(value),
          ),
        )
        .toList(),
  );
}
