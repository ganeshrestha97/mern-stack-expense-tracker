import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import CategoriesPage from '../CategoriesPage/CategoriesPage';
import ExpensesPage from '../ExpensesPage/ExpensesPage';
import AllExpensesPage from '../AllExpensesPage/AllExpensesPage';
import CategoryExpensesPage from '../CategoryExpensesPage/CategoryExpensesPage';
import li from '../../components/Logo/GaneshLI.png';
import gh from '../../components/Logo/GaneshGitHub.png';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <div className="App">
      {user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path='/' element={<AllExpensesPage />} />
            <Route path='/categories' element={<CategoriesPage />} />
            <Route path='/expenses' element={<ExpensesPage />} />
            <Route path='/all-expenses' element={<AllExpensesPage />} />
            <Route path='/expenses/category/:category' element={<CategoryExpensesPage />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
      <footer>
        <div className="col s3 left-align">
          © 2024 $$ tracker
          <a href="https://www.linkedin.com/in/ganeshrestha/">
            <img src={li} alt="LinkedIn Profile" />
          </a>
          <a href="https://github.com/ganeshrestha97">
            <img src={gh} alt="GitHub Profile" />
          </a>
        </div>
      </footer>
    </div>
  );
}
