import { app, BrowserWindow } from 'electron';
import { disableNetwork } from './disableNetwork';
import { expose } from './expose';
import { addWindowsShortcuts } from './addWindowsShortcuts';
import { createWindow } from './createWindow';
import { Bridge, createBridge } from './createBridge';
import { getUserDataPath } from '../utils/getUserDataPath';

addWindowsShortcuts();

export type CreateApp = () => Promise<Bridge>;
export const createApp: CreateApp = (
  () => new Promise((resolve) => {
    if (getUserDataPath()) {
      app.setPath('userData', getUserDataPath());
    }

    app.on('ready', () => {
      const mainWindow = createWindow();

      disableNetwork();
      expose();

      resolve(createBridge(mainWindow));
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  })
);
