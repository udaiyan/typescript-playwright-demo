import React from 'react';

interface Props {
  categories: string[];
  selected: string;
  onChange: (cat: string) => void;
}

const CategoryFilter: React.FC<Props> = ({ categories, selected, onChange }) => {
  return (
    <div className="mb-4">
      <label className="mr-2 font-semibold">Filter by Category:</label>
      <select
        className="border rounded px-3 py-1"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="All">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;