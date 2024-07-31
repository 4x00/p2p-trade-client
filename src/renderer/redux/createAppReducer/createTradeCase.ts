import { CreateTradeAction } from '../../types/AppAction';
import { AppState } from '../../types/AppState';

export const createTradeCase = (state: AppState, action: CreateTradeAction) => {
  state.myTrades.push({
    details: action.payload,
    chat: [],
  });
};
