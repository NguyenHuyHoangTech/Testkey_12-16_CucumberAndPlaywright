import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  readonly productInformation: Locator;
  readonly productName: Locator;
  readonly quantityInput: Locator;
  readonly addToCartBtn: Locator;
  readonly viewCartModalLink: Locator;

  constructor(page: Page) {
    super(page);
    this.productInformation = page.locator('.product-information');
    this.productName = page.locator('.product-information h2');
    this.quantityInput = page.locator('#quantity');
    this.addToCartBtn = page.locator('button:has-text("Add to cart")');
    this.viewCartModalLink = page.locator('.modal-content a[href="/view_cart"]');
  }

  async verifyProductDetailPageVisible() {
    await expect(this.productInformation).toBeVisible();
    await expect(this.productName).toBeVisible();
  }

  async setQuantity(qty: number | string) {
    await this.quantityInput.fill('');
    await this.quantityInput.fill(String(qty));
  }

  async clickAddToCart() {
    await this.addToCartBtn.click();
  }

  async clickViewCartModal() {
    await this.viewCartModalLink.waitFor({ state: 'visible' });
    await this.viewCartModalLink.click();
  }
}
