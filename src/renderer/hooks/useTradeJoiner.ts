import { useEffect, useState } from 'react';
import { TradeRole } from '../types/TradeRole';
import { createCancelablePromise } from '../utils/createCancelablePromise';
import { sendJoinRequest } from '../utils/sendJoinRequest';
import { JoinedMessageSource } from '../types/TradeMessage';
import { JoinRequestMessageSource } from '../types/ServerMessage';
import { ServerMessageType } from '../types/ServerMessageType';
import { TradeMessageType } from '../types/TradeMessageType';
import { MessageMetadata } from '../types/MessageMetadata';
import { genId } from '../utils/genId';
import { genNow } from '../utils/genNow';

interface JoinDetails {
  url: string;
  role: TradeRole;
  xmrAddress: string;
  xmrAmount?: number;
  otherAmount?: number;
}

type CreateJoinedMessage = (details: JoinDetails) => JoinedMessageSource & MessageMetadata;
const createJoinedMessage: CreateJoinedMessage = (details) => ({
  id: genId(),
  createdAt: genNow(),
  type: TradeMessageType.JOINED,
  payload: {
    role: details.role,
    xmrAddress: details.xmrAddress,
    ...(
      (details.xmrAmount && details.otherAmount)
      ? { xmrAmount: details.xmrAmount, otherAmount: details.otherAmount }
      : {}
    )
  },
});

type CreateJoinRequestMessage = (details: JoinDetails) => JoinRequestMessageSource & MessageMetadata;
const createJoinRequestMessage: CreateJoinRequestMessage = (details) => ({
  id: genId(),
  createdAt: genNow(),
  type: ServerMessageType.JOIN_REQUEST,
  payload: {
    role: details.role,
  },
});

export const useTradeJoiner = (onJoined: (jm: JoinedMessageSource & MessageMetadata) => void) => {
  const [details, setDetails] = useState<JoinDetails | undefined>();
  const [loading, setLoading] = useState<boolean>();
  const [result, setResult] = useState<boolean | undefined>();
  const join = (details: JoinDetails) => {
    setDetails(details);
  };
  const clear = () => {
    setDetails(undefined);
  };
  useEffect(() => {
    setLoading(false);
    setResult(undefined);
    if (!details) { return; }

    setLoading(true);

    const jrm = createJoinRequestMessage(details);
    const jm = createJoinedMessage(details);
    const [res, cancel] = createCancelablePromise(() => (
      sendJoinRequest(details.url, jrm, jm)
    ));
    res
      .then((r) => {
        setLoading(false);
        if (r) {
          onJoined(jm);
        }
        setResult(r);
      })
      .catch((e) => {
        if (e.code !== DOMException.ABORT_ERR) {
          throw e;
        }
      });

      return () => { cancel(); };
  }, [details]);

  return { join, loading, result, clear };
};
