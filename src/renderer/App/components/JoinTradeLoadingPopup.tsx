import { Loading } from './Loading';
import { Popup } from './Popup';

export const JoinTradeLoadingPopup = (
  () => (
    <Popup>
      <div id="joinTradePopup">
        <Loading />
      </div>
    </Popup>
  )
);
