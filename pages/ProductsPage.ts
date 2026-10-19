import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly allProductsTitle: Locator;
  readonly productCards: Locator;
  readonly continueShoppingBtn: Locator;
  readonly viewCartModalLink: Locator;
  readonly searchInput: Locator;
  readonly searchBtn: Locator;
  readonly searchedTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.allProductsTitle = page.locator('.features_items .title');
    this.productCards = page.locator('.features_items .col-sm-4');
    this.continueShoppingBtn = page.locator('button:has-text("Continue Shopping")');
    this.viewCartModalLink = page.locator('.modal-content a[href="/view_cart"]');
    this.searchInput = page.locator('#search_product');
    this.searchBtn = page.locator('#submit_search');
    this.searchedTitle = page.locator('.features_items .title');
  }

  async verifyProductsPageVisible() {
    await expect(this.allProductsTitle).toBeVisible();
    await expect(this.allProductsTitle).toContainText(/all products/i);
  }

  async addProductByIndex(index: number) {
    const productCard = this.productCards.nth(index);
    await productCard.scrollIntoViewIfNeeded();
    await productCard.hover();
    const overlayBtn = productCard.locator('.overlay-content .add-to-cart');
    if (await overlayBtn.isVisible()) {
      await overlayBtn.click();
    } else {
      await productCard.locator('.productinfo .add-to-cart').click({ force: true });
    }
  }

  async clickContinueShopping() {
    await this.continueShoppingBtn.waitFor({ state: 'visible' });
    await this.continueShoppingBtn.click();
    await this.continueShoppingBtn.waitFor({ state: 'hidden' });
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

  async searchProducts(productName: string) {
    await this.searchInput.fill(productName);
    await Promise.all([
      this.page.waitForURL(/.*search=.*/, { timeout: 10000 }).catch(() => {}),
      this.searchBtn.click()
    ]);
  }

  async verifySearchedProductsVisible() {
    await expect(this.searchedTitle).toContainText(/searched products/i, { timeout: 10000 });
  }

  async verifyAllSearchedProductsVisible() {
    const count = await this.productCards.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(this.productCards.nth(i)).toBeVisible();
    }
  }

  async addAllSearchedProductsToCart(): Promise<string[]> {
    const count = await this.productCards.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);
      await card.scrollIntoViewIfNeeded();
      const name = await card.locator('.productinfo p').first().innerText();
      names.push(name.replace(/\s+/g, ' ').trim());

      await card.hover();
      const overlayBtn = card.locator('.overlay-content .add-to-cart');
      if (await overlayBtn.isVisible()) {
        await overlayBtn.click();
      } else {
        await card.locator('.productinfo .add-to-cart').click({ force: true });
      }

      await this.continueShoppingBtn.waitFor({ state: 'visible' });
      await this.continueShoppingBtn.click();
      await this.continueShoppingBtn.waitFor({ state: 'hidden' });
    }
    return names;
  }
}
