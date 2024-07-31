import { useMyOnionHostname } from '../../hooks/useMyOnionHostname';
import { calcRoleMap } from '../../memos/calcRoleMap';
import { Trade } from '../../types/Trade';
import { TradeRole } from '../../types/TradeRole';
import { OnionOfflineStatus } from './OnionOfflineStatus';

const AwaitingParty = () => <b>Awaiting party</b>;

export interface PartyOnionsProps {
  trade: Trade;
}

export const PartyOnions: React.FC<PartyOnionsProps> = (
  ({ trade }) => {
    const myOnionHostname = useMyOnionHostname();
    const roleMap = calcRoleMap(trade, myOnionHostname);
    const escrowHostname = roleMap[TradeRole.ESCROW];
    const xmrSellerHostname = roleMap[TradeRole.XMR_SELLER];
    const xmrBuyerHostname = roleMap[TradeRole.XMR_BUYER];

    return (
      <div id="partyOnions">
        <span>Escrow:</span>
        {escrowHostname || <AwaitingParty />}
        {' '}
        {escrowHostname && <OnionOfflineStatus hostname={escrowHostname}/>}
        <br />

        <span>XMR Seller:</span>
        {xmrSellerHostname || <AwaitingParty />}
        {' '}
        {xmrSellerHostname && <OnionOfflineStatus hostname={xmrSellerHostname}/>}
        <br />

        <span>XMR Buyer:</span>
        {xmrBuyerHostname || <AwaitingParty />}
        {' '}
        {xmrBuyerHostname && <OnionOfflineStatus hostname={xmrBuyerHostname}/>}
        <br />
      </div>
    );
  }
);
