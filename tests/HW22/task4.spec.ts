import { test, expect } from '@playwright/test';

//   Task4: Для сайта https://the-internet.herokuapp.com/drag_and_drop
// 1. Перетащить элемент А на элемент В
// 2. Проверить что они поменялись местами

test(' task4 перетаскивание элементов', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
  const columnA = page.locator('#column-a');
  const columnB = page.locator('#column-b');
  await columnA.dragTo(columnB); //Выполняем перетаскивание
  await expect(columnB).toHaveText('A'); //теперь в колонке B текст "A" (так как мы перетащили A на место B)
  await expect(columnA).toHaveText('B'); //в колонке A теперь текст "B"
});