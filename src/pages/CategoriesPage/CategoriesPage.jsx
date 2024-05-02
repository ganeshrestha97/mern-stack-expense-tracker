import { Link } from 'react-router-dom';
import { categories } from '../../data'; 
import './CategoriesPage.css';

export default function CategoriesPage() {
  return (
      <div className="categories-container">
          <h1>Categories</h1>
          <div className="category-cards">
              {categories.map((category, index) => (
                  <Link key={index} to={`/expenses/${category.toLowerCase()}`} className="category-card">
                      {category}
                  </Link>
              ))}
          </div>
      </div>
  );
}
