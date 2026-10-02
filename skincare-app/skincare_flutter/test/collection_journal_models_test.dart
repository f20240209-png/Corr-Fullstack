import 'package:flutter_test/flutter_test.dart';
import 'package:skincare_flutter/models/collection_progress.dart';
import 'package:skincare_flutter/models/journal_dates.dart';

void main() {
  test(
    'milestones use current distinct counts, threshold boundaries and completed collections',
    () {
      expect(CollectionProgress(0).earned, isEmpty);
      expect(CollectionProgress(0).next!.target, 1);
      expect(CollectionProgress(1).earned.length, 1);
      expect(CollectionProgress(4).next!.target, 5);
      expect(CollectionProgress(5).earned.length, 2);
      expect(CollectionProgress(9).next!.target, 10);
      expect(CollectionProgress(10).earned.length, 3);
      expect(CollectionProgress(24).next!.target, 25);
      expect(CollectionProgress(25).next, isNull);
      expect(CollectionProgress(500).fraction, 1);
      expect(CollectionProgress(-1).count, 0);
      // Removing a card can change the current milestone without a separate score counter.
      expect(CollectionProgress(4).earned.length, 1);
    },
  );
  test(
    'journal navigation uses calendar days across leap years and month/year boundaries',
    () {
      expect(
        journalDateKey(nextJournalDay(DateTime(2028, 2, 28), 1)),
        '2028-02-29',
      );
      expect(
        journalDateKey(nextJournalDay(DateTime(2028, 2, 29), 1)),
        '2028-03-01',
      );
      expect(
        journalDateKey(nextJournalDay(DateTime(2026, 12, 31), 1)),
        '2027-01-01',
      );
      expect(
        journalDateKey(nextJournalDay(DateTime(2026, 1, 1), -1)),
        '2025-12-31',
      );
      expect(journalMonthKey(DateTime(2026, 10, 2)), '2026-10');
      expect(validJournalDay(DateTime(1900)), isTrue);
      expect(validJournalDay(DateTime(2100, 12, 31)), isTrue);
      expect(validJournalDay(DateTime(2101)), isFalse);
    },
  );
}
