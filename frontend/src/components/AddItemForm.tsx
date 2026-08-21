import React, { useState } from 'react';
import { Item } from '../types';

interface Props {
  onAdd: (item: Omit<Item, 'id'>) => void;
}

const AddItemForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [inStock, setInStock] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !price) return;
    onAdd({
      name,
      category,
      price: parseFloat(price),
      inStock,
    });
    setName('');
    setCategory('');
    setPrice('');
    setInStock(true);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-4 items-end">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-1"
          data-testid="name-input"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-1"
          data-testid="category-input"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded px-3 py-1"
          data-testid="price-input"
          required
        />
      </div>
      <div className="flex items-center">
        <label className="mr-2 text-sm font-medium">In Stock</label>
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => setInStock(e.target.checked)}
          className="h-5 w-5"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;