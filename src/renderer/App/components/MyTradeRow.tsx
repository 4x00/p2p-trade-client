import { Link } from 'react-router-dom';
import { Trade } from '../../types/Trade';
import { calcMyTradeRowView } from '../../memos/calcMyTradeRowView';
import { useCurrencyPrices } from '../../hooks/useCurrencyPrices';
import { getTradeStatusText } from '../../memos/getTradeStatusText';
import { getTradeRoleText } from '../../memos/getTradeRoleText';

export interface MyTradeRowProps {
  trade: Trade;
}
export const MyTradeRow: React.FC<MyTradeRowProps> = ({ trade }) => {
  const currencyPrices = useCurrencyPrices();
  const view = calcMyTradeRowView(trade, currencyPrices);

  return (
    <tr>
      <td><Link to={`/my-trades/${view.id}`}>{view.id}</Link></td>
      <td>{getTradeRoleText(view.myRole)}</td>
      <td>{view.title}</td>
      <td>{getTradeStatusText(view.status)}</td>
      <td>{view.xmrAmount}</td>
      <td>{view.otherAmount}</td>
      <td>{view.otherCurrency.toUpperCase()}</td>
      <td>{view.createdAt}</td>
    </tr>
  );
};
