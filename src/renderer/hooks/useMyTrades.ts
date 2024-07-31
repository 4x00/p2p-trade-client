import { useSelector } from 'react-redux';
import { selectMyTrades } from '../redux/appSelectors';

export const useMyTrades = () => useSelector(selectMyTrades);
