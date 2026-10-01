// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

const VALID_USER = 'student';
const VALID_PASSWORD = 'Password123';

test.describe('Practice Test Login', () => {
  /** @type {LoginPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('successful login with valid credentials', async ({ page }) => {
    await loginPage.login(VALID_USER, VALID_PASSWORD);

    await expect(page).toHaveURL(/practicetestautomation\.com\/logged-in-successfully\/?/);
    await expect(page.getByText('Congratulations student. You successfully logged in!')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  });

  test('log out returns to the login page', async ({ page }) => {
    await loginPage.login(VALID_USER, VALID_PASSWORD);
    await page.getByRole('link', { name: 'Log out' }).click();

    await expect(page).toHaveURL(/\/practice-test-login\/?$/);
    await expect(loginPage.submit).toBeVisible();
  });

  const negativeCases = [
    { title: 'invalid username', username: 'incorrectUser', password: VALID_PASSWORD, message: 'Your username is invalid!' },
    { title: 'invalid password', username: VALID_USER, password: 'incorrectPassword', message: 'Your password is invalid!' },
    { title: 'empty username and password', username: '', password: '', message: 'Your username is invalid!' },
    { title: 'username in wrong case', username: 'Student', password: VALID_PASSWORD, message: 'Your username is invalid!' },
    { title: 'password with trailing space', username: VALID_USER, password: `${VALID_PASSWORD} `, message: 'Your password is invalid!' },
  ];

  for (const { title, username, password, message } of negativeCases) {
    test(`shows error for ${title}`, async ({ page }) => {
      await loginPage.login(username, password);

      await expect(loginPage.error).toBeVisible();
      await expect(loginPage.error).toHaveText(message);
      await expect(page).toHaveURL(/\/practice-test-login\/?$/);
    });
  }
});
