import { Tuple, configureStore } from '@reduxjs/toolkit';
import { getPreloadedAppState } from './getPreloadedAppState';
import { createAppReducer } from './createAppReducer';
import { saver } from './appMiddlewares/saver';
import { acker } from './appMiddlewares/acker';
import { reader } from './appMiddlewares/reader';
import { init } from './appActions';

export const configureAppStore = async () => {
  const myOnionHostname = await getMyOnionHostname();
  const appState = getPreloadedAppState(myOnionHostname);

  const store = (
    configureStore({
      reducer: createAppReducer(appState),
      middleware: (getDefaultMiddleware) => (
        new Tuple(
          ...getDefaultMiddleware(),
          saver,
          acker,
          reader,
        )
      )
    })
  );
  store.dispatch(init());

  return store;
};
