import { createReducer } from '@reduxjs/toolkit';
import * as appActions from '../appActions';
import { addMessageCase } from './addMessageCase';
import { createTradeCase } from './createTradeCase';
import { AppState } from '../../types/AppState';
import { ackMessageCase } from './ackMessageCase';
import { readMessageCase } from './readMessageCase';
import { readTradeCase } from './readTradeCase';
import { ackMessageReadCase } from './ackMessageReadCase';

export const createAppReducer = (
  (initialState: AppState) => createReducer(initialState, (builder) => {
    builder
      .addCase(appActions.addMyMessage, addMessageCase)
      .addCase(appActions.addOthersMessage, addMessageCase)
      .addCase(appActions.ackMessage, ackMessageCase)
      .addCase(appActions.ackMessageRead, ackMessageReadCase)
      .addCase(appActions.readMessage, readMessageCase)
      .addCase(appActions.createTrade, createTradeCase)
      .addCase(appActions.readTrade, readTradeCase);
  })
);
