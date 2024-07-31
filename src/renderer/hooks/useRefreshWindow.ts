import { useEffect, useState } from 'react';
import { REFRESH_DURATION } from '../utils/fetchSyncedCurrencyPrices';

export const useRefreshWindow = () => {
  const now = Date.now();
  const [window, setWindow] = useState(now - now % REFRESH_DURATION);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    const startTimeout = () => {
      timeoutId = createTimeout();
    };
    const createTimeout = () => {
      const now = Date.now();

      return setTimeout(
        () => {
          setWindow(now - now % REFRESH_DURATION);
          startTimeout();
        },
        REFRESH_DURATION - now % REFRESH_DURATION
      );
    };
    startTimeout();

    return () => { clearTimeout(timeoutId); };
  }, []);

  return window;
};
