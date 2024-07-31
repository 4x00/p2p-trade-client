import { Popup } from './Popup';
import { useJoinTradePopup } from '../../hooks/useJoinTradePopup';
import { JoinTradeDetails } from '../../types/JoinTradeDetails';
import { calcJoinTradePopupView } from '../../memos/calcJoinTradePopupView';

const N = Number;

export interface JoinTradeBuySellPopupProps {
  details: JoinTradeDetails;
  onSubmit: (myXmrAddress: string, xmrAmount: number, otherAmount: number) => void;
  onCancel: () => void;
  joinButtonText: string;
}
export const JoinTradeBuySellPopup: React.FC<JoinTradeBuySellPopupProps> = (
  ({ details, onSubmit, onCancel, joinButtonText }) => {
    const {
      myXmrAddress,
      setMyXmrAddress,
      amount,
      setXmrAmount,
      setOtherAmount,
    } = useJoinTradePopup();
    const view = calcJoinTradePopupView(details, myXmrAddress, amount);
    const submit = () => {
      onSubmit(myXmrAddress, N(view.monero.amount), N(view.other.amount));
    };

    return (
      <Popup>
        <div id="joinTradePopup">
          <input
            value={myXmrAddress}
            onChange={(event) => { setMyXmrAddress(event.target.value); }}
            placeholder='My XMR address'
            className='xmr-address-input'
          />
          <br /><br />

          {'Trade amount '}
          <input
            className='amount-input'
            value={view.monero.amount}
            onChange={(event) => { setXmrAmount(event.target.value); }}
            readOnly={view.monero.disableInput}
          />
          {' XMR = '}
          <input
            className='amount-input'
            value={view.other.amount}
            onChange={(event) => { setOtherAmount(event.target.value); }}
            readOnly={view.other.disableInput}
          />
          {` ${view.other.currency.toUpperCase()}`}
          <br /><br />

          <div className="rows">
            <button
              disabled={view.disableSubmit}
              onClick={submit}
            >
              {joinButtonText}
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
  }
);
