import { JoinTradeDetails } from '../../types/JoinTradeDetails';
import { TradeRole } from '../../types/TradeRole';
import { JoinTradeEscrowPopup } from './JoinTradeEscrowPopup';
import { JoinTradeSellPopup } from './JoinTradeSellPopup';
import { JoinTradeBuyPopup } from './JoinTradeBuyPopup';

export interface JoinTradeBSEPopupProps {
  desiredRole: TradeRole;
  details: JoinTradeDetails;
  onSubmit: (myXmrAddress: string, xmrAmount?: number, otherAmount?: number) => void;
  onCancel: () => void;
}

export const JoinTradeBSEPopup = ({ desiredRole, details, onSubmit, onCancel }: JoinTradeBSEPopupProps) => (
  <>
    {
      desiredRole === TradeRole.ESCROW && (
        <JoinTradeEscrowPopup
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      )
    }
    {
      desiredRole === TradeRole.XMR_SELLER && (
        <JoinTradeSellPopup
          details={details}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      )
    }
    {
      desiredRole === TradeRole.XMR_BUYER && (
        <JoinTradeBuyPopup
          details={details}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      )
    }
  </>
);
