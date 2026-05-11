import { test, expect } from '@playwright/test';

test.describe('standard user tests', async () => {
  test.skip('adding item to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL(/inventory/);
  });
  test('@standard empty cart on start', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });

  //4.  Создать параметризованный тест, который проверяет переход на страницы /inventory.html, /cart.html,  /brand_new_page.html
  //Убедиться, что каждая страница успешно загружается и отображается логотип сайта
  //заменить параметр на такой чтобы тест проходил
  const pages = ['/inventory.html', '/cart.html', '/checkout-step-one.html'];

  for (const url of pages) {
    test(`page ${url} loads successfully`, async ({ page }) => {
      await page.goto(`https://www.saucedemo.com${url}`);

      await expect(page.locator('.app_logo')).toBeVisible();
    });
  }
});
