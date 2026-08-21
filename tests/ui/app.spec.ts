import { test, expect } from '@playwright/test';

test.describe('UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the page title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Inventory Management');
  });

  test('should load items in the table', async ({ page }) => {
    await expect(page.locator('table tbody tr')).toHaveCount(5);
  });

  test('should filter items by category', async ({ page }) => {
    await page.selectOption('select', 'Electronics');
    await expect(page.locator('table tbody tr')).toHaveCount(2); // Laptop, Smartphone
  });

  test('should add a new item', async ({ page }) => {
    await page.fill('input[placeholder="Name"]', 'Test Item');
    await page.fill('input[placeholder="Category"]', 'Test Category');
    await page.fill('input[placeholder="Price"]', '19.99');
    await page.click('button:has-text("Add Item")');
    await expect(page.locator('table tbody tr')).toHaveCount(6);
    await expect(page.locator('table tbody tr:last-child')).toContainText('Test Item');
  });

  test('should delete an item', async ({ page }) => {
    const initialCount = await page.locator('table tbody tr').count();
    await page.locator('table tbody tr:first-child button:has-text("Delete")').click();
    await expect(page.locator('table tbody tr')).toHaveCount(initialCount - 1);
  });
});