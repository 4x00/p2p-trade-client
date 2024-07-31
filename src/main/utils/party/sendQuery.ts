import { TorAgent } from '../TorAgent';
import fetch from 'node-fetch';
import { createTimer } from '../createTimer';

const TIMEOUT = 30 * 1000;
const agent = TorAgent();

export const sendQuery = async (url: string) => {
  const signal = AbortSignal.timeout(TIMEOUT);
  const timer = createTimer();

  let res;
  try {
    res = await fetch(`http://${url}`, { agent, signal });

    console.log('sendQuery', url, `${timer()}ms`);
  } catch (error) {
    console.warn('sendQuery error', url, error?.message, `${timer()}ms`);
    return null;
  }

  const out = await res.json();
  console.log('sendQuery out', out);
  return out;
};
