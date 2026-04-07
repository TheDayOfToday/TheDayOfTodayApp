export const QUERY_KEY = {
  CALENDAR: {
    COLORS: () => ['calendarColors'] as const,
    DIARY: (year: string, month: string, day: string) => ['diary', { year, month, day }] as const,
    ANALYSIS: (year: string, month: string, day: string) => ['analysis', { year, month, day }] as const,
  },
  DIARY: {
    TODAY: () => ['todayDiary'] as const,
    MOOD_METERS: (diaryId: number) => ['moodMeters', diaryId] as const,
  },
  WEEKLY: {
    ANALYSIS: (year: string, month: string, day: string) => ['weeklyAnalysis', year, month, day] as const,
  },
  BOOK: {
    RECOMMENDED: () => ['recommendedBook'] as const,
  },
} as const;
