import React from 'react';
import { Item } from '../types';

interface Props {
  items: Item[];
  onDelete: (id: string) => void;
  onEdit: (item: Item) => void;
}

const ItemTable: React.FC<Props> = ({ items, onDelete, onEdit }) => {
  if (items.length === 0) {
    return <p className="text-gray-500">No items found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">In Stock</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.category}</td>
              <td className="px-4 py-2">${item.price.toFixed(2)}</td>
              <td className="px-4 py-2">{item.inStock ? '✅' : '❌'}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;