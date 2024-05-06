import { useState, useEffect } from 'react';
import { fetchExpenses, deleteExpense, updateExpense } from '../../utilities/expense-service';

export default function AllExpensesPage() {
    const [expenses, setExpenses] = useState([]);
    const [editExpenseId, setEditExpenseId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        category: '',
        subCategory: '',
        amount: '',
        description: '',
        date: ''
    });
    const [selectedSortOption, setSelectedSortOption] = useState('date');
    const [selectedOrderOption, setSelectedOrderOption] = useState('asc');

    const sortByDate = (a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return selectedOrderOption === 'asc' ? dateA - dateB : dateB - dateA;
    };

    const sortByCategory = (a, b) => {
        const categoryA = a.category.toLowerCase();
        const categoryB = b.category.toLowerCase();
        if (categoryA < categoryB) return selectedOrderOption === 'asc' ? -1 : 1;
        if (categoryA > categoryB) return selectedOrderOption === 'asc' ? 1 : -1;
        return 0;
    };

    useEffect(() => {
        const loadExpenses = async () => {
            const data = await fetchExpenses();
            const sortedData = data.sort(selectedSortOption === 'date' ? sortByDate : sortByCategory);
            setExpenses(sortedData);
        };
        loadExpenses();
    }, [selectedSortOption, selectedOrderOption]);

    const handleDelete = async (expenseId) => {
        await deleteExpense(expenseId);
        setExpenses(expenses.filter(expense => expense._id !== expenseId));
    };

    const handleEdit = (expense) => {
        setEditExpenseId(expense._id);
        setEditFormData({
            category: expense.category,
            subCategory: expense.subCategory,
            amount: expense.amount,
            description: expense.description,
            date: expense.date.split('T')[0] // adjust the date format if necessary
        });
    };

    const handleCancel = () => {
        setEditExpenseId(null);
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
        await updateExpense(editExpenseId, editFormData);
        const updatedExpenses = expenses.map(expense =>
            expense._id === editExpenseId ? { ...expense, ...editFormData } : expense
        );
        setExpenses(updatedExpenses);
        setEditExpenseId(null);
    };

    return (

        <div>
            <h1>All Expenses</h1>
            <div>
                <select value={selectedSortOption} onChange={(e) => setSelectedSortOption(e.target.value)}>
                    <option value="date">Sort by Date</option>
                    <option value="category">Sort by Category</option>
                </select>
                <select value={selectedOrderOption} onChange={(e) => setSelectedOrderOption(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            {expenses.map(expense => (
                <div key={expense._id}>
                    {editExpenseId === expense._id ? (
                        <form onSubmit={handleUpdate}>
                            <input
                                type="text"
                                name="category"
                                value={editFormData.category}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="subCategory"
                                value={editFormData.subCategory}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="amount"
                                value={editFormData.amount}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="description"
                                value={editFormData.description}
                                onChange={handleChange}
                            />
                            <input
                                type="date"
                                name="date"
                                value={editFormData.date}
                                onChange={handleChange}
                            />
                            <button type="submit">Update</button>
                            <button type="button" onClick={handleCancel}>Cancel</button>
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
    );
}
