import { test as setup} from '@playwright/test';

setup('login as standart user', async ({ page }) => {
  const path = 'standard-user-state.json';

  await page.goto('https://www.saucedemo.com');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.context().storageState({ path });
});
