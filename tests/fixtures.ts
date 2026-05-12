import { test as base, Page } from '@playwright/test';

type MyFixtures = {
  standardLogin: Page;
  twoItemsInCart: Page;
};

export const test = base.extend<MyFixtures>({
  // 5.1. Фикстура для логина
  standardLogin: async ({ page }, use) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await use(page); // Передаем объект page в тест
  },
  // 5.2. Фикстура для двух товаров (использует логин выше)
  twoItemsInCart: async ({ standardLogin }, use) => {
    const page = standardLogin;
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await use(page);
  }
});

export { expect } from '@playwright/test';
