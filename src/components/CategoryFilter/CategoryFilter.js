import React from 'react';
import CATEGORIES from '../../Categories';
import Category from '../Category/Category';

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside data-testid="category-menu">
      <ul data-testid="categories-list">
        <li data-testid="category-all" className="category">
          <button
            type="button"
            data-testid="category-all-button"
            className="btn btn-all-categories"
            onClick={() => {
              setCurrentCategory('all');
            }}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((category) => (
          <Category
            key={category.name}
            category={category}
            setCurrentCategory={setCurrentCategory}
          />
        ))}
      </ul>
    </aside>
  );
}

export default CategoryFilter;
