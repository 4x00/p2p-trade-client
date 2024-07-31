import { createAction } from '@reduxjs/toolkit';
import { AppActionType } from '../../types/AppActionType';
import shortUUID from 'short-uuid';
import { TradeMessageSourceMe, TradeMessage } from '../../types/TradeMessage';
import { TradeMessageType } from '../../types/TradeMessageType';

type CalcMyMessage = (base: TradeMessageSourceMe, id: string, createdAt: string) => TradeMessage;
const calcMyMessage: CalcMyMessage = (base, id, createdAt) => {
  switch (base.type) {
    case TradeMessageType.JOINED:
      return {
        id: base.id ?? id,
        createdAt: base.createdAt ?? createdAt,
        type: base.type,
        payload: base.payload,
        ackedBy: [],
      };
    case TradeMessageType.TEXT:
    case TradeMessageType.IMAGE:
      return { id, createdAt, ...base, ackedBy: [], readBy: [] };
  }
};

export const addMyMessage = createAction(
  AppActionType.ADD_MY_MESSAGE,
  (tradeId: string, base: TradeMessageSourceMe) => ({
    payload: {
      tradeId,
      message: calcMyMessage(base, shortUUID.generate(), (new Date).toISOString()),
    }
  })
);
