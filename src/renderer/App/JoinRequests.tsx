import { useJoinRequests } from '../hooks/useJoinRequests';
import { JoinRequestPopup } from './components/JoinRequestPopup';

export const JoinRequests = () => {
  const jr = useJoinRequests()[0];
  if (!jr) { return null; }

  return (
    <JoinRequestPopup
      hostname={jr.message.sender.hostname}
      tradeId={jr.tradeId}
      role={jr.message.payload.role}
      onAccept={() => { jr.respond(true); }}
      onRefuse={() => { jr.respond(false); }}
    />
  );
};
