import { test, expect } from '@playwright/test';

test.describe('test playwright UI', async () => {
  const URL = 'https://www.saucedemo.com';

  test('successful login', async ({ page }) => {
    await page.goto(URL);
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('adding item to cart', async ({ page }) => {
    await page.goto(URL);
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory/);
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('#remove-sauce-labs-backpack')).toContainText('Remove');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('open cart page', async ({ page }) => {
    await page.goto(URL);
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('[data-test="shopping-cart-link"]');
    await expect(page).toHaveURL(/cart/);
  });

  test('open Checkout: Your Information page', async ({ page }) => {
    await page.goto(URL);
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('[data-test="shopping-cart-link"]');
    await expect(page).toHaveURL(/cart/);
    await page.click('#checkout');
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('invalid login shows error', async ({ page }) => {
    await page.goto(URL);
    await page.fill('#user-name', 'standard');
    await page.fill('#password', 'secret');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  });
});
