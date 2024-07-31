import { CurrencyPriceMap } from '../../utils/fetchCurrencyPrices/types';
import { JoinTradeDetails } from '../types/JoinTradeDetails';
import { Trade } from '../types/Trade';
import { formatCurrency } from '../utils/formatCurrency';
import { calcAvailableRoles } from './calcAvailableRoles';
const N = Number;

type CalcJoinTradeDetails = (trade: Trade, currencyPrices: CurrencyPriceMap) => JoinTradeDetails;
export const calcJoinTradeDetails: CalcJoinTradeDetails = (trade, currencyPrices) => {
  const { details } = trade;
  const currency = details.other.currency;
  const cp = currencyPrices[currency];
  const hasMoneroMinMax = Boolean(details.monero.min && details.monero.max);
  const hasOtherMinMax = Boolean(details.other.min && details.other.max);
  const mpp = details.marketPricePercent;
  const calcXmr = (v: number) => formatCurrency(v / cp / (mpp / 100), 'xmr');
  const calcOther = (v: number) => formatCurrency(v * cp * (mpp / 100), currency);

  return {
    id: details.id,
    title: details.title,
    description: details.description,
    type: details.type,
    monero: (
      hasMoneroMinMax
        ? { min: details.monero.min, max: details.monero.max }
        : { min: N(calcXmr(details.other.min)), max: N(calcXmr(details.other.max)) }
    ),
    marketPricePercent: details.marketPricePercent,
    other: {
      ...(
        hasOtherMinMax
          ? { min: details.other.min, max: details.other.max }
          : { min: N(calcOther(details.monero.min)), max: N(calcOther(details.monero.max)) }
      ),
      currency,
    },
    escrowFee: details.escrowFee,
    createdAt: details.createdAt,
    availableRoles: calcAvailableRoles(trade),
  };
};
