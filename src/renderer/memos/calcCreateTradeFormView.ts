import { CurrencyPriceMap } from '../../utils/fetchCurrencyPrices/types';
import { formatCurrency } from '../utils/formatCurrency';
import { CreateTradeFormState } from '../types/CreateTradeFormState';
import { CreateTradeFormView } from '../types/CreateTradeFormView';

const N = Number;
const isN = (s: string) => s !== '' && !isNaN(s as unknown as number);

type CalcCreateTradeFormView = (
  (state: CreateTradeFormState, currencyPrices?: CurrencyPriceMap) => CreateTradeFormView
);
export const calcCreateTradeFormView: CalcCreateTradeFormView = (state, currencyPrices) => {
  const disableMoneroMinMax = Boolean(state.other.min || state.other.max);
  const disableOtherMinMax = Boolean(state.monero.min || state.monero.max);
  const disableSubmit = !(
    state.title &&
    state.description &&
    (
      (
        isN(state.monero.min) &&
        isN(state.monero.max) &&
        N(state.monero.min) <= N(state.monero.max) &&
        N(state.monero.min) >= 0
      ) ||
      (
        isN(state.other.min) &&
        isN(state.other.max) &&
        N(state.other.min) <= N(state.other.max) &&
        N(state.other.min) >= 0
      )
    ) &&
    isN(state.marketPricePercent) &&
    isN(state.escrowFee.percent) &&
    isN(state.escrowFee.flat)
  );
  const currency = state.other.currency;
  const cp = currencyPrices?.[currency];
  const mpp = state.marketPricePercent;
  const calcXmr = (v: string) => formatCurrency(N(v) / cp / (N(mpp) / 100), 'xmr');
  const calcOther = (v: string) => formatCurrency(N(v) * cp * (N(mpp) / 100), currency);
  const canCalc = cp && isN(mpp);

  const viewMoneroMin = (
    disableMoneroMinMax
      ? (
        canCalc && isN(state.other.min)
          ? calcXmr(state.other.min)
          : '-'
      )
      : state.monero.min
  );
  const viewMoneroMax = (
    disableMoneroMinMax
      ? (
        canCalc && isN(state.other.max)
          ? calcXmr(state.other.max)
          : '-'
      )
      : state.monero.max
  );
  const viewOtherMin = (
    disableOtherMinMax
      ? (
        canCalc && isN(state.monero.min)
          ? calcOther(state.monero.min)
          : '-'
      )
      : state.other.min
  );
  const viewOtherMax = (
    disableOtherMinMax
      ? (
        canCalc && isN(state.monero.max)
          ? calcOther(state.monero.max)
          : '-'
      )
      : state.other.max
  );

  return {
    title: state.title,
    description: state.description,
    type: state.type,
    monero: {
      min: viewMoneroMin,
      max: viewMoneroMax,
      disableMinMax: disableMoneroMinMax,
    },
    marketPricePercent: state.marketPricePercent,
    other: {
      min: viewOtherMin,
      max: viewOtherMax,
      currency: state.other.currency,
      disableMinMax: disableOtherMinMax,
    },
    escrowFee: {
      percent: state.escrowFee.percent,
      flat: state.escrowFee.flat,
    },
    disableSubmit,
  };
};
