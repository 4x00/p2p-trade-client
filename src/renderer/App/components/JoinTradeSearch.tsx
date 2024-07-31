import { useState } from 'react';

interface JoinTradeSearchProps {
  onSubmit: (url: string) => void;
  disabled: boolean;
}
export const JoinTradeSearch: React.FC<JoinTradeSearchProps> = ({ onSubmit, disabled }) => {
  const [url, setUrl] = useState('');

  return (
    <div id="joinTradeSearch">
      <input
        placeholder='Trade URL'
        className='trade-url-input'
        value={url}
        disabled={disabled}
        onChange={(event) => { setUrl(event.target.value); }}
      />
      <br /><br />
      <button
        disabled={disabled}
        onClick={() => { onSubmit(url); }}
      >
        Join trade
      </button>
      <hr />
    </div>
  );
};
