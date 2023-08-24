import { test, expect } from "@playwright/test";
import { LoginLightbox } from '../page-objects/LoginLightbox';
import { MainNavbar } from '../page-objects/MainNavbar';
const env = require('../env.js').default;

test.beforeEach(async ({ page }) => {
  await page.goto(env.BASE_URL);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe('Login', () => {
  test("should log in with valid credentials", async ({ page }) => {
    const loginPage = new LoginLightbox(page);
    const mainNavbar = new MainNavbar(page);
    await loginPage.login(env.USERNAME, env.PASSWORD);
    const account = await mainNavbar.getAccountName();
    expect(account).toBe(env.USERNAME);
  });

  test("should refuse log in with valid username and invalid password", async ({ page }) => {
    const loginPage = new LoginLightbox(page);
    await loginPage.login(env.USERNAME, 'invalid');
    const errorText = await loginPage.getErrorText();
    expect(errorText).toBe(LoginLightbox.ERROR_MESSAGE);
  });

  test("should refuse log in with invalid username and valid password", async ({ page }) => {
    const loginPage = new LoginLightbox(page);
    await loginPage.login('invalid', env.PASSWORD);
    const errorText = await loginPage.getErrorText();
    expect(errorText).toBe(LoginLightbox.ERROR_MESSAGE);
  });

  test("should refuse log in with invalid username and invalid password", async ({ page }) => {
    const loginPage = new LoginLightbox(page);
    await loginPage.login('invalid', 'invalid');
    const errorText = await loginPage.getErrorText();
    expect(errorText).toBe(LoginLightbox.ERROR_MESSAGE);
  });
});
