import { createAction } from '@reduxjs/toolkit';
import { AckMessageAction } from '../../types/AppAction';
import { AppActionType } from '../../types/AppActionType';

export const ackMessage = (
  createAction(
    AppActionType.ACK_MESSAGE,
    (p: AckMessageAction['payload']) => ({ payload: p })
  )
);
