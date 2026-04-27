import { test, expect } from '@playwright/test';

// Task8: Для сайта https://the-internet.herokuapp.com/javascript_alerts
// 1. Вызвать JS confirm через соответствующую опцию (проверить что алерт появился)
// 2. Закрыть его через accept/dismiss и проверить результат
test('task8 ', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  // взяла из документации https://playwright.help/docs/dialogs#alert-confirm-prompt-dialogs
   page.once('dialog', async dialog => {
    console.log(dialog.message()); // проверили, что алерт появился
    await dialog.accept(); // нажали OK
  });
  await page.getByText('Click for JS Confirm').click();
  await expect(page.locator('#result')).toHaveText('You clicked: Ok');
});


