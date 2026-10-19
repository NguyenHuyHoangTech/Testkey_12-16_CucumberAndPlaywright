import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartTable: Locator;
  readonly cartRows: Locator;
  readonly proceedToCheckoutBtn: Locator;
  readonly registerLoginModalLink: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTable = page.locator('#cart_info_table');
    this.cartRows = page.locator('#cart_info_table tbody tr');
    this.proceedToCheckoutBtn = page.locator('a:has-text("Proceed To Checkout")');
    this.registerLoginModalLink = page.locator('.modal-content a[href="/login"]');
  }

  async verifyCartPageVisible() {
    await expect(this.cartTable).toBeVisible();
    await expect(this.page).toHaveURL(/.*view_cart/);
  }

  async verifyProductCount(expectedCount: number) {
    await expect(this.cartRows).toHaveCount(expectedCount);
  }

  async verifyProductDetails(rowIndex: number) {
    const row = this.cartRows.nth(rowIndex);
    const priceText = await row.locator('.cart_price p').innerText();
    const qtyText = await row.locator('.cart_quantity button').innerText();
    const totalText = await row.locator('.cart_total p').innerText();

    const price = parseInt(priceText.replace(/\D/g, ''), 10);
    const qty = parseInt(qtyText, 10);
    const total = parseInt(totalText.replace(/\D/g, ''), 10);

    expect(price * qty).toBe(total);
  }

  async verifyProductQuantity(rowIndex: number, expectedQty: number) {
    const row = this.cartRows.nth(rowIndex);
    const qtyText = await row.locator('.cart_quantity button').innerText();
    expect(parseInt(qtyText, 10)).toBe(expectedQty);
  }

  async clickProceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
  }

  async clickRegisterLoginModal() {
    await this.registerLoginModalLink.waitFor({ state: 'visible' });
    await this.registerLoginModalLink.click();
  }

  async verifyProductsVisibleInCart() {
    await expect(this.cartTable).toBeVisible();
    const count = await this.cartRows.count();
    expect(count).toBeGreaterThan(0);
  }

  async getCartProductNames(): Promise<string[]> {
    const names = await this.cartRows.locator('.cart_description h4 a').allInnerTexts();
    return names.map(n => n.replace(/\s+/g, ' ').trim());
  }

  async verifyProductNamesInCart(expectedNames: string[]) {
    const cartNames = await this.getCartProductNames();
    expect(cartNames.length).toBeGreaterThan(0);
    for (const name of expectedNames) {
      const normalizedExpected = name.replace(/\s+/g, ' ').trim().toLowerCase();
      const found = cartNames.some(cn => {
        const normCart = cn.toLowerCase();
        return normCart === normalizedExpected || normalizedExpected.includes(normCart) || normCart.includes(normalizedExpected);
      });
      expect(found, `Expected product "${name}" to be in cart: ${JSON.stringify(cartNames)}`).toBeTruthy();
    }
  }
}
