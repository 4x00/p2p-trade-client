import { useState } from 'react';

import { JoinTradeBSEPopup } from '../../components/JoinTradeBSEPopup';
import { JoinTradeLoadingPopup } from '../../components/JoinTradeLoadingPopup';
import { JoinTradeRefusedPopup } from '../../components/JoinTradeRefusedPopup';
import { JoinTradeAcceptedPopup } from '../../components/JoinTradeAcceptedPopup';
import { JoinTradeForm } from '../../components/JoinTradeForm';

import { useTradeJoiner } from '../../../hooks/useTradeJoiner';
import { useTradeAccepter } from '../../../hooks/useTradeAccepter';
import { TradeRole } from '../../../types/TradeRole';
import { JoinTradeDetails } from '../../../types/JoinTradeDetails';
import { useNavigateToMyTrade } from '../../../hooks/useNavigateToMyTrade';
import { useTradeQuerier } from '../../../hooks/useTradeQuerier';

interface QueryResultProps {
  querier: ReturnType<typeof useTradeQuerier>;
}
export const QueryResult: React.FC<QueryResultProps> = ({ querier }) => {
  const accept = useTradeAccepter();
  const [desiredRole, setDesiredRole] = useState<TradeRole | undefined>();

  const joiner = useTradeJoiner((jm) => { accept(querier.result as JoinTradeDetails, jm); });

  const navigateToNewTrade = useNavigateToMyTrade((querier?.result as JoinTradeDetails)?.id);
  const onJoinTradeBSEPopupSubmit = (xmrAddress: string, xmrAmount?: number, otherAmount?: number) => {
    joiner.join({
      url: querier.url,
      role: desiredRole,
      xmrAddress,
      xmrAmount,
      otherAmount,
    });
    setDesiredRole(undefined);
  };

  return (
    <>
      {
        querier.result && (querier.result as JoinTradeDetails).title && (
          <JoinTradeForm
            details={querier.result as JoinTradeDetails}
            onEscrowJoinRequest={() => { setDesiredRole(TradeRole.ESCROW); }}
            onXmrBuyerJoinRequest={() => { setDesiredRole(TradeRole.XMR_BUYER); }}
            onXmrSellerJoinRequest={() => { setDesiredRole(TradeRole.XMR_SELLER); }}
          />
        )
      }

      {
        desiredRole && (
          <JoinTradeBSEPopup
            desiredRole={desiredRole}
            details={querier.result as JoinTradeDetails}
            onSubmit={onJoinTradeBSEPopupSubmit}
            onCancel={() => { setDesiredRole(undefined); }}
          />
        )
      }

      {joiner.loading && <JoinTradeLoadingPopup />}
      {joiner.result === false && (
        <JoinTradeRefusedPopup
          onClose={() => { joiner.clear(); }}
        />
      )}
      {joiner.result === true && (
        <JoinTradeAcceptedPopup
          onClose={() => { navigateToNewTrade(); }}
        />
      )}
    </>
  );
};
