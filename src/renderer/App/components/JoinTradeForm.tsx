import { TradeType } from '../../types/TradeType';
import { JoinTradeDetails } from '../../types/JoinTradeDetails';
import { TradeRole } from '../../types/TradeRole';
import { calcJoinTradeFormView } from '../../memos/calcJoinTradeFormView';
import { getTradeTypeText } from '../../memos/getTradeTypeText';

export interface JoinTradeFormProps {
  details: JoinTradeDetails;
  onEscrowJoinRequest: () => void;
  onXmrSellerJoinRequest: () => void;
  onXmrBuyerJoinRequest: () => void;
}
export const JoinTradeForm: React.FC<JoinTradeFormProps> = (
  ({ details, onEscrowJoinRequest, onXmrSellerJoinRequest, onXmrBuyerJoinRequest }) => {
    const view = calcJoinTradeFormView(details);

    return (
      <div id="joinTradeForm">
        <input value={view.title} readOnly/>
        <br /><br />

        <textarea className='description-input' value={view.description} readOnly />
        <br /><br />

        <input className='trade-type-select' value={getTradeTypeText(view.type)} readOnly />
        {' '}
        <input className='amount-input' value={view.monero.min} readOnly />
        {' - '}
        <input className='amount-input' value={view.monero.max} readOnly />
        {' XMR'}
        <br /><br />

        <input className='dummy trade-type-select' readOnly />
        {' @ '}
        <input className='percent-input' value={view.marketPricePercent} readOnly/>
        {' % of market price'}
        <br /><br />

        <input className='dummy trade-type-select' readOnly />
        {' '}
        <input className='amount-input' value={view.other.min} readOnly />
        {' - '}
        <input className='amount-input' value={view.other.max} readOnly />
        {' '}
        <input className='currency-select' value={view.other.currency.toUpperCase()} readOnly />
        <br /><br />

        {' Escrow fee '}
        <input className='percent-input' value={view.escrowFee.percent} readOnly/>
        {' % + '}
        <input className='amount-input' value={view.escrowFee.flat} readOnly/>
        {' XMR'}
        <br /><br />

        <button
          disabled={!view.availableRoles.includes(TradeRole.ESCROW)}
          onClick={() => { onEscrowJoinRequest(); }}
        >
          Request to join as Escrow
        </button>
        <br /><br />
        {
          view.type === TradeType.BUY_XMR && (
            <>
              <button
                disabled={!view.availableRoles.includes(TradeRole.XMR_SELLER)}
                onClick={() => { onXmrSellerJoinRequest(); }}
              >
                Request to join as XMR Seller
              </button>
              <br /><br />
            </>
          )
        }
        {
          view.type === TradeType.SELL_XMR && (
            <>
              <button
                disabled={!view.availableRoles.includes(TradeRole.XMR_BUYER)}
                onClick={() => { onXmrBuyerJoinRequest(); }}
              >
                Request to join as XMR Buyer
              </button>
              <br /><br />
            </>
          )
        }
      </div>
    );
  }
);
