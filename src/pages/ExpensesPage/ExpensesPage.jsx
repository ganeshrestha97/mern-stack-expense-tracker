import React, { useState, useEffect } from 'react';
import { fetchExpenses, addExpense, deleteExpense, updateExpense } from '../../utilities/expense-service';

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({
        category: '',
        subCategory: '',
        amount: '',
        description: '',
        date: ''
    });

    const categories = [
        "Travel", "Clothing", "Essentials", "Daily", "Utilities",
        "Entertainment", "Education", "Health", "Gifts and Donations", "Miscellaneous"
    ];

    const subCategories = {
        Travel: ["Flights", "Lodging", "Food", "Transport", "Entertainment", "Shopping"],
        Clothing: ["Casual Wear", "Formal Wear", "Sportswear", "Accessories", "Footwear"],
        Essentials: ["Groceries", "Household Items", "Personal Care", "Health and Wellness(meds, supplements)"],
        Daily: ["Dining Out", "Coffee and Snacks", "Public Transport", "Parking Fees", "Gas"],
        Utilities: ["Electricity", "Water", "Internet", "Moile Phone", "Cable TV"],
        Entertainment: ["Movies and Shows", "Books and Magazine", "Games", "Events(concerts, sports)", "Night Out"],
        Education: ["Tuition Fees", "School Supplies", "Online Courses", "Books"],
        Health: ["Doctor Visits", "Medications", "Gym Membership", "Therapy"],
        Gifts: ["Charitable Donations", "Gifts for Others", "Parties and Celebrations"],
        Miscellaneous: ["Pet Expenses", "Home Repairs", "Furniture"],
    }


    useEffect(() => {
        loadExpenses();
    }, []);

    const loadExpenses = async () => {
        const data = await fetchExpenses();
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
