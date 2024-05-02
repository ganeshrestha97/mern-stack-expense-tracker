import React, { useState, useEffect } from 'react';
import { fetchCategories, addCategory, deleteCategory, updateCategory } from '../../utilities/category-service';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editStates, setEditStates] = useState({});

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  const handleAddCategory = async () => {
    await addCategory({ name: newCategoryName });
    loadCategories();
    setNewCategoryName(''); // Reset input field
  };

  const handleDeleteCategory = async (categoryId) => {
    await deleteCategory(categoryId);
    loadCategories();
  };

  const handleUpdateCategory = async (categoryId) => {
    const newName = editStates[categoryId];
    await updateCategory(categoryId, { name: newName });
    loadCategories();
    setEditStates(prev => ({ ...prev, [categoryId]: undefined })); // Clear edit state
  };

  return (
    <div>
      <h1>Categories</h1>
      <input
        value={newCategoryName}
        onChange={e => setNewCategoryName(e.target.value)}
        placeholder="Enter new category name"
      />
      <button onClick={handleAddCategory}>Add Category</button>
      {categories.map(category => (
        <div key={category._id}>
          {editStates[category._id] ? (
            <input
              value={editStates[category._id]}
              onChange={e => setEditStates(prev => ({ ...prev, [category._id]: e.target.value }))}
            />
          ) : (
            <span>{category.name}</span>
          )}
          <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
          {editStates[category._id] ? (
            <button onClick={() => handleUpdateCategory(category._id)}>Save</button>
          ) : (
            <button onClick={() => setEditStates(prev => ({ ...prev, [category._id]: category.name }))}>Edit</button>
          )}
        </div>
      ))}
    </div>
  );
}
