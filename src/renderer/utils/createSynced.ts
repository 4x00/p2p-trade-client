export const createSynced = (
  <Result>(
    func: () => Promise<Result>,
    rememberFor: number,
  ) => {
    let activeTask: Promise<Result>;
    let lastWindowStart: undefined | number;

    return async () => {
      const now = Date.now();
      const windowStart = now - now % rememberFor;

      if (!lastWindowStart || now >= lastWindowStart + rememberFor) {
        activeTask = func();
        lastWindowStart = windowStart;
      }

      return activeTask;
    };
  }
);
