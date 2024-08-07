import { IpcMain, IpcMainEvent, ipcMain } from 'electron';

import { CurrencyPriceMap } from '../../utils/fetchCurrencyPrices/types';
import { getMyOnionHostname } from '../utils/party/getMyOnionHostname';
import { fetchCurrencyPrices } from '../../utils/fetchCurrencyPrices';
import { sendQuery } from '../utils/party/sendQuery';
import { UnsignedMessage } from '../../types/UnsignedMessage';
import { signAndSendMyMessage } from '../utils/party/signAndSendMyMessage';
import { PreparedMessage } from '../../types/PreparedMessage';
import { sendMessage } from '../utils/party/sendMessage';
import { unprepareMessage } from '../utils/party/unprepareMessage';

interface IpcMain2 extends IpcMain {
  handle(
    channel: 'getMyOnionHostname',
    listener: (event: IpcMainEvent) => string,
  ): void;
  handle(
    channel: 'fetchCurrencyPrices',
    listener: (event: IpcMainEvent) => Promise<CurrencyPriceMap>,
  ): void;
  handle(
    channel: 'sendQuery',
    listener: (event: IpcMainEvent, url: string) => Promise<unknown>,
  ): void;
  handle(
    channel: 'signAndSendMyMessage',
    listener: (
      event: IpcMainEvent,
      hostname: string,
      tradeId: string,
      message: Omit<UnsignedMessage, 'tradeId'>,
    ) => Promise<unknown>,
  ): void;
  handle(
    channel: 'sendMessage',
    listener: (
      event: IpcMainEvent,
      hostname: string,
      tradeId: string,
      message: PreparedMessage,
    ) => Promise<unknown>,
  ): void;
}
const ipcMain2 = ipcMain as IpcMain2;

export const expose = () => {
  ipcMain2.handle('getMyOnionHostname', () => getMyOnionHostname());
  ipcMain2.handle('fetchCurrencyPrices', () => fetchCurrencyPrices());
  ipcMain2.handle('sendQuery', (_, url) => sendQuery(url));
  ipcMain2.handle(
    'signAndSendMyMessage',
    (_, hostname, tradeId, message) => (
      signAndSendMyMessage(hostname, { tradeId, ...message })
    )
  );
  ipcMain2.handle(
    'sendMessage',
    (_, hostname, tradeId, message) => (
      sendMessage(hostname, unprepareMessage(tradeId, message))
    )
  );
};
