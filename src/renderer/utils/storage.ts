import { AppState } from '../types/AppState';

const KEY = 'state';

export const save = (state: Partial<AppState>) => (
  localStorage.setItem(KEY, JSON.stringify(state))
);
export const load = () => (
  JSON.parse(localStorage.getItem(KEY))
);
