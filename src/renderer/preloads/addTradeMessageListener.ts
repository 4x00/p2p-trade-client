import { PreparedMessage } from '../../types/PreparedMessage';

declare global {
  const addTradeMessageListener: (jsCb: (tradeId: string, message: PreparedMessage) => unknown) => void;
}
