type Wallets = { [id: string]: unknown };
const KEY = 'wallets';

const load = (): Wallets => {
  const item = localStorage.getItem(KEY);
  return item ? JSON.parse(item) : {};
};
const save = (wallets: Wallets) => {
  localStorage.setItem(KEY, JSON.stringify(wallets));
};

export const set = (id: string, wallet: unknown) => {
  const wallets = load();
  wallets[id] = wallet;
  save(wallets);
};
export const get = (id: string) => {
  return load()[id];
};
