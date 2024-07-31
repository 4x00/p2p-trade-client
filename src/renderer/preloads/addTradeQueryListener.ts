export {};

declare global {
  const addTradeQueryListener: (jsCb: (tradeId: string) => unknown) => void;
}
