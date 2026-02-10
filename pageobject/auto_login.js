import {expect} from '@playwright/test'


exports.LoginPage1=class LoginPage1 {
  constructor(page){
    this.page=page;
    this.loginButton=page.locator("//a[text()=' Signup / Login']");

  }
  async loginFunctionality(){
    await this.page.goto("https://automationexercise.com/");
    await this.loginButton.click();
  }

  }
  
  