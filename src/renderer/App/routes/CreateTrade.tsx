import { useState } from 'react';
import { useCreateTradeForm } from '../../hooks/useCreateTradeForm';
import { CreateTradeForm } from '../components/CreateTradeForm';
import { MyOnion } from '../components/MyOnion';
import { CreateTradePopup } from '../components/CreateTradePopup';
import { useTradeCreator } from '../../hooks/useTradeCreator';

export const CreateTrade = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const { state, dispatch } = useCreateTradeForm();
  const create = useTradeCreator();

  return (
    <>
      <CreateTradeForm
        state={state}
        dispatch={dispatch}
        onSubmit={() => { setOpenPopup(true); }}
      />
      {
        openPopup && (
          <CreateTradePopup
            onSubmit={(myXmrAddress) => { create(state, myXmrAddress); }}
            onCancel={() => { setOpenPopup(false); }}
          />
        )
      }
      <MyOnion />
    </>
  );
};
