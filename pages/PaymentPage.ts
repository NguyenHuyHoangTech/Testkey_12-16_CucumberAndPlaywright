import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PaymentPage extends BasePage {
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly payAndConfirmBtn: Locator;
  readonly orderSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('input[data-qa="card-number"]');
    this.cvcInput = page.locator('input[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
    this.payAndConfirmBtn = page.locator('button[data-qa="pay-button"]');
    this.orderSuccessMessage = page.locator('#success_message, p:has-text("Congratulations! Your order has been confirmed!"), p:has-text("Your order has been placed successfully!")');
  }

  async enterPaymentDetails(name: string, cardNumber: string, cvc: string, month: string, year: string) {
    await this.nameOnCardInput.fill(name);
    await this.cardNumberInput.fill(cardNumber);
    await this.cvcInput.fill(cvc);
    await this.expiryMonthInput.fill(month);
    await this.expiryYearInput.fill(year);
  }

  async clickPayAndConfirm() {
    await this.payAndConfirmBtn.click();
  }

  async verifySuccessMessage() {
    await expect(this.page.locator('body')).toContainText(/order has been placed successfully|order has been confirmed/i);
  }
}
