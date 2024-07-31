import { TradeRole } from '../types/TradeRole';

const MAP = {
  [TradeRole.ESCROW]: 'Escrow',
  [TradeRole.XMR_BUYER]: 'XMR Buyer',
  [TradeRole.XMR_SELLER]: 'XMR Seller',
};
export const getTradeRoleText = (role: TradeRole) => MAP[role];
