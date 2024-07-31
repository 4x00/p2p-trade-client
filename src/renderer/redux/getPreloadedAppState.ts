import { AppState } from '../types/AppState';
import * as storage from '../utils/storage';

export const getPreloadedAppState = (myOnionHostname: string): AppState => ({
  myTrades: [],
  myOnionHostname,
  ...storage.load(),
});
