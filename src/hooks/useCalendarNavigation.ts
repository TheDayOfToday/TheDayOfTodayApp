import { useState, useMemo } from 'react';

export const useCalendarNavigation = () => {
  const [selectedDateObj, setSelectedDateObj] = useState(new Date());

  const selectedDate = selectedDateObj.toISOString().split('T')[0];
  const [year, month, day] = selectedDate.split('-');
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const calendarDate = useMemo(() => ({ year, month, day }), [year, month, day]);

  const formattedDate = new Date(selectedDate).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const moveDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDateObj);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDateObj(newDate);
  };

  const selectDate = (dateString: string) => {
    setSelectedDateObj(new Date(dateString));
  };

  return {
    calendarDate,
    year,
    month,
    day,
    formattedDate,
    moveDate,
    selectDate,
  };
};
