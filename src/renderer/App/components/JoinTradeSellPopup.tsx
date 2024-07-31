import { JoinTradeBuySellPopup, JoinTradeBuySellPopupProps } from './JoinTradeBuySellPopup';

export const JoinTradeSellPopup = (props: Omit<JoinTradeBuySellPopupProps, 'joinButtonText'>) => (
  <JoinTradeBuySellPopup
    { ...props }
    joinButtonText="Request to join as XMR Seller"
  />
);
