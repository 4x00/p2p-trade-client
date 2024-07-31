import { useState } from 'react';
import { Popup } from './Popup';
import { checkXmrAddress } from '../../utils/checkXmrAddress';

export interface CreateTradePopupProps {
  onSubmit: (myXmrAddress: string) => void;
  onCancel: () => void;
}
export const CreateTradePopup: React.FC<CreateTradePopupProps> = ({ onSubmit, onCancel }) => {
  const [myXmrAddress, setMyXmrAddress] = useState('');

  return (
    <Popup>
      <div id="createTradePopup">
        <input
          value={myXmrAddress}
          onChange={(event) => { setMyXmrAddress(event.target.value); }}
          placeholder='My XMR address'
          className='xmr-address-input'
        />
        <br /><br />
        <div className="rows">
          <button
            disabled={!checkXmrAddress(myXmrAddress)}
            onClick={() => { onSubmit(myXmrAddress); }}
          >
            Create trade
          </button>
          <button
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </Popup>
  );
};
