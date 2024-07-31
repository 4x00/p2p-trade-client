import { TorAgent } from '../TorAgent';
import fetch from 'node-fetch';
import { createTimer } from '../createTimer';
import { SignedMessage } from '../../../types/SignedMessage';

const TIMEOUT = 30 * 1000;
const agent = TorAgent();

export const sendMessage = async (
  hostname: string,
  message: SignedMessage,
) => {
  const signal = AbortSignal.timeout(TIMEOUT);
  const timer = createTimer();

  let res;
  try {
    res = await fetch(
      `http://${hostname}/trades`,
      {
        method: 'POST',
        body: JSON.stringify(message),
        agent,
        signal,
    });

    console.log(
      'sendMessage',
      hostname,
      JSON.stringify(message).slice(0, 64),
      `${timer()}ms`
    );
  } catch (error) {
    console.warn(
      'sendMessage error',
      hostname,
      JSON.stringify(message).slice(0, 64),
      error?.message,
      `${timer()}ms`
    );
    return null;
  }

  if (!res.ok) { return null; }

  const out = await res.json();
  console.log('sendMessage out', out);
  return out;
};
