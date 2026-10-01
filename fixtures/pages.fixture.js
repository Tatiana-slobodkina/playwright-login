// @ts-check
const base = require('@playwright/test');
const { LoginPage, LoggedInPage } = require('../pages');

/**
 * @type {base.TestType<
 *   base.PlaywrightTestArgs & base.PlaywrightTestOptions & { loginPage: LoginPage, loggedInPage: LoggedInPage },
 *   base.PlaywrightWorkerArgs & base.PlaywrightWorkerOptions
 * >}
 */
const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  loggedInPage: async ({ page }, use) => {
    await use(new LoggedInPage(page));
  },
});

module.exports = { test, expect: base.expect };
