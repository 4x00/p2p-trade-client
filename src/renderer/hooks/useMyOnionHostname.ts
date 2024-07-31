import { useSelector } from 'react-redux';
import { selectMyOnionHostname } from '../redux/appSelectors';

export const useMyOnionHostname = () => useSelector(selectMyOnionHostname);
