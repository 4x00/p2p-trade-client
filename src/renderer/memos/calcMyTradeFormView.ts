import { TradeStatus } from '../types/TradeStatus';
import { Trade } from '../types/Trade';
import { formatCurrency } from '../utils/formatCurrency';
import { CurrencyPriceMap } from '../../utils/fetchCurrencyPrices/types';
import { MyTradeFormView } from '../types/MyTradeFormView';
import { getMyRole } from '../memos/getMyRole';
import { getFixedAmount } from './getFixedAmount';

const NAN_MINMAX = { min: '-', max: '-' };
type CalcMyTradeFormView = (
  (
    trade: Trade,
    currencyPrices: CurrencyPriceMap,
    myOnionHostname: string,
  ) => MyTradeFormView
);
export const calcMyTradeFormView: CalcMyTradeFormView = (
  (trade, currencyPrices, myOnionHostname) => {
    const { details } = trade;
    const currency = details.other.currency;
    const cp = currencyPrices?.[currency];
    const mpp = details.marketPricePercent;
    const calcXmr = (v: number) => formatCurrency(v / cp / (mpp / 100), 'xmr');
    const calcOther = (v: number) => formatCurrency(v * cp * (mpp / 100), currency);
    const formatXmr = (v: number) => formatCurrency(v, 'xmr');
    const formatOther = (v: number) => formatCurrency(v, currency);
    const fixedAmount = getFixedAmount(trade);

    const hasMoneroMinMax = Boolean(details.monero.min && details.monero.max);
    const hasOtherMinMax = Boolean(details.other.min && details.other.max);
    const moneroMinMax = (
      hasMoneroMinMax
        ? { min: formatXmr(details.monero.min), max: formatXmr(details.monero.max )}
        : (cp ? { min: calcXmr(details.other.min), max: calcXmr(details.other.max) } : NAN_MINMAX)
    );
    const otherMinMax = (
      hasOtherMinMax
        ? { min: formatOther(details.other.min), max: formatOther(details.other.max) }
        : (cp ? { min: calcOther(details.monero.min), max: calcOther(details.monero.max) } : NAN_MINMAX)
    );

    return {
      url: `${myOnionHostname}/trades/${details.id}`,
      id: details.id,
      status: TradeStatus.AWAITING_PARTIES,
      myRole: getMyRole(trade),

      title: details.title,
      description: details.description,
      type: details.type,
      monero: fixedAmount ? { amount: formatXmr(fixedAmount.xmr) } : moneroMinMax,
      other: {
        ...(fixedAmount ? { amount: formatOther(fixedAmount.other) } : otherMinMax),
        currency,
      },
      marketPricePercent: `${details.marketPricePercent}`,
      escrowFee: {
        percent: `${details.escrowFee.percent}`,
        flat: `${formatXmr(details.escrowFee.flat)}`,
      }
    };
  }
);
