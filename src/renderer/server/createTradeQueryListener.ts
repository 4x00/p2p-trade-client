import { calcAvailableRoles } from '../memos/calcAvailableRoles';
import { calcJoinTradeDetails } from '../memos/calcJoinTradeDetails';
import { getIsTradeCreatedByMe } from '../memos/getIsTradeCreatedByMe';
import { selectMyTrades } from '../redux/appSelectors';
import { AppStore } from '../types/AppStore';
import { JoinTradeDetails } from '../types/JoinTradeDetails';
import { fetchSyncedCurrencyPrices } from '../utils/fetchSyncedCurrencyPrices';

type CreateTradeQueryListener = (
  (store: AppStore) =>
  (tradeId: string) =>
  Promise<JoinTradeDetails>
);
export const createTradeQueryListener: CreateTradeQueryListener = (
  (store) =>
  async (tradeId) =>
  {
    const state = store.getState();
    const myTrades = selectMyTrades(state);
    const myTrade = myTrades.find((trade) => trade.details.id === tradeId);

    if (!myTrade) { return null; }
    if (!getIsTradeCreatedByMe(myTrade)) { return null; }
    if (calcAvailableRoles(myTrade).length === 0) { return null; }

    const currencyPrices = await fetchSyncedCurrencyPrices();
    return calcJoinTradeDetails(myTrade, currencyPrices);
  }
);
