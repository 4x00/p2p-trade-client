import crypto from 'node:crypto';
import { BrowserWindow, ipcMain } from 'electron';

export interface Bridge {
  send: (channel: string, ...args: unknown[]) => void;
  sendAndAwaitReply: (channel: string, ...args: unknown[]) => Promise<unknown[]>;
}
export type CreateBridge = (mainWindow: BrowserWindow) => Bridge;

export const createBridge: CreateBridge = (mainWindow) => ({
  send: (...args) => mainWindow.webContents.send(...args),
  sendAndAwaitReply: (channel, ...args) => new Promise((resolve) => {
    const replyId = crypto.randomUUID();

    mainWindow.webContents.send(channel, ...args, replyId);
    ipcMain.once(`${channel}-reply-${replyId}`, (_, ...args) => {
      resolve(args);
    });
  })
});
