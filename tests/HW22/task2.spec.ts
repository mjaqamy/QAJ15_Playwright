import { test, expect } from '@playwright/test';

// Task2: Для сайта https://the-internet.herokuapp.com/windows
// 1. Открыть новую страницу
// 2. Проверить что она открылась и имеет ожидаемый ЮРЛ и тайтл

 test(' URL & title ', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Click Here' }).click();
  const page1 = await page1Promise;
  await expect(page1).toHaveURL('https://the-internet.herokuapp.com/windows/new');
  const titlePage = await page1.title();
  expect(titlePage).toEqual('New Window');
});
