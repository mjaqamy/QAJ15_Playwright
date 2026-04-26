import { test, expect } from '@playwright/test';

// Task1: Для сайта https://books-pwakit.appspot.com/ найти:
// 1. Локатор для строки "Search the world's most comprehensive index of full-text books."
// 2. Проверить что текст совпадает с ожидаемым

test(' текст совпал ', async ({ page }) => {
  await page.goto('https://books-pwakit.appspot.com/');
  await expect(page.locator('.books-desc')).toHaveText('Search the worlds most comprehensive index of full-text books.');
});