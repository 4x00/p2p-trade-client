import { createAction } from '@reduxjs/toolkit';
import { AckMessageReadAction } from '../../types/AppAction';
import { AppActionType } from '../../types/AppActionType';

export const ackMessageRead = (
  createAction(
    AppActionType.ACK_MESSAGE_READ,
    (p: AckMessageReadAction['payload']) => ({ payload: p })
  )
);
