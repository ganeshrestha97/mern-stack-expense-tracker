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


export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
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
    </main>
    
  );
}
