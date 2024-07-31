import { MyTradeForm } from '../components/MyTradeForm';
import { useParams } from 'react-router-dom';
import { useMyTrade } from '../../hooks/useMyTrade';
import { NotFound } from '../components/NotFound';
import { PartyOnions } from '../components/PartyOnions';
import { MyTradeChat } from '../components/MyTradeChat';
import { useTradeChat } from '../../hooks/useTradeChat';
import { useTradeReader } from '../../hooks/useTradeReader';

export const MyTrade = () => {
  const { id } = useParams();
  const trade = useMyTrade(id);
  const chat = useTradeChat();
  useTradeReader(id);

  if (!trade) {
    return <NotFound />;
  }

  return (
    <>
      <MyTradeForm trade={trade}>
        <MyTradeChat
          trade={trade}
          onSendText={(text) => { chat.sendText(id, text); }}
          onSendImage={(image) => { chat.sendImage(id, image); }}
        />
      </MyTradeForm>

      <PartyOnions trade={trade}/>
    </>
  );
};
