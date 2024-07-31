import { AppState } from '../types/AppState';

export const selectMyTrades = (state: AppState) => state.myTrades;
export const selectMyOnionHostname = (state: AppState) => state.myOnionHostname;
