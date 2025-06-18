import { test, expect } from '@playwright/test';

test('Test homepage /about', async ({ page }) => {
  await page.goto('http://localhost:3002/about');
  console.log('Current URL:', await page.url());
  await expect(page).toHaveTitle(/./); // Kiểm tra có load được trang
});
