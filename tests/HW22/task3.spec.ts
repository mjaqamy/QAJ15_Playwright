import { test, expect } from '@playwright/test';

// Task3: Для сайта https://the-internet.herokuapp.com/hovers
// 1. С помощью указателя мыши навестись на любую из картинок
// 2. Проверить, что ожидаемый текст под картинкой появился

test('task3 Hover ', async ({ page }) => {
  await page.goto(' https://the-internet.herokuapp.com/hovers');
  await page.locator('.figure').nth(0).hover(); //Навести курсор на элемент
  const hoverInf = page.locator('.figcaption').first(); //Проверить, что появился ховер
  await expect(hoverInf).toBeVisible();
  await expect(hoverInf).toHaveText(/name: user1/, /View profile/);
});