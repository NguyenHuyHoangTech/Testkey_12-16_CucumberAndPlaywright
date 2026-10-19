import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Login form
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;

  // Signup form
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;

  // Registration details
  readonly titleGender1Radio: Locator;
  readonly regPasswordInput: Locator;
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly optinCheckbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountBtn: Locator;

  // Account creation & deletion status
  readonly accountCreatedHeader: Locator;
  readonly accountDeletedHeader: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);

    // Login form locators
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');

    // Signup form locators
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');

    // Account registration form locators
    this.titleGender1Radio = page.locator('#id_gender1');
    this.regPasswordInput = page.locator('#password');
    this.daysSelect = page.locator('#days');
    this.monthsSelect = page.locator('#months');
    this.yearsSelect = page.locator('#years');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.optinCheckbox = page.locator('#optin');
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.address1Input = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.locator('#mobile_number');
    this.createAccountBtn = page.locator('button[data-qa="create-account"]');

    // Account creation / deletion
    this.accountCreatedHeader = page.locator('h2[data-qa="account-created"]');
    this.accountDeletedHeader = page.locator('h2[data-qa="account-deleted"]');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  async login(email: string, pass: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(pass);
    await this.loginButton.click();
  }

  async fillSignup(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async fillAccountDetails(details?: {
    password?: string;
    day?: string;
    month?: string;
    year?: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    address1?: string;
    country?: string;
    state?: string;
    city?: string;
    zipcode?: string;
    mobile?: string;
  }) {
    await this.titleGender1Radio.check();
    await this.regPasswordInput.fill(details?.password || 'Password123!');
    await this.daysSelect.selectOption(details?.day || '10');
    await this.monthsSelect.selectOption(details?.month || '5');
    await this.yearsSelect.selectOption(details?.year || '1995');
    await this.newsletterCheckbox.check();
    await this.optinCheckbox.check();

    await this.firstNameInput.fill(details?.firstName || 'John');
    await this.lastNameInput.fill(details?.lastName || 'Doe');
    await this.companyInput.fill(details?.company || 'Test Company');
    await this.address1Input.fill(details?.address1 || '123 Test Street');
    await this.countrySelect.selectOption(details?.country || 'United States');
    await this.stateInput.fill(details?.state || 'California');
    await this.cityInput.fill(details?.city || 'Los Angeles');
    await this.zipcodeInput.fill(details?.zipcode || '90001');
    await this.mobileNumberInput.fill(details?.mobile || '1234567890');

    await this.createAccountBtn.click();
  }

  async verifyAccountCreated() {
    await expect(this.accountCreatedHeader).toBeVisible();
    await expect(this.accountCreatedHeader).toHaveText(/ACCOUNT CREATED!/i);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async verifyAccountDeleted() {
    await expect(this.accountDeletedHeader).toBeVisible();
    await expect(this.accountDeletedHeader).toHaveText(/ACCOUNT DELETED!/i);
  }
}
