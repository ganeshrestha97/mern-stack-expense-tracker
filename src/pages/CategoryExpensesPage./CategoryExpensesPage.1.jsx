import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchExpenses, deleteExpense, updateExpense } from '../../utilities/expense-service';
import { subCategories } from '../../data';
import { groupExpensesByMonth } from './CategoryExpensesPage';


export default function CategoryExpensesPage() {
    const [expenses, setExpenses] = useState([]);
    const [editExpenseId, setEditExpenseId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        category: '',
        subCategory: '',
        amount: '',
        description: '',
        date: ''
    });
    const { category } = useParams();

    useEffect(() => {
        const loadExpenses = async () => {
            const data = await fetchExpenses(category);
            setExpenses(data);
        };
        loadExpenses();
    }, [category]);

    const handleDelete = async (expenseId) => {
        await deleteExpense(expenseId);
        setExpenses(expenses.filter(expense => expense._id !== expenseId));
    };

    const handleEdit = (expense) => {
        const localDate = new Date(expense.date).toLocaleDateString('en-CA'); // Formats to 'YYYY-MM-DD'
        setEditExpenseId(expense._id);
        setEditFormData({
            category: expense.category,
            subCategory: expense.subCategory,
            amount: expense.amount,
            description: expense.description,
            date: localDate // Use the adjusted date
        });
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const updatedExpenseData = {
            ...editFormData,
            date: new Date(editFormData.date + 'T00:00:00').toISOString() // Convert to ISO format with time
        };

        try {
            await updateExpense(editExpenseId, updatedExpenseData);
            const updatedExpenses = await fetchExpenses(category);
            setExpenses(updatedExpenses);
            setEditExpenseId(null);
        } catch (error) {
            console.error('Failed to update expense:', error.message);
        }
    };

    return (
        <div>
            <h1>Expenses for {category}</h1>
            {Object.entries(groupExpensesByMonth(expenses)).map(([monthYear, { expenses: monthExpenses, total }]) => (
                <div key={monthYear}>
                    <h2>{monthYear} - Total: ${total.toFixed(2)}</h2>
                    {monthExpenses.map((expense) => (
                        <div key={expense._id}>
                            {editExpenseId === expense._id ? (
                                <form onSubmit={handleUpdate}>
                                    <select name="category" value={editFormData.category} onChange={handleChange} required>
                                        <option value="">Select a Category</option>
                                        {Object.keys(subCategories).map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    {editFormData.category && (
                                        <select name="subCategory" value={editFormData.subCategory} onChange={handleChange} required>
                                            <option value="">Select a Subcategory</option>
                                            {subCategories[editFormData.category].map((subCategory, index) => (
                                                <option key={index} value={subCategory}>{subCategory}</option>
                                            ))}
                                        </select>
                                    )}
                                    <input type="number" name="amount" value={editFormData.amount} onChange={handleChange} placeholder="Amount" required />
                                    <input type="text" name="description" value={editFormData.description} onChange={handleChange} placeholder="Description" />
                                    <input type="date" name="date" value={editFormData.date} onChange={handleChange} required />
                                    <button type="submit">Update</button>
                                </form>
                            ) : (
                                <p>
                                    <strong>{expense.category} :</strong> {expense.subCategory} - {expense.description} <strong>${expense.amount}</strong> on {new Date(expense.date).toLocaleDateString()}
                                    <button onClick={() => handleEdit(expense)}>Edit</button>
                                    <button onClick={() => handleDelete(expense._id)}>Delete</button>
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
