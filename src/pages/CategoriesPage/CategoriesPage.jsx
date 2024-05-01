import React, { useState, useEffect } from 'react';
import { fetchCategories, addCategory, deleteCategory, updateCategory } from '../../utilities/category-service';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  const handleAddCategory = async (categoryName) => {
    await addCategory({ name: categoryName });
    loadCategories();
  };

  const handleDeleteCategory = async (categoryId) => {
    await deleteCategory(categoryId);
    loadCategories();
  };

  const handleUpdateCategory = async (categoryId, newName) => {
    await updateCategory(categoryId, { name: newName });
    loadCategories();
  };

  return (
    <div>
      <h1>Categories</h1>
      {categories.map(category => (
        <div key={category._id}>
          {category.name}
          <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
          <button onClick={() => handleUpdateCategory(category._id, 'New Name')}>Update</button>
        </div>
      ))}
      <button onClick={() => handleAddCategory('New Category')}>Add Category</button>
    </div>
  );
}
