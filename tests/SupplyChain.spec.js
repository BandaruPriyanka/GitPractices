const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobject/LoginPage');
require('dotenv').config();

test('Login for Supply Chain application', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.loginFunctionality(process.env.supplychain_username, process.env.supplychain_passWord);
  const otp = await loginPage.getOtpFromAlert();
  if (otp) {
    await loginPage.enterOtpAndSubmit(otp);
  } else {
    throw new Error('Failed to capture OTP from alert');
  }
  await loginPage.validateLogin();
  await loginPage.validateLMSScreen();
  await loginPage.validateGMSScreen();
});
