import { useOnionOfflineStatus } from '../../hooks/useOnionOfflineStatus';
import { OfflineStatusIcon } from './OfflineStatusIcon';

interface OnionOfflineStatusProps {
  hostname: string;
}
export const OnionOfflineStatus: React.FC<OnionOfflineStatusProps> = ({ hostname }) => {
  const offline = useOnionOfflineStatus(hostname);

  return <OfflineStatusIcon offline={offline} />;
};
