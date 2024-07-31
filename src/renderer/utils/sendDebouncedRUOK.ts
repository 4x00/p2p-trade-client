import { createDebouncedWithKey } from './createDebouncedWithKey';

export const REFRESH_DURATION = 1000 * 15;
export const sendDebouncedRUOK = createDebouncedWithKey(
  (hostname) => sendQuery(`${hostname}/ruok`),
  REFRESH_DURATION
);
