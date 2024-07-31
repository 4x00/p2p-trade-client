import { getTradeRoleText } from '../../memos/getTradeRoleText';
import { TradeRole } from '../../types/TradeRole';
import { Popup } from './Popup';

interface JoinRequestPopupProps {
  hostname: string;
  tradeId: string;
  role: TradeRole;
  onAccept: () => void;
  onRefuse: () => void;
}
export const JoinRequestPopup: React.FC<JoinRequestPopupProps> = (
  ({ tradeId, hostname, role, onAccept, onRefuse }) => (
    <Popup>
      <div id="joinRequestPopup">
        <h1>Trade Join Request</h1>

        <label>Trade ID</label>
        {' '}
        <input value={tradeId} readOnly />
        <br /><br />

        <h2>Party details</h2>

        <label>Hostname</label>
        {' '}
        <input value={hostname} readOnly className='hostname-input' />
        <br /><br />

        <label>Role</label>
        {' '}
        <input value={getTradeRoleText(role)} readOnly />
        <br /><br />

        <div className="rows">
          <button
            onClick={() => { onAccept(); }}
          >
            Accept
          </button>
          <button
            onClick={() => { onRefuse(); }}
          >
            Refuse
          </button>
        </div>
      </div>
    </Popup>
  )
);
