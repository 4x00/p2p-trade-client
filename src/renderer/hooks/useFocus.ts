import { useEffect, useState } from 'react';

export const useFocus = () => {
  const [foc, setFoc] = useState(true);
  useEffect(() => {
    const onBlur = () => {
      setFoc(false);
    };
    const onFocus = () => {
      setFoc(true);
    };
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  });

  return foc;
};
