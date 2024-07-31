import { OtherCurrency } from './OtherCurrency';

export type JoinTradePopupView = {
  monero: {
    disableInput: boolean;
    amount: string;
  };
  other: {
    disableInput: boolean;
    amount: string;
    currency: OtherCurrency;
  };
  disableSubmit: boolean;
};
