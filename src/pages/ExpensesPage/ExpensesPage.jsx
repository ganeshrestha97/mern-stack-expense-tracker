import { useState, useEffect } from 'react';
import { fetchExpenses, addExpense, deleteExpense, updateExpense } from '../../utilities/expense-service';
import { categories } from '../../data';
import { subCategories } from '../../data';
import { fetchCategories } from '../../utilities/category-service';
import { fetchSubCategories } from '../../utilities/subCategory-service';

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]); // State for categories
    const [subCategories, setSubCategories] = useState([]);
    const [newExpense, setNewExpense] = useState({
        category: '',
        subCategory: '',
        amount: '',
        description: '',
        date: ''
    });

    useEffect(() => {
        loadExpenses();
        loadCategories(); // Add this to also load categories on component mount
        loadSubCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const loadSubCategories = async () => {
        const data = await fetchSubCategories();
        setSubCategories(data);
    };

    const loadExpenses = async () => {
        const data = await fetchExpenses();
        setExpenses(data);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewExpense(prevState => ({
            ...prevState,
            [name]: value,
            ...(name === 'category' && { subCategory: '' })
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addExpense(newExpense);
        loadExpenses();
        setNewExpense({ category: '', subCategory: '', amount: '', description: '', date: '' }); // Reset form
    };

    const handleDelete = async (id) => {
        await deleteExpense(id);
        loadExpenses();
    };

    const handleUpdate = async (id, updatedFields) => {
        await updateExpense(id, updatedFields);
        loadExpenses();
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
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
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
                        {subCategories
                            .filter(sc => sc.category === newExpense.category)
                            .map((sc) => (
                                <option key={sc._id} value={sc._id}>{sc.name}</option>
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
                <button type="submit">Add Expense</button>
            </form>

            {expenses.map(expense => (
                <div key={expense._id}>
                    <div>{expense.category} - {expense.subCategory}: ${expense.amount} on {new Date(expense.date).toLocaleDateString()}</div>
                    <button onClick={() => handleDelete(expense._id)}>Delete</button>
                    <button onClick={() => handleUpdate(expense._id, { amount: 123 })}>Update Amount</button>
                </div>
            ))}
        </div>
    );
}
