import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <span>Hi <strong>{user.name}</strong>!</span>
      <br />
      <br />
      &nbsp;&nbsp;
      <Link to="/expenses">Expenses</Link>
      &nbsp; | &nbsp;
      <Link to="/profile">Profile</Link>
      &nbsp; | &nbsp;      
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}