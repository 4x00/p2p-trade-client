export const createCancelablePromise = (
  <Result>(
    func: () => Promise<Result>
  ): [Promise<Result>, (reason?: unknown) => void] => {
    const ac = new AbortController();
    const cancel = (reason?: unknown) => { ac.abort(reason); };

    const promise = new Promise<Result>((resolve, reject) => {
        ac.signal.addEventListener('abort', () => {
          reject(ac.signal.reason);
        });

        func().then(resolve, reject);
    });

    return [promise, cancel];
  }
);
