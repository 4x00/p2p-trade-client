import { Trade } from '../types/Trade';

export const getMessage = (trade: Trade, id: string) => (
  trade.chat.find((message) => message.id === id)
);
