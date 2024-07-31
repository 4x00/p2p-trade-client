import { createAction } from '@reduxjs/toolkit';
import { TradeMessage, TradeMessageSourceOthers } from '../../types/TradeMessage';
import { TradeMessageType } from '../../types/TradeMessageType';
import { AppActionType } from '../../types/AppActionType';

type CalcOthersMessage = (base: TradeMessageSourceOthers) => TradeMessage;
const calcOthersMessage: CalcOthersMessage = (base) => {
  switch (base.type) {
    case TradeMessageType.JOINED:
      return { ...base, ackedBy: [] };
    case TradeMessageType.TEXT:
    case TradeMessageType.IMAGE:
      return { ...base, ackedBy: [], read: false, readAcked: false };
  }
};

export const addOthersMessage = createAction(
  AppActionType.ADD_OTHERS_MESSAGE,
  (tradeId: string, base: TradeMessageSourceOthers) => ({
    payload: {
      tradeId,
      message: calcOthersMessage(base),
    }
  })
);
