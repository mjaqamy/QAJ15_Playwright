import { test, expect } from '@playwright/test';

// Task5: Для сайта https://the-internet.herokuapp.com/key_presses
// 1. Проверить нажатие клавиши "Control"
// 2. Проверить что отображается последняя буква вашего имени после ввода через клавиатуру

test('task5 ', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/key_presses');
  await page.keyboard.press('Control');
  const res = page.locator('#result');
  await expect(res).toHaveText(/You entered: CONTROL/);

  const nameUser = 'Yulia';
  const lastChar = nameUser.slice(-1).toUpperCase();
  await page.locator('#target').pressSequentially(nameUser);//имитирует физическое нажатие клавиш, вызывая события ввода по мере печати
  await expect(res).toHaveText(`You entered: ${lastChar}`);
});