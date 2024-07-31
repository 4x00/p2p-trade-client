import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUnreadMessages } from '../memos/getUnreadMessages';
import * as appActions from '../redux/appActions';
import { useMyTrade } from './useMyTrade';

const useFocus = () => {
  const [foc, setFoc] = useState(true);
  useEffect(() => {
    const onBlur = () => {
      setFoc(false);
    };
    const onFocus = () => {
      setFoc(true);
    };
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  });

  return foc;
};

export const useTradeReader = (tradeId: string) => {
  const dispatch = useDispatch();
  const trade = useMyTrade(tradeId);
  const foc = useFocus();
  useEffect(() => {
    if (!foc) { return; }
    if (!trade) { return; }

    const unreadMessages = getUnreadMessages(trade);
    if (unreadMessages.length) {
      dispatch(
        appActions.readTrade({ tradeId })
      );
    }
  }, [foc]);
};
