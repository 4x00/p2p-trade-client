import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { configureAppStore } from './redux/configureAppStore';
import { createTradeQueryListener } from './server/createTradeQueryListener';
import { createTradeMessageListener } from './server/createTradeMessageListener';

(async () => {
  const store = await configureAppStore();
  addTradeQueryListener(createTradeQueryListener(store));
  addTradeMessageListener(createTradeMessageListener(store));

  const root = createRoot(document.querySelector('#app'));
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
})();
