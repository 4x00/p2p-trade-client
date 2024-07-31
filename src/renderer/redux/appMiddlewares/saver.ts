import { Middleware } from '@reduxjs/toolkit';
import { AppState } from '../../types/AppState';
import * as storage from '../../utils/storage';

export const saver: Middleware<object, AppState> = (store) => (next) => (action) => {
  const result = next(action);
  storage.save(store.getState());
  return result;
};
