import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as appActions from '../redux/appActions';

import { CreateTradeFormState } from '../types/CreateTradeFormState';
import { TradeMessageType } from '../types/TradeMessageType';
import { getTradeCreatorRole } from '../memos/getTradeCreatorRole';
import { TradeType } from '../types/TradeType';
import { JoinedMessageSource } from '../types/TradeMessage';

interface CreateJoinedMessageArg {
  type: TradeType;
  xmrAddress: string;
}
type CreateJoinedMessage = (arg: CreateJoinedMessageArg) => JoinedMessageSource;
const createJoinedMessage: CreateJoinedMessage = ({ type, xmrAddress }) => ({
  type: TradeMessageType.JOINED,
  payload: {
    role: getTradeCreatorRole(type),
    xmrAddress,
  }
});

export const useTradeCreator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (formState: CreateTradeFormState, xmrAddress: string) => {
    const action = appActions.createTrade(formState);
    dispatch(action);

    const action2 = appActions.addMyMessage(
      action.payload.id,
      createJoinedMessage({ type: action.payload.type, xmrAddress}),
    );
    dispatch(action2);

    navigate(`/my-trades/${action.payload.id}`);
  };
};
