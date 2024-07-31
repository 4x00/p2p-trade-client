import { TradeStatus } from '../types/TradeStatus';
import { Trade } from '../types/Trade';
import { formatCurrency } from '../utils/formatCurrency';
import { MyTradeRowView } from '../types/MyTradeRowView';
import { CurrencyPriceMap } from '../../utils/fetchCurrencyPrices/types';
import { getMyRole } from '../memos/getMyRole';
import { getFixedAmount } from './getFixedAmount';

type CalcMyTradeRowView = (trade: Trade, currencyPrices?: CurrencyPriceMap) => MyTradeRowView;
export const calcMyTradeRowView: CalcMyTradeRowView = (
  (trade, currencyPrices) => {
    const { details } = trade;
    const currency = details.other.currency;
    const cp = currencyPrices?.[currency];
    const mpp = details.marketPricePercent;

    const calcXmr = (v: number) => formatCurrency(v / cp / (mpp / 100), 'xmr');
    const calcOther = (v: number) => formatCurrency(v * cp * (mpp / 100), currency);
    const formatXmr = (v: number) => formatCurrency(v, 'xmr');
    const formatOther = (v: number) => formatCurrency(v, currency);

    const hasMoneroMinMax = Boolean(details.monero.min && details.monero.max);
    const hasOtherMinMax = Boolean(details.other.min && details.other.max);
    const xmrAmountInterval = (
      hasMoneroMinMax
        ? `${formatXmr(details.monero.min)} - ${formatXmr(details.monero.max)}`
        : (cp ? `${calcXmr(details.other.min)} - ${calcXmr(details.other.max)}` : '-')
    );
    const otherAmountInterval = (
      hasOtherMinMax
        ? `${formatOther(details.other.min)} - ${formatOther(details.other.max)}`
        : (cp ? `${calcOther(details.monero.min)} - ${calcOther(details.monero.max)}` : '-')
    );
    const fixedAmount = getFixedAmount(trade);

    return {
      id: details.id,
      myRole: getMyRole(trade),
      title: details.title,
      status: TradeStatus.AWAITING_PARTIES,
      xmrAmount: fixedAmount ? formatXmr(fixedAmount.xmr) : xmrAmountInterval,
      otherAmount: fixedAmount ? formatOther(fixedAmount.other) : otherAmountInterval,
      otherCurrency: currency,
      createdAt: details.createdAt,
    };
  }
);
