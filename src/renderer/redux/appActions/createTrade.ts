import { createAction } from '@reduxjs/toolkit';
import { AppActionType } from '../../types/AppActionType';
import { CreateTradeSource } from '../../types/CreateTradeSource';
import { genId } from '../../utils/genId';
import { genNow } from '../../utils/genNow';

const N = Number;

export const createTrade = createAction(
  AppActionType.CREATE_TRADE,
  (source: CreateTradeSource) => ({
    payload: {
      id: source.id ?? genId(),
      title: source.title,
      description: source.description,
      type: source.type,
      monero: {
        min: source.monero.min !== '' ? N(source.monero.min) : undefined,
        max: source.monero.max !== '' ? N(source.monero.max) : undefined,
      },
      marketPricePercent: N(source.marketPricePercent),
      other: {
        min: source.other.min !== '' ? N(source.other.min) : undefined,
        max: source.other.max !== '' ? N(source.other.max) : undefined,
        currency: source.other.currency,
      },
      escrowFee: {
        percent: N(source.escrowFee.percent),
        flat: N(source.escrowFee.flat),
      },
      createdAt: source.createdAt ?? genNow(),
    }
  })
);
