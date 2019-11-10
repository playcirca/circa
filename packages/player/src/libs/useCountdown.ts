import {
  differenceInDays,
  differenceInHours,
  differenceInSeconds,
  differenceInMinutes,
} from 'date-fns';
import { useState, useEffect } from 'react';

export const useCountdown = (targetDate: Date) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const days = differenceInDays(targetDate, now);
  const hours = differenceInHours(targetDate, now) - days * 24;
  const minutes =
    differenceInMinutes(targetDate, now) - days * 24 * 60 - hours * 60;
  const seconds =
    differenceInSeconds(targetDate, now) -
    days * 24 * 60 * 60 -
    hours * 60 * 60 -
    minutes * 60;

  return { days, hours, minutes, seconds };
};
