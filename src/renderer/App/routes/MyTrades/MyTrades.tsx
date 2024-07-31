import { MyOnion } from '../../components/MyOnion';
import { MyTradesRows } from './MyTradeRows';

export const MyTrades = () => (
  <>
    <table id="myTradesTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>My role</th>
          <th>Title</th>
          <th>Status</th>
          <th>Amount (XMR)</th>
          <th>Amount (Other currency)</th>
          <th>Other currency</th>
          <th>Creation date</th>
        </tr>
      </thead>
      <tbody>
        <MyTradesRows />
      </tbody>
    </table>
    <MyOnion />
  </>
);
