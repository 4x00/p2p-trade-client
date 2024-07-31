import { AppActionType } from './AppActionType';
import { TradeDetails } from './TradeDetails';
import { TradeMessage } from './TradeMessage';

export interface CreateTradeAction {
  type: AppActionType.CREATE_TRADE;
  payload: TradeDetails;
}

export interface ReadTradeAction {
  type: AppActionType.READ_TRADE;
  payload: {
    tradeId: string;
  };
}

export interface AckMessageAction {
  type: AppActionType.ACK_MESSAGE;
  payload: {
    tradeId: string;
    messageId: string;
    receiver: string;
  };
}

export interface AckMessageReadAction {
  type: AppActionType.ACK_MESSAGE_READ;
  payload: {
    tradeId: string;
    messageId: string;
    receiver: string;
  };
}

export interface ReadMessageAction {
  type: AppActionType.READ_MESSAGE;
  payload: {
    tradeId: string;
    messageId: string;
    receiver: string;
  };
}

export interface AddMyMessageAction {
  type: AppActionType.ADD_MY_MESSAGE;
  payload: {
    tradeId: string;
    message: TradeMessage;
  };
}

export interface AddOthersMessageAction {
  type: AppActionType.ADD_OTHERS_MESSAGE;
  payload: {
    tradeId: string;
    message: TradeMessage;
  };
}

export type AppAction = (
  CreateTradeAction |
  ReadTradeAction |
  AckMessageAction |
  AckMessageReadAction |
  ReadMessageAction |
  AddMyMessageAction |
  AddOthersMessageAction
);
