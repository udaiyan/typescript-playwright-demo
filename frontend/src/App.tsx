import React, { useEffect, useState } from 'react';
import { getItems, createItem, deleteItem, updateItem } from './api/client';
import { Item } from './types';
import ItemTable from './components/ItemTable';
import CategoryFilter from './components/CategoryFilter';
import AddItemForm from './components/AddItemForm';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchItems = async () => {
    try {
      const res = await getItems();
      setItems(res.data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const categories = ['All', ...new Set(items.map((i) => i.category))];

  const filteredItems =
    filter === 'All' ? items : items.filter((i) => i.category === filter);

  const handleAdd = async (newItem: Omit<Item, 'id'>) => {
    try {
      const res = await createItem(newItem);
      setItems((prev) => [...prev, res.data]);
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleEdit = async (updated: Item) => {
    try {
      const res = await updateItem(updated.id, updated);
      setItems((prev) => prev.map((i) => (i.id === updated.id ? res.data : i)));
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
      <AddItemForm onAdd={handleAdd} />
      <CategoryFilter
        categories={categories}
        selected={filter}
        onChange={setFilter}
      />
      <ItemTable items={filteredItems} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default App;