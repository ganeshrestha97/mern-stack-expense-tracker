import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchExpenses } from '../../utilities/expense-service';

export default function CategoryExpensesPage() {
    const [expenses, setExpenses] = useState([]);
    const { category } = useParams();

    useEffect(() => {
        const loadExpenses = async () => {
          const data = await fetchExpenses(category);
          setExpenses(data);
        };
        loadExpenses();
      }, [category]);

    return (
        <div>
            <h1>Expenses for {category}</h1>
            {expenses.length > 0 ? (
                expenses.map(expense => (
                    <div key={expense._id}>
                        <p>
                            <strong>{expense.category}:</strong> {expense.subCategory} - {expense.description}
                            <strong> ${expense.amount}</strong> on {new Date(expense.date).toLocaleDateString()}
                        </p>
                    </div>
                ))
            ) : (
                <p>No expenses found for this category.</p>
            )}
        </div>
    );
}
