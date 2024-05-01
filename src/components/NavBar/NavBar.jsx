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
      <Link to="/expenses">Add Expense</Link>
      &nbsp; | &nbsp;     
      <Link to="/categories">Categories</Link>
      &nbsp; | &nbsp;     
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}