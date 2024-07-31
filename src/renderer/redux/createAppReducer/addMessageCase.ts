import { AddMyMessageAction, AddOthersMessageAction } from '../../types/AppAction';
import { AppState } from '../../types/AppState';

export const addMessageCase = (state: AppState, action: AddMyMessageAction | AddOthersMessageAction) => {
  const trade = state
    .myTrades
    .find((trade) => trade.details.id === action.payload.tradeId);

  if (trade) {
    trade.chat.push(action.payload.message);
  } else {
    console.warn('createAppReducer: no trade');
  }
};
