import { useMyTrades } from './useMyTrades';

export const useMyTrade = (id: string) => {
  const myTrades = useMyTrades();
  return myTrades.find((trade) => trade.details.id === id);
};
