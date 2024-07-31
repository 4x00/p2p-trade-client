import { JoinTradeResultPopup, JoinTradeResultPopupProps } from './JoinTradeResultPopup';

export const JoinTradeAcceptedPopup = (props: Omit<JoinTradeResultPopupProps, 'resultText'>) => (
  <JoinTradeResultPopup
    { ...props }
    resultText="Join request accepted!"
  />
);
