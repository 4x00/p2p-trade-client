import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MyTrades } from './routes/MyTrades/MyTrades';
import { JoinTrade } from './routes/JoinTrade/JoinTrade';
import { CreateTrade } from './routes/CreateTrade';
import { MyTrade } from './routes/MyTrade';

export interface MyRouterProps {
  children: React.ReactNode;
}
export const Router = ({ children }: MyRouterProps) => (
  <MemoryRouter initialEntries={['/create-trade']}>
    {children}

    <Routes>
      <Route path="/create-trade" element={<CreateTrade />} />
      <Route path="/join-trade" element={<JoinTrade />} />
      <Route path="/my-trades" element={<MyTrades />} />
      <Route path="/my-trades/:id" element={<MyTrade />} />
    </Routes>
  </MemoryRouter>
);
