import { JoinTradeBuySellPopup, JoinTradeBuySellPopupProps } from './JoinTradeBuySellPopup';

export const JoinTradeBuyPopup = (props: Omit<JoinTradeBuySellPopupProps, 'joinButtonText'>) => (
  <JoinTradeBuySellPopup
    { ...props }
    joinButtonText="Request to join as XMR Buyer"
  />
);
