import { test, expect } from "@playwright/test";

test.describe("Product List Filter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "http://127.0.0.1:5501/js-excercises/exercises/ch15.01-03/ex14/index.html"
    );
  });

  test('"すべて"が選択されたときにすべての商品が表示されること。', async ({
    page,
  }) => {
    await page.selectOption('select[data-testid="select"]', "all");
    const products = await page.locator("#productList li");
    await expect(products).toHaveCount(3);
    await expect(products.nth(0)).toBeVisible();
    await expect(products.nth(1)).toBeVisible();
    await expect(products.nth(2)).toBeVisible();
  });

  test('"食品"選択されたときに食品のみ表示されること。', async ({ page }) => {
    await page.selectOption('select[data-testid="select"]', "food");
    const foodProduct = await page.locator('li[data-testid="food1"]');
    const stationeryProducts = await page.locator(
      'li[data-category="stationery"]'
    );
    await expect(foodProduct).toBeVisible();
    await expect(stationeryProducts).toHaveCount(2);
    await expect(stationeryProducts.nth(0)).toBeHidden();
    await expect(stationeryProducts.nth(1)).toBeHidden();
  });

  test('"文房具"が選択されたときに文房具のみが表示されること。', async ({
    page,
  }) => {
    await page.selectOption('select[data-testid="select"]', "stationery");
    const stationeryProducts = await page.locator(
      'li[data-category="stationery"]'
    );
    const foodProduct = await page.locator('li[data-testid="food1"]');
    await expect(stationeryProducts).toHaveCount(2);
    await expect(stationeryProducts.nth(0)).toBeVisible();
    await expect(stationeryProducts.nth(1)).toBeVisible();
    await expect(foodProduct).toBeHidden();
  });
});
