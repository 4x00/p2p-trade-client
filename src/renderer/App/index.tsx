import { Nav } from './components/Nav';
import { JoinRequests } from './JoinRequests';
import { Router } from './Router';

export const App = () => (
  <Router>
    <Nav />
    <JoinRequests />
  </Router>
);
