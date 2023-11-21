import React from 'react';

function Category({ category, setCurrentCategory }) {
  return (
    <li
      data-testid={`category-${category.name}`}
      key={category.name}
      className="category"
    >
      <button
        data-testid={`category-${category.name}-button`}
        type="button"
        style={{ backgroundColor: category.color }}
        className="btn btn-categories"
        onClick={() => {
          setCurrentCategory(category.name);
        }}
      >
        {category.name}
      </button>
    </li>
  );
}

export default Category;
