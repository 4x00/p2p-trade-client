import { configureAppStore  } from '../redux/configureAppStore';

export type AppStore = Awaited<ReturnType<typeof configureAppStore>>;
