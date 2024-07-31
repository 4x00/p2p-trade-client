import { TradeStatus } from '../types/TradeStatus';

const MAP = {
  [TradeStatus.AWAITING_PARTIES]: 'Awaiting parties',
  [TradeStatus.AWAITING_XMR_SELLER_DEPOSIT]: 'Awaiting XMR seller deposit',
  [TradeStatus.AWAITING_XMR_BUYER_PAYMENT]: 'Awaiting XMR buyer payment',
  [TradeStatus.AWAITING_SPEND_CONSENSUS]: 'Awaiting spend consensus',
  [TradeStatus.FINALISED]: 'Finalised',
  [TradeStatus.CANCELLED]: 'Cancelled',
};
export const getTradeStatusText = (status: TradeStatus) => MAP[status];
