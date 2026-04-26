import { test, expect } from '@playwright/test';

// Task10: Для сайта https://the-internet.herokuapp.com/iframe
// 1. Создать тест для проверки кнопок в верхнем меню эдитора (["File", "Edit", "View", "Format"])
// 2. Проверить что кнопки неактивны (disabled)
// 3. Проверить текст в форме ("Your content goes here.")
// 4. (опционально, сложная задача) Сделать возможным редактировать текст в форме.
//    Дописать свое имя в форму и проверить что форма была модифицирована

test('task10 ', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/iframe');
  await expect(page.getByText('File')).toBeEnabled();
  await expect(page.locator('.tox-mbtn__select-label').getByText('Edit')).toBeEnabled();
  await expect(page.getByText('View')).toBeEnabled();
  await expect(page.getByText('Format')).toBeEnabled();
  await page.locator('iframe[title="Rich Text Area"]').contentFrame().getByText('Your content goes here.').click();
  await page.locator('iframe[title="Rich Text Area"]').contentFrame().getByLabel('Rich Text Area. Press ALT-0').fill('Yuliya');
  expect(page.locator('iframe[title="Rich Text Area"]').contentFrame().getByText('Yuliya'));
});
