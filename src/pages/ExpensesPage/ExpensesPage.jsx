import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchExpenses, addExpense, deleteExpense, updateExpense } from '../../utilities/expense-service';
import { subCategories } from '../../data';


export default function ExpensesPage() {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({
        category: '',
        subCategory: '',
        amount: '',
        description: '',
        date: '',
        isEditing: false,
        editingId: null
    });

    const { category } = useParams();

    useEffect(() => {
        const loadExpenses = async () => {
            const data = await fetchExpenses(category);
            setExpenses(data);
        };
    
        loadExpenses();
    }, [category]);

    const loadExpenses = async () => {
        const data = await fetchExpenses(category);
        setExpenses(data);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewExpense(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'category' && { subCategory: '' })  // Reset subCategory when category changes
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const expenseData = { ...newExpense };
            expenseData.date = new Date(newExpense.date + 'T00:00:00').toISOString(); // Convert date to ISO format
    
            if (newExpense.isEditing) {
                await updateExpense(newExpense.editingId, expenseData);
            } else {
                await addExpense(expenseData);
            }
            loadExpenses();
            setNewExpense({ category: '', subCategory: '', amount: '', description: '', date: '', isEditing: false, editingId: null }); // Reset form
        } catch (error) {
            console.error('Failed to add/update expense:', error.message);
        }
    };

    const handleDelete = async (id) => {
        await deleteExpense(id);
        loadExpenses();
    };

    const handleEdit = (expense) => {
        setNewExpense({
            category: expense.category,
            subCategory: expense.subCategory,
            amount: expense.amount,
            description: expense.description,
            date: expense.date.split('T')[0], // Adjust date format for input[type="date"]
            isEditing: true,
            editingId: expense._id
        });
    };

    return (
        <div>
            <h1>Expenses</h1>
            <form onSubmit={handleSubmit}>
                <select
                    name="category"
                    value={newExpense.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a Category</option>
                    {Object.keys(subCategories).map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>

                {newExpense.category && (
                    <select
                        name="subCategory"
                        value={newExpense.subCategory}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Subcategory</option>
                        {subCategories[newExpense.category].map((subCategory, index) => (
                            <option key={index} value={subCategory}>{subCategory}</option>
                        ))}
                    </select>
                )}

                <input
                    type="number"
                    name="amount"
                    value={newExpense.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={newExpense.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <input
                    type="date"
                    name="date"
                    value={newExpense.date}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{newExpense.isEditing ? 'Update' : 'Add Expense'}</button>
            </form>

            {expenses.map(expense => (
                <div key={expense._id}>
                    <div>
                        <strong>{expense.category} :</strong> {expense.subCategory} - {expense.description} <strong>${expense.amount}</strong> on {new Date(expense.date).toLocaleDateString()}
                        <button onClick={() => handleEdit(expense)}>Edit</button>
                        <button onClick={() => handleDelete(expense._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
