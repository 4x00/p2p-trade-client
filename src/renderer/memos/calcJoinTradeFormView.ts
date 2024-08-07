import { formatCurrency } from '../utils/formatCurrency';
import { JoinTradeFormView } from '../types/JoinTradeFormView';
import { JoinTradeDetails } from '../types/JoinTradeDetails';

type CalcJoinTradeFormView = (trade: JoinTradeDetails) => JoinTradeFormView;
export const calcJoinTradeFormView: CalcJoinTradeFormView = (
  (joinDetails) => {
    const currency = joinDetails.other.currency;
    const formatXmr = (v: number) => formatCurrency(v, 'xmr');
    const formatOther = (v: number) => formatCurrency(v, currency);

    return {
      title: joinDetails.title,
      description: joinDetails.description,
      type: joinDetails.type,
      monero: {
        min: formatXmr(joinDetails.monero.min),
        max: formatXmr(joinDetails.monero.max),
      },
      marketPricePercent: `${joinDetails.marketPricePercent}`,
      other: {
        min: formatOther(joinDetails.other.min),
        max: formatOther(joinDetails.other.max),
        currency,
      },
      escrowFee: {
        percent: `${joinDetails.escrowFee.percent}`,
        flat: `${formatXmr(joinDetails.escrowFee.flat)}`,
      },
      availableRoles: joinDetails.availableRoles,
    };
  }
);
