import { useEffect, useState } from 'react';
import { createCancelablePromise } from '../utils/createCancelablePromise';
import { useRefresher } from './useRefresher';
import * as offlineStatuses from '../utils/offlineStatusCache';
import { sendDebouncedRUOK } from '../utils/sendDebouncedRUOK';

type UseOnionOfflineStatus = (hostname: string) => boolean | undefined;
export const useOnionOfflineStatus: UseOnionOfflineStatus = (hostname) => {
  const [offline, setOffline] = useState<boolean | undefined>(offlineStatuses.get(hostname));
  const refreshPoint = useRefresher();
  useEffect(() => {
    const [res, cancel] = createCancelablePromise(
      () => sendDebouncedRUOK(hostname)
    );

    res
      .then((r) => {
        const status = r !== 'imok';
        offlineStatuses.set(hostname, status);
        setOffline(status);
      })
      .catch((e) => {
        if (e.code !== DOMException.ABORT_ERR) {
          throw e;
        }
      });

    return () => { cancel(); };
  }, [hostname, refreshPoint]);

  return offline;
};
