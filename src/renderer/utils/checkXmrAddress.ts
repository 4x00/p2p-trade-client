export const checkXmrAddress = (address: string) => (
  /^[48][0-9AB][1-9A-HJ-NP-Za-km-z]{93}$/g.test(address) ||
  /^4[1-9A-HJ-NP-Za-km-z]{105}$/g.test(address) ||
  address === 'demo1' ||
  address === 'demo2' ||
  address === 'demo3'
);
