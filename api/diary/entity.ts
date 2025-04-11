import type { APIResponse } from '../APIResponse';

export type Mood = {
  moodName: string;
  color: string;
};

export type MoodMeter = {
  degree: string;
  moods: Mood[];
};

export type MoodMetersResponse = MoodMeter[];
