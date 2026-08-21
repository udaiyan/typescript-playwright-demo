import { Request, Response } from 'express';
import { items } from '../data/items';
import { Item } from '../models/item';
import { v4 as uuidv4 } from 'uuid';
import { items as initialItems } from '../data/items';

export const resetItems = (req: Request, res: Response) => {
  // Clear the array and repopulate with initial data
  items.length = 0;
  items.push(...initialItems);
  res.status(200).json({ message: 'Data reset' });
};

// GET /api/items
export const getItems = (req: Request, res: Response) => {
  res.json(items);
};

// GET /api/items/:id
export const getItemById = (req: Request, res: Response) => {
  const { id } = req.params;
  const item = items.find((i) => i.id === id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
};

// POST /api/items
export const createItem = (req: Request, res: Response) => {
  const { name, category, price, inStock } = req.body;
  if (!name || !category || price === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newItem: Item = {
    id: uuidv4(),
    name,
    category,
    price: Number(price),
    inStock: inStock !== undefined ? Boolean(inStock) : true,
  };
  items.push(newItem);
  res.status(201).json(newItem);
};

// PUT /api/items/:id
export const updateItem = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category, price, inStock } = req.body;
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  const updated = { ...items[index] };
  if (name !== undefined) updated.name = name;
  if (category !== undefined) updated.category = category;
  if (price !== undefined) updated.price = Number(price);
  if (inStock !== undefined) updated.inStock = Boolean(inStock);
  items[index] = updated;
  res.json(updated);
};

// DELETE /api/items/:id
export const deleteItem = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  items.splice(index, 1);
  res.status(204).send();
};