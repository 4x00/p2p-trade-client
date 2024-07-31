import { app, session } from 'electron';

export const disableNetwork = () => {
  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    const protocol = new URL(details.url).protocol.slice(0, -1);

    if (protocol !== 'devtools') {
      console.log(details.url);
    }

    if (app.isPackaged) {
      callback({ cancel: true });
    } else {
      callback({});
    }
  });
};
