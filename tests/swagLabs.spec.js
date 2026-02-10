import { test, expect } from '@playwright/test';

test('SwagLabs Smoke Test', async ({ page }) => {
  
  // Navigate to application
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-butto');

  // Verify successful login
  await expect(page).toHaveURL(/inventory/);

  // Add product to cart
  await page.click('#add-to-cart-sauce-labs-backpack');

  // Go to cart
  await page.click('.shopping_cart_link');

  // Verify product added
  await expect(page.locator('.inventory_item_name'))
        .toHaveText('Sauce Labs Backpack');

  // Checkout
  await page.click('#checkout');
  await page.fill('#first-name', 'Test');
  await page.fill('#last-name', 'User');
  await page.fill('#postal-code', '500001');
  await page.click('#continue');

  // Finish order
  await page.click('#finish');

  // Verify order success
  await expect(page.locator('.complete-header'))
        .toHaveText('Thank you for your order!');
});
