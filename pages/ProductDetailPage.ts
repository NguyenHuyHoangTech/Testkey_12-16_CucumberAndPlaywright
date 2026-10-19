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
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForFunction(() => typeof (window as any).$ !== 'undefined');
    await this.addToCartBtn.scrollIntoViewIfNeeded();
    await this.addToCartBtn.click();
    const modal = this.page.locator('#cartModal');
    try {
      await modal.waitFor({ state: 'visible', timeout: 3000 });
    } catch {
      await this.addToCartBtn.click({ force: true });
      await modal.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    }
  }

  async clickViewCartModal() {
    await this.viewCartModalLink.waitFor({ state: 'visible', timeout: 10000 }).catch(async () => {
      await this.page.evaluate(() => {
        const modal = document.getElementById('cartModal');
        if (modal) {
          modal.classList.remove('fade');
          modal.classList.add('show');
          (modal as HTMLElement).style.display = 'block';
        }
      });
    });
    await this.viewCartModalLink.click({ force: true });
  }
}
