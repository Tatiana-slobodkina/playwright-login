// @ts-check
const { test, expect } = require('../../fixtures/pages.fixture');
const { LoginPage, LoggedInPage } = require('../../pages');
const { VALID_USER, INVALID_LOGINS } = require('../../test-data/users');

test.describe('Practice Test Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('successful login with valid credentials', async ({ page, loginPage, loggedInPage }) => {
    await loginPage.login(VALID_USER.username, VALID_USER.password);

    await expect(page).toHaveURL(LoggedInPage.urlPattern);
    await expect(loggedInPage.successMessage(VALID_USER.username)).toBeVisible();
    await expect(loggedInPage.logoutLink).toBeVisible();
  });

  test('log out returns to the login page', async ({ page, loginPage, loggedInPage }) => {
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    await loggedInPage.logout();

    await expect(page).toHaveURL(LoginPage.urlPattern);
    await expect(loginPage.submit).toBeVisible();
  });

  for (const { title, username, password, message } of INVALID_LOGINS) {
    test(`shows error for ${title}`, async ({ page, loginPage }) => {
      await loginPage.login(username, password);

      await expect(loginPage.error).toBeVisible();
      await expect(loginPage.error).toHaveText(message);
      await expect(page).toHaveURL(LoginPage.urlPattern);
    });
  }
});
