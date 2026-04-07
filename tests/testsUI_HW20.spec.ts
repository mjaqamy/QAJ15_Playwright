import { test, expect } from '@playwright/test';
import { inventoryPageSlectors } from './helpers/selectors';
import { loginAsNotStandartUser, loginAsStandartUser } from './helpers/auth';

test.describe('test playwright UI', async () => {
  test('successful login', async ({ page }) => {
    await loginAsStandartUser(page);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('adding item to cart', async ({ page }) => {
    await loginAsStandartUser(page);
    await expect(page).toHaveURL(/inventory/);
    await page.locator(inventoryPageSlectors.addBackpackButton).click();
    await expect(page.locator(inventoryPageSlectors.removeBackpackButton)).toHaveText('Remove');
    await expect(page.locator(inventoryPageSlectors.cartBadge)).toHaveText('1');
  });

  test('open Checkout: Your Information page', async ({ page }) => {
    await loginAsStandartUser(page);
    await page.locator(inventoryPageSlectors.shoppingCartLink).click();
    await expect(page).toHaveURL(/cart/);
    await page.click('#checkout');
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('logout', async ({ page }) => {
    await loginAsStandartUser(page);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await page.locator(inventoryPageSlectors.burgerMenuButton).click();
    await page.locator(inventoryPageSlectors.logoutLink).click();
  });

  test('invalid login shows error', async ({ page }) => {
    await loginAsNotStandartUser(page);
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });
});
