// useCalendarColors.ts
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCalendarColor } from '@/api/diary';

const resolveDotColor = (raw: string) => {
  if (raw === '미분석') return '#E8E8E8';
  return raw;
};

export const useCalendarColors = () => {
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchAllMoodColors = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) return;

      try {
        const thisYear = new Date().getFullYear();
        const monthRequests = [];

        for (let m = 1; m <= 12; m++) {
          const monthStr = m.toString().padStart(2, '0');
          monthRequests.push({
            monthStr,
            request: getCalendarColor(token, {
              year: thisYear.toString(),
              month: monthStr,
              day: '01',
            })
          });
        }

        const earlyMonths = monthRequests.slice(0, 2);
        const earlyResults = await Promise.all(earlyMonths.map((m) => m.request));
        const earlyColors: { [key: string]: string } = {};
        earlyResults.forEach((res) => Object.assign(earlyColors, res?.colors ?? {}));

        setMarkedDates(() => {
          const updated: { [key: string]: any } = {};
          Object.entries(earlyColors).forEach(([date, color]) => {
            updated[date] = {
              marked: true,
              dotColor: resolveDotColor(color),
            };
          });
          return updated;
        });
        setReady(true);

        const lateMonths = monthRequests.slice(2);
        Promise.all(lateMonths.map((m) => m.request)).then((lateResults) => {
          setMarkedDates((prev) => {
            const updated = { ...prev };
            lateResults.forEach((res) => {
              Object.entries(res?.colors ?? {}).forEach(([date, color]) => {
                updated[date] = {
                  marked: true,
                  dotColor: resolveDotColor(color),
                };
              });
            });
            return updated;
          });
        });
      } catch (err) {
        console.error('감정 색상 불러오기 실패:', err);
      }
    };

    fetchAllMoodColors();
  }, []);

  return { markedDates, moodColorsReady: ready };
};