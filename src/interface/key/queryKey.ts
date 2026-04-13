export const calendarKeys = {
  all: ['calendar'] as const,
  colors: () => [...calendarKeys.all, 'colors'] as const,
  diary: (year: string, month: string, day: string) =>
    [...calendarKeys.all, 'diary', { year, month, day }] as const,
  analysis: (year: string, month: string, day: string) =>
    [...calendarKeys.all, 'analysis', { year, month, day }] as const,
};

export const diaryKeys = {
  all: ['diary'] as const,
  today: () => [...diaryKeys.all, 'today'] as const,
  moodMeters: (diaryId: number) => [...diaryKeys.all, 'moodMeters', diaryId] as const,
};

export const weeklyKeys = {
  all: ['weekly'] as const,
  analysis: (year: string, month: string, day: string) =>
    [...weeklyKeys.all, 'analysis', year, month, day] as const,
};

export const bookKeys = {
  all: ['book'] as const,
  recommended: () => [...bookKeys.all, 'recommended'] as const,
};
