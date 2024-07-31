import { useDispatch } from 'react-redux';
import * as appActions from '../redux/appActions';

import { JoinedMessageSource } from '../types/TradeMessage';
import { JoinTradeDetails } from '../types/JoinTradeDetails';
import { MessageMetadata } from '../types/MessageMetadata';

export const useTradeAccepter = () => {
  const dispatch = useDispatch();

  return (details: JoinTradeDetails, jm: JoinedMessageSource & MessageMetadata) => {
    dispatch(appActions.createTrade(details));
    dispatch(appActions.addMyMessage(details.id, jm));
  };
};
