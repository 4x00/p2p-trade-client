import { JoinTradeResultPopup, JoinTradeResultPopupProps } from './JoinTradeResultPopup';

export const JoinTradeRefusedPopup = (props: Omit<JoinTradeResultPopupProps, 'resultText'>) => (
  <JoinTradeResultPopup
    { ...props }
    resultText="Join request refused!"
  />
);
