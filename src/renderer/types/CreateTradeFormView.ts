import { CreateTradeFormState } from './CreateTradeFormState';

export type CreateTradeFormView = CreateTradeFormState & {
  monero: {
    disableMinMax: boolean;
  };
  other: {
    disableMinMax: boolean;
  };
  disableSubmit: boolean;
};
