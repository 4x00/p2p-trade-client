import { Trade } from '../../types/Trade';
import { ImageMessage, TextMessage } from '../../types/TradeMessage';
import { TradeMessageType } from '../../types/TradeMessageType';
import { MyTradeChatMessage } from './MyTradeChatMessage';

interface MyTradeChatMessagesProps {
  trade: Trade;
}
export const MyTradeChatMessages: React.FC<MyTradeChatMessagesProps> = ({ trade }) => (
  <>
      <div id='myTradeChatMessages'>
        {
          trade
            .chat
            .filter((message) => (
              [TradeMessageType.TEXT, TradeMessageType.IMAGE].includes(message.type)
            ))
            .map((message: TextMessage | ImageMessage) => (
              <MyTradeChatMessage key={message.id} message={message} />
            ))
        }
      </div>
  </>
);
