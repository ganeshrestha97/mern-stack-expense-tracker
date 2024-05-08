import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/expenses" className="navbar-item has-text-success">
          Add Expense
        </Link>
        <Link to="/all-expenses" className="navbar-item has-text-success">
          All Expenses
        </Link>
        <Link to="/categories" className="navbar-item has-text-success">
          Categories
        </Link>
      </div>
      <div className="user-info">
        <span className="user-name">Hi {user.name}</span>
        <Link to="" onClick={handleLogOut} className="logout-link">
          Log Out
        </Link>
      </div>
    </nav>
  );
}