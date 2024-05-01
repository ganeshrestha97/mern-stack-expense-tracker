import { useState, useEffect } from 'react';
import { fetchCategories, addCategory, deleteCategory, updateCategory } from '../../utilities/category-service';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [editedCategoryName, setEditedCategoryName] = useState('');

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const data = await fetchCategories();
        setCategories(data);
    };

    const handleAddCategory = async () => {
        if (newCategory.trim() !== '') {
            await addCategory({ name: newCategory });
            setNewCategory('');
            loadCategories();
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        await deleteCategory(categoryId);
        loadCategories();
    };

    const handleUpdateCategory = async (categoryId) => {
        if (editedCategoryName.trim() !== '') {
            await updateCategory(categoryId, { name: editedCategoryName });
            setEditingCategory(null);
            setEditedCategoryName('');
            loadCategories();
        }
    };



    return (
        <div>
            <h1>Categories</h1>
            <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
            />
            <button onClick={handleAddCategory}>Add Category</button>
            {categories.map((category) => (
                <div key={category._id}>
                    {editingCategory === category._id ? (
                        <>
                            <input
                                type="text"
                                value={editedCategoryName}
                                onChange={(e) => setEditedCategoryName(e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            {category.name}
                            <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                            <button onClick={() => handleUpdateCategory(category._id)}>Edit</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}