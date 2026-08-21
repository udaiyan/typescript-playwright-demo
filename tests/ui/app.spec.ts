import { test, expect } from '@playwright/test';

const FRONTEND_URL = 'http://localhost:3000';

test.describe('UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(FRONTEND_URL);
    // Wait until at least one row appears in the table
    await page.waitForFunction(
      () => document.querySelectorAll('table tbody tr').length > 0,
      { timeout: 10000 }
    );
  });

  test('should display the page title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Inventory Management');
  });

  test('should load items in the table', async ({ page }) => {
    const rows = page.locator('table tbody tr');
    // We expect at least 1 row; let's check it's > 0
    await expect(rows).not.toHaveCount(0);
  });

  test('should filter items by category', async ({ page }) => {
    const initialCount = await page.locator('table tbody tr').count();
    await page.selectOption('select', 'Electronics');
    // After filtering, there should be fewer rows (or at least not the same)
    await expect(page.locator('table tbody tr')).not.toHaveCount(initialCount);
    // More specifically, we know there are 2 Electronics items
    await expect(page.locator('table tbody tr')).toHaveCount(2);
  });

  test('should add a new item', async ({ page }) => {
    const initialCount = await page.locator('table tbody tr').count();

    // Fill the form – using label-based selectors
    await page.locator('label:has-text("Name") + input').fill('Test Item');
    await page.locator('label:has-text("Category") + input').fill('Test Category');
    await page.locator('label:has-text("Price") + input').fill('19.99');
    await page.click('button:has-text("Add Item")');

    // Wait for the new row to appear
    await expect(page.locator('table tbody tr')).toHaveCount(initialCount + 1);

    // Verify the last row contains the new item name
    await expect(page.locator('table tbody tr:last-child')).toContainText('Test Item');
  });

  test('should delete an item', async ({ page }) => {
    const initialCount = await page.locator('table tbody tr').count();

    // Delete the first item
    await page.locator('table tbody tr:first-child button:has-text("Delete")').click();

    // Expect one less row
    await expect(page.locator('table tbody tr')).toHaveCount(initialCount - 1);
  });
});