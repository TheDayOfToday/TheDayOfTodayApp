import { useEffect, useState } from 'react';

type Mood = {
  moodName: string;
  color: string;
};

type MoodMeter = {
  degree: string;
  moods: Mood[];
};

function useMoodMeters() {
  const [data, setData] = useState<MoodMeter[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMoodMeters = async () => {
      try {
        const response = await fetch('/sentimental/moodmeters', {
          method: 'GET',
          headers: {
            Accept: '*/*',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: MoodMeter[] = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodMeters();
  }, []);

  return { data, loading, error };
}

export default useMoodMeters;
