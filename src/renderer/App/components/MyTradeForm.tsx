import { Trade } from '../../types/Trade';
import { calcMyTradeFormView } from '../../memos/calcMyTradeFormView';
import { useCurrencyPrices } from '../../hooks/useCurrencyPrices';
import { getTradeStatusText } from '../../memos/getTradeStatusText';
import { getTradeRoleText } from '../../memos/getTradeRoleText';
import { getTradeTypeText } from '../../memos/getTradeTypeText';
import { useMyOnionHostname } from '../../hooks/useMyOnionHostname';

interface MyTradeFormProps {
  trade: Trade;
  children: React.ReactNode;
}
export const MyTradeForm: React.FC<MyTradeFormProps> = (
  ({ trade, children }) => {
    const myOnionHostname = useMyOnionHostname();
    const currencyPrices = useCurrencyPrices();
    const view = calcMyTradeFormView(trade, currencyPrices, myOnionHostname);

    return (
      <div id="myTradeForm">
        <label>Trade URL</label>
        {' '}
        <input className='trade-url-input' value={view.url} readOnly />
        <br /><br />

        <div className='rows'>
          <div>
            <label>Trade ID</label>
            {' '}
            <input value={view.id} readOnly />
            <br /><br />

            <label>Status</label>
            {' '}
            <input value={getTradeStatusText(view.status)} readOnly />
            <br /><br />

            <label>My role</label>
            {' '}
            <input value={getTradeRoleText(view.myRole)} readOnly />
            <br /><br />

            <input value={view.title} readOnly/>
            <br /><br />

            <textarea className='description-input' value={view.description} readOnly />
            <br /><br />

            <input className='trade-type-select' readOnly value={getTradeTypeText(view.type)} />
            {' '}
            {
              view.monero.amount
                ? <input className='amount-input' value={view.monero.amount} readOnly />
                : (
                  <>
                    <input className='amount-input' value={view.monero.min} readOnly />
                    {' - '}
                    <input className='amount-input' value={view.monero.max} readOnly />
                  </>
                )
            }
            {' XMR'}
            <br /><br />

            <input className='dummy trade-type-select' readOnly />
            {' @ '}
            <input className='percent-input' value={view.marketPricePercent} readOnly />
            {' % of market price'}
            <br /><br />

            <input className='dummy trade-type-select' readOnly />
            {' '}
            {
              view.other.amount
                ? <input className='amount-input' value={view.other.amount} readOnly />
                : (
                  <>
                    <input className='amount-input' value={view.other.min} readOnly />
                    {' - '}
                    <input className='amount-input' value={view.other.max} readOnly />
                  </>
                )
            }
            {' '}
            <input className='currency-select' readOnly value={view.other.currency.toUpperCase()} />
            <br /><br />

            {' Escrow fee '}
            <input className='percent-input' value={view.escrowFee.percent} readOnly/>
            {' % + '}
            <input className='amount-input' value={view.escrowFee.flat} readOnly/>
            {' XMR'}
          </div>

          {children}
        </div>
      </div>
    );
  }
);
