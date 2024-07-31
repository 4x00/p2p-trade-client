import { OtherCurrency } from '../../types/OtherCurrency';
import { FALLBACK_CURRENCY_PRICES } from '../../../utils/fetchCurrencyPrices/const';
import { CreateTradeFormStateDelta } from '../../types/CreateTradeFormStateDelta';
import { TradeType } from '../../types/TradeType';
import { CreateTradeFormState } from '../../types/CreateTradeFormState';
import { calcCreateTradeFormView } from '../../memos/calcCreateTradeFormView';
import { useCurrencyPrices } from '../../hooks/useCurrencyPrices';

interface CreateTradeFormProps {
  state: CreateTradeFormState;
  dispatch: React.Dispatch<CreateTradeFormStateDelta>;
  onSubmit: () => void;
}
export const CreateTradeForm: React.FC<CreateTradeFormProps> = ({ state, dispatch, onSubmit }) => {
  const currencyPrices = useCurrencyPrices();
  const view = calcCreateTradeFormView(state, currencyPrices);

  return (
    <div id="createTradeForm">
      <input
        placeholder='Title'
        value={view.title}
        onChange={
          (event) => { dispatch({ title: event.target.value}); }
        }
      />
      <br /><br />

      <textarea
        className='description-input'
        placeholder='Description'
        value={view.description}
        onChange={
          (event) => { dispatch({ description: event.target.value}); }
        }
      />
      <br /><br />

      <select
        value={view.type}
        onChange={
          (event) => { dispatch({ type: event.target.value as TradeType }); }
        }
        className='trade-type-select'
      >
        <option value={TradeType.SELL_XMR}>Sell</option>
        <option value={TradeType.BUY_XMR}>Buy</option>
      </select>
      {' '}
      <input
        placeholder='Min'
        className='amount-input'
        value={view.monero.min}
        onChange={
          (event) => { dispatch({ monero: { min: event.target.value } }); }
        }
        readOnly={view.monero.disableMinMax}
      />
      {' - '}
      <input
        placeholder='Max'
        className='amount-input'
        value={view.monero.max}
        onChange={
          (event) => { dispatch({ monero: { max: event.target.value } }); }
        }
        readOnly={view.monero.disableMinMax}
      />
      {' XMR'}
      <br /><br />

      <input className='dummy trade-type-select' readOnly />
      {' @ '}
      <input
        className='percent-input'
        value={view.marketPricePercent}
        onChange={
          (event) => { dispatch({ marketPricePercent: event.target.value }); }
        }
      />
      {' % of market price'}
      <br /><br />

      <input className='dummy trade-type-select' readOnly />
      {' '}
      <input
        placeholder='Min'
        className='amount-input'
        value={view.other.min}
        onChange={
          (event) => { dispatch({ other: { min: event.target.value } }); }
        }
        readOnly={view.other.disableMinMax}
      />
      {' - '}
      <input
        placeholder='Max'
        className='amount-input'
        value={view.other.max}
        onChange={
          (event) => { dispatch({ other: { max: event.target.value } }); }
        }
        readOnly={view.other.disableMinMax}
      />
      {' '}
      <select
        className='currency-select'
        value={view.other.currency}
        onChange={
          (event) => {
            dispatch({ other: { currency: event.target.value as OtherCurrency } });
          }
        }
      >
        {
          Object
            .keys(FALLBACK_CURRENCY_PRICES)
            .map((currencyName) => (
              <option
                key={currencyName}
                value={currencyName}
              >
                {currencyName.toUpperCase()}
              </option>
            ))
        }
      </select>
      <br /><br />

      {' Escrow fee '}
      <input
        className='percent-input'
        value={view.escrowFee.percent}
        onChange={
          (event) => { dispatch({ escrowFee: { percent: event.target.value } }); }
        }
      />
      {' % + '}
      <input
        className='amount-input'
        value={view.escrowFee.flat}
        onChange={
          (event) => { dispatch({ escrowFee: { flat: event.target.value } }); }
        }
      />
      {' XMR'}
      <br /><br />

      <button
        disabled={view.disableSubmit}
        onClick={onSubmit}
      >
        Create trade
      </button>
    </div>
  );
};
