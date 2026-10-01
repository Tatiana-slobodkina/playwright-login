// @ts-check
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  static path = '/practice-test-login/';
  static urlPattern = /\/practice-test-login\/?$/;

  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.submit = page.locator('#submit');
    this.error = page.locator('#error');
  }

  async open() {
    await this.goto(LoginPage.path);
  }

  /**
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }
}

module.exports = { LoginPage };
