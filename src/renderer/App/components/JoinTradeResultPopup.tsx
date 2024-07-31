import { Popup } from './Popup';

export interface JoinTradeResultPopupProps {
  onClose: () => void;
  resultText: string;
}
export const JoinTradeResultPopup: React.FC<JoinTradeResultPopupProps> = (
  ({ resultText, onClose }) => (
    <Popup>
      <div id="joinTradePopup">
        <div className='join-request-result'>{resultText}</div>
        <br />
        <div className='center'>
          <button onClick={() => { onClose(); }}>Close</button>
        </div>
      </div>
    </Popup>
  )
);
