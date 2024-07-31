const shortenOnion = (onion: string) => (
  `${onion.slice(0, 12)}...${onion.slice(56 - 12, 56)}.onion`
);

type CalcChatMessageTitleText = (arg: {
  ackedBy?: string[];
  readBy?: string[];
  sender: string;
  createdAt: string;
}) => string;
export const calcChatMessageTitleText: CalcChatMessageTitleText = ({ createdAt, sender, ackedBy, readBy }) => (
  [
    `Created at: ${createdAt}`,
    `Created by: ${shortenOnion(sender)}`,
    ...(
      ackedBy
        ? ackedBy.map((acker) => `Received by: ${shortenOnion(acker)}`)
        : []
    ),
    ...(
      readBy
        ? readBy.map((reader) => `Read by: ${shortenOnion(reader)}`)
        : []
    ),
  ].join('\n')
);
