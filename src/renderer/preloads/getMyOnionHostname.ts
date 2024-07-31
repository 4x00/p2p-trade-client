export {};

declare global {
  const getMyOnionHostname: () => Promise<string>;
}
