import {
  ContextBridge,
  IpcRenderer,
  IpcRendererEvent,
  contextBridge,
  ipcRenderer,
} from 'electron';
import {
  CurrencyPriceMap,
} from '../utils/fetchCurrencyPrices/types';
import { PreparedMessage } from '../types/PreparedMessage';
import { UnsignedMessage } from '../types/UnsignedMessage';

interface ContextBridge2 extends ContextBridge {
  exposeInMainWorld(
    apiKey: 'getMyOnionHostname',
    api: () => Promise<string>
  ): void;
  exposeInMainWorld(
    apiKey: 'fetchCurrencyPrices',
    api: () => Promise<CurrencyPriceMap>,
  ): void;
  exposeInMainWorld(
    apiKey: 'sendQuery',
    api: (url: string) => Promise<unknown>,
  ): void;
  exposeInMainWorld(
    apiKey: 'signAndSendMyMessage',
    api: (hostname: string, tradeId: string, message: Omit<UnsignedMessage, 'tradeId'>) => Promise<unknown>,
  ): void;
  exposeInMainWorld(
    apiKey: 'sendMessage',
    api: (hostname: string, tradeId: string, message: Omit<PreparedMessage, 'tradeId'>) => Promise<unknown>,
  ): void;

  exposeInMainWorld(
    apiKey: 'addTradeMessageListener',
    api: (callback: (tradeId: string, message: PreparedMessage) => Promise<unknown>) => void
  ): void;
  exposeInMainWorld(
    apiKey: 'addTradeQueryListener',
    api: (callback: (tradeId: string) => Promise<unknown>) => void
  ): void;
}
const contextBridge2 = contextBridge as ContextBridge2;

interface IpcRenderer2 extends IpcRenderer {
  invoke(channel: 'getMyOnionHostname'): Promise<string>;
  invoke(channel: 'fetchCurrencyPrices'): Promise<CurrencyPriceMap>;
  invoke(
    channel: 'sendQuery',
    url: string,
  ): Promise<unknown>;
  invoke(
    channel: 'signAndSendMyMessage',
    hostname: string,
    tradeId: string,
    message: Omit<UnsignedMessage, 'tradeId'>,
  ): Promise<unknown>;
  invoke(
    channel: 'sendMessage',
    hostname: string,
    tradeId: string,
    message: Omit<PreparedMessage, 'tradeId'>,
  ): Promise<unknown>;

  on(
    channel: 'tradeMessage',
    callback: (_: IpcRendererEvent, tradeId: string, message: PreparedMessage, replyId: string) => void
  ): this;
  on(
    channel: 'tradeQuery',
    callback: (_: IpcRendererEvent, tradeId: string, replyId: string) => void
  ): this;
}
const ipcRenderer2 = ipcRenderer as IpcRenderer2;

contextBridge2.exposeInMainWorld(
  'getMyOnionHostname',
  () => ipcRenderer2.invoke('getMyOnionHostname')
);
contextBridge2.exposeInMainWorld(
  'fetchCurrencyPrices',
  () => ipcRenderer2.invoke('fetchCurrencyPrices')
);
contextBridge2.exposeInMainWorld(
  'sendQuery',
  (url) => ipcRenderer2.invoke('sendQuery', url)
);
contextBridge2.exposeInMainWorld(
  'signAndSendMyMessage',
  (hostname, tradeId, message) => (
    ipcRenderer2.invoke('signAndSendMyMessage', hostname, tradeId, message)
  )
);
contextBridge2.exposeInMainWorld(
  'sendMessage',
  (hostname, tradeId, message) => (
    ipcRenderer2.invoke('sendMessage', hostname, tradeId, message)
  )
);

contextBridge2.exposeInMainWorld(
  'addTradeMessageListener',
  (jsCb) => {
    const cb = async (_: unknown, tradeId: string, message: PreparedMessage, replyId: string) => {
      const result = await jsCb(tradeId, message);
      ipcRenderer2.send(`tradeMessage-reply-${replyId}`, result);
    };
    ipcRenderer2.on('tradeMessage', cb);

    return () => { ipcRenderer2.off('tradeMessage', cb); };
  }
);

contextBridge2.exposeInMainWorld(
  'addTradeQueryListener',
  (jsCb) => {
    const cb = async (_: unknown, tradeId: string, replyId: string) => {
      const result = await jsCb(tradeId);
      ipcRenderer2.send(`tradeQuery-reply-${replyId}`, result);
    };
    ipcRenderer2.on('tradeQuery', cb);

    return () => { ipcRenderer2.off('tradeQuery', cb); };
  }
);
