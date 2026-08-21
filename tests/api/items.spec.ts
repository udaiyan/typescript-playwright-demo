import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  const baseURL = 'http://localhost:5000/api';

  test('GET /items should return all items', async ({ request }) => {
    const response = await request.get(`${baseURL}/items`);
    expect(response.status()).toBe(200);
    const items = await response.json();
    expect(items.length).toBeGreaterThan(0);
  });

  test('POST /items should create a new item', async ({ request }) => {
    const newItem = {
      name: 'API Test Item',
      category: 'Test',
      price: 42.0,
      inStock: true,
    };
    const response = await request.post(`${baseURL}/items`, { data: newItem });
    expect(response.status()).toBe(201);
    const created = await response.json();
    expect(created).toMatchObject(newItem);
    expect(created.id).toBeDefined();
  });

  test('PUT /items/:id should update an item', async ({ request }) => {
    // First create an item
    const createRes = await request.post(`${baseURL}/items`, {
      data: { name: 'To Update', category: 'Test', price: 10, inStock: true },
    });
    const created = await createRes.json();

    const updatedData = { name: 'Updated Name', price: 20 };
    const putRes = await request.put(`${baseURL}/items/${created.id}`, {
      data: updatedData,
    });
    expect(putRes.status()).toBe(200);
    const updated = await putRes.json();
    expect(updated.name).toBe('Updated Name');
    expect(updated.price).toBe(20);
  });

  test('DELETE /items/:id should delete an item', async ({ request }) => {
    // Create
    const createRes = await request.post(`${baseURL}/items`, {
      data: { name: 'To Delete', category: 'Test', price: 5, inStock: false },
    });
    const created = await createRes.json();

    const delRes = await request.delete(`${baseURL}/items/${created.id}`);
    expect(delRes.status()).toBe(204);

    // Verify it's gone
    const getRes = await request.get(`${baseURL}/items/${created.id}`);
    expect(getRes.status()).toBe(404);
  });
});