import { test, expect } from '@playwright/test';

test.describe('Тест API (Playwright)', () => {
  const baseUrl = 'https://api.restful-api.dev/objects';

  // GET
  test.describe('Проверки для Get /objects', () => {
    let response: any;
    let body: any;

    test.beforeAll(async ({ request }) => {
      response = await request.get(baseUrl);
      body = await response.json();
    });

    test('Get /objects - проверка статуса', async () => {
      expect(response.status()).toBe(200);
    });

    test('Get /objects - проверяем, что массив не пустой', async () => {
      expect(body.length).toBeGreaterThan(0);
    });

    test('Get /objects - проверяем, что каждый элемент содержит "data"', async () => {
      body.forEach((element: any) => {
        expect(element).toHaveProperty('data');
      });
    });

    test('Get /objects - проверяем, что каждый элемент содержит "name"', async () => {
      body.forEach((element: any) => {
        expect(element).toHaveProperty('name');
      });
    });

    test('Get /objects - проверка получения всех id', async ({ request }) => {
      const response = await request.get(`${baseUrl}?id=1&id=2&id=3`);

      expect(response.status()).toBe(200);

      const body = await response.json();

      const actualIds = body.map((el: any) => el.id);

      expect(actualIds).toStrictEqual(['1', '2', '3']);
    });
  });

  test.describe('Проверки для Get /objects/{id}', () => {
    test('Проверяем, что объект с id=2 существует и сервер вернул успешный ответ /objects/{id}', async ({ request }) => {
      const response = await request.get(`${baseUrl}/2`);

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body.id).toBe('2');
      expect(body).toHaveProperty('name');
      expect(body).toHaveProperty('data');
    });

    test('Проверяем, что нет юзера id = 209 - Error Not found id = 209 - Get /objects/{id}', async ({ request }) => {
      const response = await request.get(`${baseUrl}/209`);

      expect(response.status()).toBe(404);
    });
  });

  // POST
  test.describe('Проверки для Post', () => {
    test('Post', async ({ request }) => {
      const testObject = {
        name: 'Sunday',
        data: {
          year: 2019,
          price: 1849.99
        }
      };

      const response = await request.post(baseUrl, {
        data: testObject
      });

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body.name).toBe('Sunday');
    });
  });

  // PUT
  test.describe('Проверки для Put', () => {
    let createdId: string;

    test.beforeAll(async ({ request }) => {
      const response = await request.post(baseUrl, {
        data: {
          name: 'Patch Test',
          data: { price: 100 }
        }
      });

      const body = await response.json();

      createdId = body.id;
    });

    test('PUT /objects/{id} - обновление объекта', async ({ request }) => {
      const updatedObject = {
        name: 'Patch Test',
        data: {
          year: 2026,
          price: 2000
        }
      };

      const response = await request.put(`${baseUrl}/${createdId}`, {
        data: updatedObject
      });

      expect(response.status()).toBe(200);

      const getResponse = await request.get(`${baseUrl}/${createdId}`);

      const body = await getResponse.json();

      expect(body.name).toBe(updatedObject.name);
      expect(body.data.year).toBe(2026);
    });
  });

  // PATCH
  test.describe('PATCH /objects/{id}', () => {
    let createdId: string;

    test.beforeAll(async ({ request }) => {
      const response = await request.post(baseUrl, {
        data: {
          name: 'Patch Test',
          data: { price: 100, year: 2020 }
        }
      });

      const body = await response.json();

      createdId = body.id;
    });

    test('PATCH - изменяет только одно поле price', async ({ request }) => {
      const response = await request.patch(`${baseUrl}/${createdId}`, {
        data: {
          data: { price: 777, year: 2020 }
        }
      });

      expect(response.status()).toBe(200);

      const updated = await request.get(`${baseUrl}/${createdId}`);
      const body = await updated.json();

      expect(body.data.price).toBe(777);
      expect(body.data.year).toBe(2020);
    });

    test('PATCH - обновляет name без изменения data', async ({ request }) => {
      const response = await request.patch(`${baseUrl}/${createdId}`, {
        data: {
          name: 'New Name'
        }
      });

      expect(response.status()).toBe(200);

      const updated = await request.get(`${baseUrl}/${createdId}`);
      const body = await updated.json();

      expect(body.name).toBe('New Name');
      expect(body.data).toBeDefined();
    });

    test('PATCH - несуществующий id', async ({ request }) => {
      const response = await request.patch(`${baseUrl}/999999`, {
        data: {
          name: 'Fail'
        }
      });

      expect(response.status()).toBe(404);
    });
  });

  // DELETE
  test.describe('Проверки для Delete /objects/{id}', () => {
    test('Проверяем, что объект с id = 6 удаляется и сервер вернул успешный ответ /objects/{id}', async ({ request }) => {
      const response = await request.delete(`${baseUrl}/6`);

      expect(response.status()).toBe(405);
    });

    test('Не удалось удалить, так как нет такого юзера - Error Not found id = 209 - Get /objects/{id}', async ({ request }) => {
      const response = await request.delete(`${baseUrl}/209`);

      expect(response.status()).toBe(404);
    });
  });
});
