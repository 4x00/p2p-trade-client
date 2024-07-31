type Statuses = { [hostname: string]: boolean };
const KEY = 'offlineStatuses';

const load = (): Statuses => {
  const item = sessionStorage.getItem(KEY);
  return item ? JSON.parse(item) : {};
};
const save = (statuses: Statuses) => {
  sessionStorage.setItem(KEY, JSON.stringify(statuses));
};

export const set = (hostname: string, offline: boolean) => {
  const statuses = load();
  statuses[hostname] = offline;
  save(statuses);
};
export const get = (hostname: string) => {
  return load()[hostname];
};
