import { useMyOnionHostname } from '../../hooks/useMyOnionHostname';
import { calcChatMessageTitleText } from '../../memos/calcChatMessageTitleText';
import { ReceivableMessage } from '../../types/ReceivableMessage';
import { ImageMessage, OthersReadableMessage, SendableMessage, TextMessage } from '../../types/TradeMessage';
import { TradeMessageType } from '../../types/TradeMessageType';
import { TradeMessageIcons } from './ChatMessageIcons';

interface MyTradeChatMessageProps {
  message: TextMessage | ImageMessage;
}
export const MyTradeChatMessage: React.FC<MyTradeChatMessageProps> = ({ message }) => {
  const myOnionHostname = useMyOnionHostname();
  const sender = (message as ReceivableMessage)?.sender?.hostname || myOnionHostname;
  const isSentByMe = sender === myOnionHostname;
  const ackedBy = isSentByMe && (message as SendableMessage).ackedBy;
  const readBy = (message as OthersReadableMessage).readBy;
  const { createdAt } = message;

  const ownerClassName = isSentByMe ? 'my-message' : 'others-message';
  const typeClassName = (
    (message.type === TradeMessageType.TEXT && 'text-message') ||
    (message.type === TradeMessageType.IMAGE && 'image-message')
  );
  const title = calcChatMessageTitleText({ ackedBy, readBy, createdAt, sender });

  return (
    <div
      className={`chat-message ${typeClassName} ${ownerClassName}`}
      title={title}
    >
      {message.type === TradeMessageType.TEXT && <pre>{message.payload}</pre>}
      {message.type === TradeMessageType.IMAGE && <img src={message.payload} />}
      <TradeMessageIcons readBy={readBy} ackedBy={ackedBy} />
    </div>
  );
};
