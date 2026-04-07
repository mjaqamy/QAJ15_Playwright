import { Page } from '@playwright/test';
import { loginPageSlectors } from './selectors';

export async function loginAsStandartUser(page: Page) {
  await page.goto('https://www.saucedemo.com');
  await page.locator(loginPageSlectors.userNameInput).fill('standard_user');
  await page.locator(loginPageSlectors.passwordInput).fill('secret_sauce');
  await page.locator(loginPageSlectors.loginButton).click();
}
export async function loginAsNotStandartUser(page: Page) {
  await page.goto('https://www.saucedemo.com');
  await page.locator(loginPageSlectors.userNameInput).fill('standard_user');
  await page.locator(loginPageSlectors.passwordInput).fill('1234567');
  await page.locator(loginPageSlectors.loginButton).click();
}
