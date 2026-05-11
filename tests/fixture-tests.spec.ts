import { test, expect } from './fixtures';

// Тест 1: Скриншот хедера
test('header screenshot standard user', async ({ standardLogin }) => {
  await expect(standardLogin.locator('.header_secondary_container')).toHaveScreenshot();
});

// Тест 2: Проверка количества в корзине
test('cart has 2 items', async ({ twoItemsInCart }) => {
  await expect(twoItemsInCart.locator('.shopping_cart_badge')).toHaveText('2');
});

// Тест 3: Использование ОБЕИХ фикстур
test('combined check: cart content and user menu', async ({ standardLogin, twoItemsInCart }) => {
  // 1. Проверяем результат работы second fixture
  await expect(twoItemsInCart.locator('.shopping_cart_badge')).toHaveText('2');
  
  // 2. Используем standardLogin для проверки элементов, которые доступны любому залогиненному юзеру
  await standardLogin.locator('#react-burger-menu-btn').click();
  const menu = standardLogin.locator('.bm-menu-wrap');
  
  await expect(menu).toBeVisible();
});
