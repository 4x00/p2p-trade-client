import { createAction } from '@reduxjs/toolkit';
import { ReadMessageAction } from '../../types/AppAction';
import { AppActionType } from '../../types/AppActionType';

export const readMessage = (
  createAction(
    AppActionType.READ_MESSAGE,
    (p: ReadMessageAction['payload']) => ({ payload: p })
  )
);
