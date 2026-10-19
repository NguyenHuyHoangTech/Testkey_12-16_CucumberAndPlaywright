import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly signupLoginLink: Locator;
  readonly loggedInUserText: Locator;
  readonly deleteAccountLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.locator('header a[href="/"]');
    this.productsLink = page.locator('header a[href="/products"]');
    this.cartLink = page.locator('header a[href="/view_cart"]');
    this.signupLoginLink = page.locator('header a[href="/login"]');
    this.loggedInUserText = page.locator('header li:has-text("Logged in as")');
    this.deleteAccountLink = page.locator('header a[href="/delete_account"]');
    this.logoutLink = page.locator('header a[href="/logout"]');
  }

  async navigateTo(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async clickProducts() {
    await this.productsLink.click();
  }

  async clickCart() {
    await this.cartLink.click();
  }

  async clickSignupLogin() {
    await this.signupLoginLink.click();
  }

  async clickDeleteAccount() {
    await this.deleteAccountLink.click();
  }

  async verifyLoggedInAs(username?: string) {
    await expect(this.loggedInUserText).toBeVisible();
    await expect(this.loggedInUserText).toContainText('Logged in as');
    if (username && username.toLowerCase() !== 'username') {
      await expect(this.loggedInUserText).toContainText(username);
    }
  }
}
