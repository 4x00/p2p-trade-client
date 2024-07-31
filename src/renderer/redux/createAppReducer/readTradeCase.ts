import { ReadTradeAction } from '../../types/AppAction';
import { AppState } from '../../types/AppState';
import { MyReadableMessage } from '../../types/TradeMessage';

export const readTradeCase = (state: AppState, action: ReadTradeAction) => {
  const trade = state
    .myTrades
    .find((trade) => trade.details.id === action.payload.tradeId);

  if (trade) {
    for (const message of trade.chat) {
      if ((message as MyReadableMessage).read === false) {
        (message as MyReadableMessage).read = true;
      }
    }
  } else {
    console.warn('createAppReducer: no trade');
  }
};
