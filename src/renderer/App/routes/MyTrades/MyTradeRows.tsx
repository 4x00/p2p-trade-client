import { MyTradeRow } from '../../components/MyTradeRow';
import { useMyTrades } from '../../../hooks/useMyTrades';

export const MyTradesRows = () => {
  const myTrades = useMyTrades();

  return (
    <>{
      myTrades.map((trade) => (
        <MyTradeRow
          key={trade.details.id}
          trade={trade}
        />
      ))
    }</>
  );
};
