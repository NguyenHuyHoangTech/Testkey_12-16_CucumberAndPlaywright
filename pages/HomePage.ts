import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly sliderCarousel: Locator;
  readonly firstProductItem: Locator;
  readonly firstProductAddToCartBtn: Locator;
  readonly secondProductItem: Locator;
  readonly secondProductAddToCartBtn: Locator;
  readonly continueShoppingBtn: Locator;
  readonly viewCartModalLink: Locator;
  readonly firstProductViewProductLink: Locator;
  readonly subscriptionHeader: Locator;
  readonly scrollUpBtn: Locator;
  readonly fullFledgedText: Locator;

  constructor(page: Page) {
    super(page);
    this.sliderCarousel = page.locator('#slider-carousel');
    this.firstProductItem = page.locator('.features_items .col-sm-4').nth(0);
    this.firstProductAddToCartBtn = this.firstProductItem.locator('.productinfo .add-to-cart');
    this.secondProductItem = page.locator('.features_items .col-sm-4').nth(1);
    this.secondProductAddToCartBtn = this.secondProductItem.locator('.productinfo .add-to-cart');
    this.continueShoppingBtn = page.locator('button:has-text("Continue Shopping")');
    this.viewCartModalLink = page.locator('.modal-content a[href="/view_cart"]');
    this.firstProductViewProductLink = page.locator('a[href^="/product_details/"]').first();
    this.subscriptionHeader = page.locator('footer, .single-widget').locator('h2:has-text("Subscription")');
    this.scrollUpBtn = page.locator('#scrollUp');
    this.fullFledgedText = page.locator('h2:has-text("Full-Fledged practice website for Automation Engineers")').first();
  }

  async verifyHomePageVisible() {
    await expect(this.sliderCarousel).toBeVisible();
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }

  async clickFirstViewProduct() {
    await this.firstProductViewProductLink.click();
  }

  async addFirstProductToCart() {
    await this.firstProductItem.scrollIntoViewIfNeeded();
    await this.firstProductItem.hover();
    const overlayBtn = this.firstProductItem.locator('.overlay-content .add-to-cart');
    if (await overlayBtn.isVisible()) {
      await overlayBtn.click();
    } else {
      await this.firstProductAddToCartBtn.click({ force: true });
    }
  }

  async clickContinueShopping() {
    await this.continueShoppingBtn.waitFor({ state: 'visible' });
    await this.continueShoppingBtn.click();
    await this.continueShoppingBtn.waitFor({ state: 'hidden' });
  }

  async addSecondProductToCart() {
    await this.secondProductItem.scrollIntoViewIfNeeded();
    await this.secondProductItem.hover();
    const overlayBtn = this.secondProductItem.locator('.overlay-content .add-to-cart');
    if (await overlayBtn.isVisible()) {
      await overlayBtn.click();
    } else {
      await this.secondProductAddToCartBtn.click({ force: true });
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

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(500);
  }

  async verifySubscriptionVisible() {
    await expect(this.subscriptionHeader).toBeVisible();
  }

  async clickScrollUpArrow() {
    await expect(this.scrollUpBtn).toBeVisible();
    await this.scrollUpBtn.click();
    await this.page.waitForTimeout(500);
  }

  async verifyScrolledUpAndTextVisible() {
    await expect(this.fullFledgedText).toBeVisible();
  }
}
