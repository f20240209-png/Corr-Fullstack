DateTime journalDay(DateTime date) => DateTime(date.year, date.month, date.day);
String journalDateKey(DateTime date) =>
    '${date.year.toString().padLeft(4, '0')}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
String journalMonthKey(DateTime date) => journalDateKey(date).substring(0, 7);
bool validJournalDay(DateTime date) =>
    !journalDay(date).isBefore(DateTime(1900)) &&
    !journalDay(date).isAfter(DateTime(2100, 12, 31));
DateTime nextJournalDay(DateTime date, int offset) =>
    DateTime(date.year, date.month, date.day + offset);
const journalMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
String journalDateLabel(DateTime date) =>
    '${date.day} ${journalMonths[date.month - 1]} ${date.year}';
