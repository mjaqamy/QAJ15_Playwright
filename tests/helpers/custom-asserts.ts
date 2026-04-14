import { expect, Page } from '@playwright/test';

export async function checkProductsExist(page: Page) {
  const count = await page.locator('.inventory_item').count();
  expect(count).toBeGreaterThan(0);
}