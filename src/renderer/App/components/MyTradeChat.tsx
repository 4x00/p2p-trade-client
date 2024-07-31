import { ChangeEvent, useRef, useState } from 'react';
import { Trade } from '../../types/Trade';
import { MyTradeChatMessages } from './MyTradeChatMessages';

interface MyTradeChatProps {
  trade: Trade;
  onSendText: (text: string) => void;
  onSendImage: (image: string) => void;
}
export const MyTradeChat: React.FC<MyTradeChatProps> = ({ trade, onSendText, onSendImage }) => {
  const [textInput, setTextInput] = useState('');
  const onClickTextInput = () => {
    if (textInput) {
      onSendText(textInput);
      setTextInput('');
    }
  };

  const imageInputRef = useRef();
  const onClickImageInput = () => {
    (imageInputRef.current as HTMLInputElement).click();
  };
  const onImageInputChange = (event: ChangeEvent) => {
    const file = (event.target as HTMLInputElement).files[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => { onSendImage(reader.result as string); }
      );
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id="myTradeChat">
      <MyTradeChatMessages trade={trade}/>

      <textarea
        id='myTradeTextInput'
        value={textInput}
        onChange={(event) => { setTextInput(event.target.value); }}
      >
      </textarea>

      <div className="rows-right">
        <button onClick={onClickTextInput}>
          Send message
        </button>
        <button onClick={onClickImageInput}>
          <input
            className='hidden'
            ref={imageInputRef}
            type='file'
            accept="image/*"
            onChange={onImageInputChange}
          />
          Send image
        </button>
        <button disabled>
          Start spend poll
        </button>
      </div>
    </div>
  );
};
