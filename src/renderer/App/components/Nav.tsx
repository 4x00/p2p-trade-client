import { Link } from 'react-router-dom';

export const Nav = () => (
  <div id="nav">
    <div>
      <Link to="/create-trade">Create trade</Link>{' | '}
      <Link to="/join-trade">Join trade</Link>{' | '}
      <Link to="/my-trades">My trades</Link>
    </div>

    <hr />
  </div>
);
