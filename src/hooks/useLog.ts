import { useThrottle } from '@uidotdev/usehooks';
import { useEffect } from 'react';

export const useLog = (ns: string, value: unknown): void => {
  const throttled = useThrottle(value, 150);

  useEffect(() => {
    console.log(ns, throttled);
  }, [ns, throttled]);
};
