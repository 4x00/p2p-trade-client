import { Loading } from '../../components/Loading';

import { MyOnion } from '../../components/MyOnion';
import { JoinTradeSearch } from '../../components/JoinTradeSearch';
import { useTradeQuerier } from '../../../hooks/useTradeQuerier';
import { QueryResult } from './QueryResult';
import { NotFound } from '../../components/NotFound';

export const JoinTrade = () => {
  const querier = useTradeQuerier();

  return (
    <>
      <JoinTradeSearch
        onSubmit={(url) => { querier.query(url); }}
        disabled={querier.loading}
      />

      {querier.loading && <Loading />}
      {
        querier.result === null
          ? <NotFound />
          : <QueryResult querier={querier} />
      }

      <MyOnion />
    </>
  );
};

// FUTURE: querier.result can return false to mean that no trade was found and null should be reserved to mean any sort of error
// TODO: implement <Error /> aka <QueryResultError /> as right now not found is shown for errors as well as not found cases
