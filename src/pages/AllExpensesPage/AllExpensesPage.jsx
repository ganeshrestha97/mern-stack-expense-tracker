import { useState, useEffect } from 'react';
import { fetchExpenses, deleteExpense, updateExpense } from '../../utilities/expense-service';
import { subCategories } from '../../data';


const groupExpensesByMonth = (expenses) => {
    const groupedExpenses = {};

    expenses.forEach((expense) => {
        const date = new Date(expense.date);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const monthYear = `${month} ${year}`;

        if (!groupedExpenses[monthYear]) {
            groupedExpenses[monthYear] = { expenses: [], total: 0 };
        }

        groupedExpenses[monthYear].expenses.push(expense);
        groupedExpenses[monthYear].total += expense.amount;
    });

    const sortedGroupedExpenses = Object.entries(groupedExpenses)
        .sort((a, b) => {
            const [monthYearB, monthYearA] = [b[0].split(' '), a[0].split(' ')];
            const yearA = parseInt(monthYearA[1], 10);
            const yearB = parseInt(monthYearB[1], 10);
            const monthA = new Date(Date.parse(`${monthYearA[0]} 1, ${yearA}`)).getMonth();
            const monthB = new Date(Date.parse(`${monthYearB[0]} 1, ${yearB}`)).getMonth();
            return yearB - yearA || monthB - monthA;
        });

    return Object.fromEntries(sortedGroupedExpenses);
};

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

    const sortByDate = (a, b) => new Date(b.date) - new Date(a.date);
    const sortByCategory = (a, b) => b.category.localeCompare(a.category);

    useEffect(() => {
        const loadExpenses = async () => {
            const data = await fetchExpenses();
            const sortedData = data.sort(selectedSortOption === 'date' ? sortByDate : sortByCategory);
            setExpenses(sortedData);
        };
        loadExpenses();
    }, [selectedSortOption]);

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
            date: expense.date.split('T')[0]
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
        try {
            const updatedExpenseData = { ...editFormData };
            updatedExpenseData.date = new Date(editFormData.date + 'T00:00:00').toISOString(); // Ensure the date format is ISO
    
            await updateExpense(editExpenseId, updatedExpenseData);
            const updatedExpenses = await fetchExpenses();
            const sortedUpdatedExpenses = updatedExpenses.sort(selectedSortOption === 'date' ? sortByDate : sortByCategory); // Sort expenses after update
            setExpenses(sortedUpdatedExpenses);
            setEditExpenseId(null);
        } catch (error) {
            console.error('Failed to update expense:', error.message);
        }
    };

    return (
        <div>
            <h1>All Expenses</h1>
            <div>
                <select value={selectedSortOption} onChange={(e) => setSelectedSortOption(e.target.value)}>
                    <option value="date">Sort by Date</option>
                    <option value="category">Sort by Category</option>
                </select>
            </div>
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