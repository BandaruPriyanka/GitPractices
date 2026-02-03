import { test, expect } from '@playwright/test';
const {LoginPage1} = require("../pageobject/auto_login")


test("testing automation exercise",async({page})=>{
    const loginPage=new LoginPage1(page);
    await loginPage.loginFunctionality();
})