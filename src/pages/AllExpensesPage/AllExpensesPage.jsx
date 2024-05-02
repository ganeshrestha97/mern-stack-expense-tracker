import { useState, useEffect } from 'react';
import { fetchExpenses, deleteExpense, /* updateExpense */ } from '../../utilities/expense-service';

export default function AllExpensesPage() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const loadExpenses = async () => {
            const data = await fetchExpenses();
            setExpenses(data);
        };
        loadExpenses();
    }, []);
    
    const handleDelete = async (expenseId) => {
        await deleteExpense(expenseId);
        setExpenses(expenses.filter(expense => expense._id !== expenseId));
    };
    
    return (
        <div>
            <h1>All Expenses</h1>
            {expenses.map(expense => (
                <div key={expense._id}>
                    <p>{expense.category} - {expense.amount}</p>
                    <button onClick={() => handleDelete(expense._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
