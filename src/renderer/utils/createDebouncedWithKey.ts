export const createDebouncedWithKey = (
  <Result, Key extends string>(
    func: (key: Key) => Promise<Result>,
    rememberFor: number,
  ) => {
    let activeTasks = {} as Record<Key, Promise<Result>>;
    let lastCheckTimes = {} as Record<Key, undefined | number>;

    return async (key: Key) => {
      const now = Date.now();

      if (!lastCheckTimes[key] || now - lastCheckTimes[key] > rememberFor) {
        activeTasks[key] = func(key);
        lastCheckTimes[key] = now;
      }

      return activeTasks[key] as Promise<Result>;
    };
  }
);
