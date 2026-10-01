// @ts-check
const { BasePage } = require('./BasePage');

class LoggedInPage extends BasePage {
  static urlPattern = /practicetestautomation\.com\/logged-in-successfully\/?/;

  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
  }

  /** @param {string} username */
  successMessage(username) {
    return this.page.getByText(`Congratulations ${username}. You successfully logged in!`);
  }

  async logout() {
    await this.logoutLink.click();
  }
}

module.exports = { LoggedInPage };
