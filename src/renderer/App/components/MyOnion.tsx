import { useMyOnionHostname } from '../../hooks/useMyOnionHostname';
import { OnionOfflineStatus } from './OnionOfflineStatus';

export const MyOnion = () => {
  const myOnionHostname = useMyOnionHostname();

  return (
    <div id="myOnion">
      My onion: {myOnionHostname} <OnionOfflineStatus hostname={myOnionHostname}/>
    </div>
  );
};
