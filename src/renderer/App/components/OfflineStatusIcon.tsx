interface OfflineStatusIconProps {
  offline: boolean | undefined;
}
export const OfflineStatusIcon: React.FC<OfflineStatusIconProps> = ({ offline }) => (
  <>
    {
      (offline === undefined && '🔵') ||
      (offline === true && '🔴') ||
      (offline === false && '🟢')
    }
  </>
);
