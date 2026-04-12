import { test, expect } from '@playwright/test';
import { inventoryPageSlectors, loginPageSlectors } from './helpers/selectors';
import { loginAsNotStandartUser, loginAsStandartUser } from './helpers/auth';

test.describe('test playwright assert', async () => {
  test('6 products on inventory page (GenericAssertions)', async ({ page }) => {
    await loginAsStandartUser(page);
    const products = page.locator('.inventory_item');
    await expect(products).toHaveCount(6);
    await expect(page).toHaveScreenshot();
  });

  test('error message for invalid login (GenericAssertions)', async ({ page }) => {
    await page.context().tracing.start({ screenshots: true, snapshots: true });
    await loginAsNotStandartUser(page);
    const error = page.locator('[data-test="error"]');
    await page.context().tracing.stop({ path: 'trace.zip' });
    await expect(error).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Error message class if fields are empty (LocatorAssertions)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator(loginPageSlectors.loginButton).click();
    const errorBlock = page.locator('.error-message-container.error');
    await expect(errorBlock).toHaveCSS('background-color', 'rgb(226, 35, 26)');
    await expect(errorBlock).toHaveText('Epic sadface: Username is required');
  });

  test('page cart (PageAssertions)', async ({ page }) => {
    await loginAsStandartUser(page);
    await page.locator(inventoryPageSlectors.shoppingCartLink).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  });

  test('titile', async ({ page }) => {
    await loginAsStandartUser(page);
    const titlePage = await page.title();
    expect(titlePage).toEqual('Swag Labs');
  });
});
