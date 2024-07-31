import { createAction } from '@reduxjs/toolkit';
import { ReadTradeAction } from '../../types/AppAction';
import { AppActionType } from '../../types/AppActionType';

export const readTrade = (
  createAction(
    AppActionType.READ_TRADE,
    (p: ReadTradeAction['payload']) => ({ payload: p })
  )
);
