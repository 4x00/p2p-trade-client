import { useEffect, useState } from 'react';

export const useJoinRequests = () => {
  const [jrs, setJrs] = useState<TradeJoinRequestEvent['detail'][]>([]);
  useEffect(() => {
    const listener = (event: TradeJoinRequestEvent) => {
      const jr = {
        ...event.detail,
        respond: (result: boolean) => {
          setJrs(
            (jrs) => ( jrs.filter((entry) => entry.message.id !== event.detail.message.id))
          );

          return event.detail.respond(result);
        }
      };

      setJrs(
        (jrs) => [...jrs, jr]
      );
    };

    window.addEventListener('tradejoinrequest', listener);
    return () => { window.removeEventListener('tradejoinrequest', listener); };
  }, []);

  return jrs;
};
