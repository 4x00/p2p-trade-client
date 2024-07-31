import { useState } from 'react';

export const useJoinTradePopup= () => {
  const [myXmrAddress, setMyXmrAddress] = useState('');
  const [amount, setAmount] = useState({ monero: '', other: '' });
  const setXmrAmount = (xmrAmount: string) => { setAmount({ monero: xmrAmount, other: '' }); };
  const setOtherAmount = (otherAmount: string) => { setAmount({ monero: '', other: otherAmount }); };

  return {
    myXmrAddress,
    setMyXmrAddress,
    amount,
    setXmrAmount,
    setOtherAmount,
  };
};
