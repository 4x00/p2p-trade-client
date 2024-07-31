import { useEffect, useState } from 'react';
import { JoinTradeDetails } from '../types/JoinTradeDetails';
import { useRefreshWindow } from './useRefreshWindow';
import { createCancelablePromise } from '../utils/createCancelablePromise';

type SendQueryResult = JoinTradeDetails | string | null;
type UseTradeQuerierResult = SendQueryResult | null | undefined;
/*
  undefined is uninitialised
  null is every sort of error
  string is message
  else is trade details
*/

export const useTradeQuerier = () => {
  const [url, setUrl] = useState('');
  const [moment, setMoment] = useState(Date.now());
  const query = (value: string) => {
    setUrl(value);
    setMoment(Date.now());
  };

  const [loading, setLoading] = useState<boolean>();
  const [result, setResult] = useState<UseTradeQuerierResult>();
  const window = useRefreshWindow();
  useEffect(() => {
    setLoading(false);
    setResult(undefined);

    if (!url) { return; }

    setLoading(true);
    const [res, cancel] = createCancelablePromise(() => sendQuery(url));
    res
      .then((r: SendQueryResult) => {
        setLoading(false);
        setResult(r);
      })
      .catch((e) => {
        if (e.code !== DOMException.ABORT_ERR) {
          throw e;
        }
      });

    return () => { cancel(); };
  }, [url, moment, window]);

  return { query, loading, result, url };
};
