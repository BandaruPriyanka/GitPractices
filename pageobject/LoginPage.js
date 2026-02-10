const { expect } = require('@playwright/test');
require('dotenv').config();

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.userName = page.locator('#email');
    this.password = page.locator('#password');
    this.loginBtn = page.locator("//span[contains(text(),'Log In')]");
    this.otpForm = page.locator('#otp-form');
    this.otpInputs = page.locator('#otp-form input.otp-input');
    this.submitBtn = page.locator('button:has-text("Submit"), input[type="submit"]');
    this.otpAlert = page.locator('//div[@role="alert"]');
    this.LMSScreen = page.locator("//h2[text()='Management System - (LMS)']");
    this.GMSScreen = page.locator("//h2[text()='Management System - (GMS)']");
  }

  async navigate() {
    await this.page.goto(process.env.supplyChainUrl);
  }

  async loginFunctionality(name, pwd) {
    await this.userName.fill(name);
    await this.password.fill(pwd);
    await this.loginBtn.click();
  }

  async getOtpFromAlert() {
    try {
      await this.otpAlert.waitFor({ state: 'visible', timeout: 3000 });
      const alertText = await this.otpAlert.innerText();
      const otpValue = alertText.match(/\d{4,6}/)?.[0];
      console.log('Captured OTP:', otpValue);
      return otpValue;
    } catch (error) {
      console.log('OTP alert not found or disappeared too fast');
      return null;
    }
  }

  async enterOtpAndSubmit(otpValue) {
    await this.otpForm.waitFor({ state: 'visible', timeout: 30000 });
    const otpDigits = otpValue.split('');
    const inputs = await this.otpInputs.all();
    for (let i = 0; i < inputs.length && i < otpDigits.length; i++) {
      await inputs[i].fill(otpDigits[i]);
    }
    await this.submitBtn.click();
  }
  async validateLogin(){
    expect(this.page).toHaveURL(process.env.supplychainLandingPage);
  }
  async validateLMSScreen() {
    await expect(this.LMSScreen).toBeVisible();
    await this.LMSScreen.click();
    await this.page.waitForLoadState('networkidle'); 
    await expect(this.page).toHaveURL(process.env.supplychainLMS, { timeout: 15000 }); 
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle'); 
  }
  
  async validateGMSScreen() {
    await expect(this.GMSScreen).toBeVisible();
    await this.GMSScreen.click();
    await this.page.waitForLoadState('networkidle'); 
    await expect(this.page).toHaveURL(process.env.supplychainGMS, { timeout: 15000 }); 
  }
  
};
