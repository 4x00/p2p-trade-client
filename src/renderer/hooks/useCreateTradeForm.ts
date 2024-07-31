import { useReducer } from 'react';
import { CreateTradeFormState } from '../types/CreateTradeFormState';
import { CreateTradeFormStateDelta } from '../types/CreateTradeFormStateDelta';
import { TradeType } from '../types/TradeType';

const DEFAULT_CURRENCY = 'eur';
const initialCreateTradeForm: Readonly<CreateTradeFormState> = {
  title: '',
  description: '',
  type: TradeType.SELL_XMR,
  monero: {
    min: '',
    max: '',
  },
  marketPricePercent: '100',
  other: {
    min: '',
    max: '',
    currency: DEFAULT_CURRENCY,
  },
  escrowFee: {
    percent: '0',
    flat: '0',
  },
};

type CreateTradeReducer = (
  (state: CreateTradeFormState, stateDelta: CreateTradeFormStateDelta) => CreateTradeFormState
);
const createTradeReducer: CreateTradeReducer = (state, stateDelta) => ({
  ...state,
  ...stateDelta,
  monero: {
    ...state.monero,
    ...stateDelta.monero,
  },
  other: {
    ...state.other,
    ...stateDelta.other,
  },
  escrowFee: {
    ...state.escrowFee,
    ...stateDelta.escrowFee,
  },
});

export const useCreateTradeForm = () => {
  const [state, dispatch] = useReducer(createTradeReducer, initialCreateTradeForm);
  return { state, dispatch };
};
