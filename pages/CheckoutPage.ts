import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface AddressDetails {
  title?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
  mobile?: string;
}

export class CheckoutPage extends BasePage {
  readonly deliveryAddress: Locator;
  readonly invoiceAddress: Locator;
  readonly orderReviewSection: Locator;
  readonly commentTextarea: Locator;
  readonly placeOrderBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.deliveryAddress = page.locator('#address_delivery');
    this.invoiceAddress = page.locator('#address_invoice');
    this.orderReviewSection = page.locator('#cart_info');
    this.commentTextarea = page.locator('textarea[name="message"]');
    this.placeOrderBtn = page.locator('a[href="/payment"]');
  }

  async verifyAddressDetails() {
    await expect(this.deliveryAddress).toBeVisible();
    await expect(this.invoiceAddress).toBeVisible();
  }

  async verifyDeliveryAddressMatches(details: AddressDetails) {
    await expect(this.deliveryAddress).toBeVisible();
    const text = await this.deliveryAddress.innerText();
    if (details.firstName && details.lastName) {
      expect(text).toContain(`${details.firstName} ${details.lastName}`);
    }
    if (details.company) expect(text).toContain(details.company);
    if (details.address1) expect(text).toContain(details.address1);
    if (details.city) expect(text).toContain(details.city);
    if (details.state) expect(text).toContain(details.state);
    if (details.zipcode) expect(text).toContain(details.zipcode);
    if (details.country) expect(text).toContain(details.country);
    if (details.mobile) expect(text).toContain(details.mobile);
  }

  async verifyBillingAddressMatches(details: AddressDetails) {
    await expect(this.invoiceAddress).toBeVisible();
    const text = await this.invoiceAddress.innerText();
    if (details.firstName && details.lastName) {
      expect(text).toContain(`${details.firstName} ${details.lastName}`);
    }
    if (details.company) expect(text).toContain(details.company);
    if (details.address1) expect(text).toContain(details.address1);
    if (details.city) expect(text).toContain(details.city);
    if (details.state) expect(text).toContain(details.state);
    if (details.zipcode) expect(text).toContain(details.zipcode);
    if (details.country) expect(text).toContain(details.country);
    if (details.mobile) expect(text).toContain(details.mobile);
  }

  async verifyOrderReview() {
    await expect(this.orderReviewSection).toBeVisible();
  }

  async enterComment(comment: string) {
    await this.commentTextarea.fill(comment);
  }

  async clickPlaceOrder() {
    await this.placeOrderBtn.click();
  }
}
