import { test, expect } from '@playwright/test';
test.describe('hw24', () => {
  const baseUrl = 'https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks';
  test('сообщение об успешной загрузке после нажатия на кнопку', async ({ page }) => {
    await page.goto(baseUrl);
    await page.getByRole('button').click();
    await expect(page.locator('body')).toContainText('Expected data received');
  });

  test('ошибка сервера отображается на UI', async ({ page }) => {
    //Подменяем ответ сервера на 500
    //https://playwright.help/docs/network#handle-requests
    await page.route('**/mocks', route => {
      route.fulfill({
        status: 500,
        body: 'Server error'
      });
    });
    await page.goto(baseUrl);
    await expect(page.getByText('Server error')).toBeVisible();
  });
});
