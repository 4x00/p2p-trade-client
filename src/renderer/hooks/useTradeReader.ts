import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUnreadMessages } from '../memos/getUnreadMessages';
import * as appActions from '../redux/appActions';
import { useMyTrade } from './useMyTrade';
import { useFocus } from './useFocus';

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
