import { useNavigate } from 'react-router-dom';

export const useNavigateToMyTrade = (id: string) => {
  const navigate = useNavigate();
  return () => { navigate(`/my-trades/${id}`); };
};
