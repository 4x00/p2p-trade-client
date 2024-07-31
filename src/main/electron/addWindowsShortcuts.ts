import { app } from 'electron';

export const addWindowsShortcuts = () => {
  if (require('electron-squirrel-startup')) {
    app.quit();
  }
};
