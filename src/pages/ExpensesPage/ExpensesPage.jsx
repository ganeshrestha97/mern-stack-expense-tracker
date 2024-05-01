import { useState, useEffect } from 'react';
import * as expensesService from '../../utilities/expenses-service';

export default function ExpensesPage({ user }) {
    const [expenses, setExpenses] = useState([]);
  
    useEffect(() => {
      async function getExpenses() {
        const expenseData = await expensesService.getAll(user._id);
        setExpenses(expenseData);
      }
      getExpenses();
    }, [user._id]);
  
    return (
      <div>
        <h1>Expenses Page</h1>
        <ul>
          {expenses.map(expense => (
            <li key={expense._id}>
              <div>Category: {expense.subcategory.category.name}</div>
              <div>Subcategory: {expense.subcategory.name}</div>
              <div>Amount: {expense.amount}</div>
              <div>Description: {expense.description}</div>
              <div>Date: {new Date(expense.date).toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }