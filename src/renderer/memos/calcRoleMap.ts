import { Trade } from '../types/Trade';
import { TradeRole } from '../types/TradeRole';
import { getHostname } from './getHostname';

type CalcRoleMap = (trade: Trade, myOnionHostname: string) => { [role in TradeRole]: string | undefined; };
export const calcRoleMap: CalcRoleMap = (trade, myOnionHostname) => ({
  [TradeRole.ESCROW]: getHostname(trade, TradeRole.ESCROW, myOnionHostname),
  [TradeRole.XMR_SELLER]: getHostname(trade, TradeRole.XMR_SELLER, myOnionHostname),
  [TradeRole.XMR_BUYER]: getHostname(trade, TradeRole.XMR_BUYER, myOnionHostname),
});
