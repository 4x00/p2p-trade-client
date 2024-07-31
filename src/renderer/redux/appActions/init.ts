import { createAction } from '@reduxjs/toolkit';
import { AppActionType } from '../../types/AppActionType';

export const init = createAction(AppActionType.INIT);
