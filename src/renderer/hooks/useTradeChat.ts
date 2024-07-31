import { useDispatch } from 'react-redux';
import { TradeMessageType } from '../types/TradeMessageType';
import * as appActions from '../redux/appActions';

export const useTradeChat = () => {
  const dispatch = useDispatch();
  const sendText = (tradeId: string, text: string) => {
    dispatch(appActions.addMyMessage(
      tradeId,
      {
        type: TradeMessageType.TEXT,
        payload: text,
      }
    ));
  };
  const sendImage = (tradeId: string, image: string) => {
    dispatch(appActions.addMyMessage(
      tradeId,
      {
        type: TradeMessageType.IMAGE,
        payload: image,
      }
    ));
  };

  return { sendText, sendImage };
};
