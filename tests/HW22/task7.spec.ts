import { test, expect } from '@playwright/test';
import { readFileSync, unlinkSync } from 'fs';

// Task7: Для сайта https://the-internet.herokuapp.com/download
// 1. Скачать файл sample_upload.txt/text.txt
// 2. Проверить что его содержимое это "This is a test file for Selenium upload automation."/ Purpose: Provide example of this file type
test('task7 ', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download');

  // Из доки: Начинаем ожидать загрузку перед кликом. Обратите внимание, что нет await.
  const downloadPromise = (page.waitForEvent('download'));
  await page.getByText('test.txt').first().click();
  const download = await (await downloadPromise).saveAs('tests/test.txt');
  
  const readFile = readFileSync('tests/test.txt', 'utf-8');
  expect(readFile).toEqual('Fot testing purposes- to upload the file');
  const filePath = 'tests/test.txt';
  //удалить файл тестовый
  unlinkSync(filePath);
});
