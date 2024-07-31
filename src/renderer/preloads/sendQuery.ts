export {};

declare global {
  const sendQuery: (url: string) => Promise<unknown>;
}
