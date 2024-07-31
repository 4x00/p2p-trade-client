interface TradeMessageIconsProps {
  ackedBy?: string[];
  readBy?: string[];
}
export const TradeMessageIcons: React.FC<TradeMessageIconsProps> = ({ ackedBy, readBy }) => (
  <>
    {ackedBy && ackedBy.map(() => '✅')}
    {readBy && readBy.map(() => '👁')}
  </>
);
