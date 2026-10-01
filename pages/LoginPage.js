// @ts-check

class LoginPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.submit = page.locator('#submit');
    this.error = page.locator('#error');
  }

  async open() {
    await this.page.goto('/practice-test-login/');
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
