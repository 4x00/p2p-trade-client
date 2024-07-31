import { useEffect, useState } from 'react';
import { REFRESH_DURATION } from '../utils/sendDebouncedRUOK';

export const useRefresher = () => {
  const [refreshPoint, setRefreshPoint] = useState(Date.now());

  useEffect(() => {
    const timeoutId = setInterval(
      () => {
        setRefreshPoint(Date.now());
      },
      REFRESH_DURATION
    );

    return () => { clearTimeout(timeoutId); };
  }, []);

  return refreshPoint;
};
