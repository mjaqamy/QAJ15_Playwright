import { test, expect } from '@playwright/test';

// Task6: Для сайта https://the-internet.herokuapp.com/upload
// 1. Проверить загрузку файла test.txt (любой файл) на сайт
test('task6 ', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');
  await page.setInputFiles('#file-upload', 'tests/test.txt');
  await page.click('#file-submit');
  await expect(page.locator('#uploaded-files')).toHaveText('test.txt');
});
