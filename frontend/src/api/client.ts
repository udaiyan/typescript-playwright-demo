import axios from 'axios';
import { Item } from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const getItems = () => api.get<Item[]>('/items');
export const getItem = (id: string) => api.get<Item>(`/items/${id}`);
export const createItem = (item: Omit<Item, 'id'>) => api.post<Item>('/items', item);
export const updateItem = (id: string, item: Partial<Item>) => api.put<Item>(`/items/${id}`, item);
export const deleteItem = (id: string) => api.delete(`/items/${id}`);