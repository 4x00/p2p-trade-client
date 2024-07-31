import { createSynced } from '../utils/createSynced';

export const REFRESH_DURATION = 1000 * 5 * 60;
export const fetchSyncedCurrencyPrices = createSynced(fetchCurrencyPrices, REFRESH_DURATION);
