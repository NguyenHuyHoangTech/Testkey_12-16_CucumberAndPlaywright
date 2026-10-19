import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../support/hooks';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

let homePage: HomePage;
let loginPage: LoginPage;

function getPages() {
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
}

export let lastRegisteredUsername = 'TestUser';
export let lastRegistrationDetails = {
  title: 'Mr.',
  firstName: 'John',
  lastName: 'Doe',
  company: 'Test Company',
  address1: '123 Test Street',
  address2: 'Suite 1',
  country: 'United States',
  state: 'California',
  city: 'Los Angeles',
  zipcode: '90001',
  mobile: '1234567890',
  email: '',
  password: 'Password123!'
};

Given('Navigate to url {string}', async function (url: string) {
  getPages();
  const targetUrl = url || process.env.BASE_URL || 'https://automationexercise.com';
  await homePage.navigateTo(targetUrl);
});

Then('Verify that home page is visible successfully', async function () {
  getPages();
  await homePage.verifyHomePageVisible();
});

When('Click {string} button', async function (buttonName: string) {
  getPages();
  if (buttonName === 'Signup / Login' || buttonName === 'Login') {
    await homePage.clickSignupLogin();
  } else if (buttonName === 'Products') {
    await homePage.clickProducts();
  } else if (buttonName === 'Cart' || buttonName === 'View Cart') {
    await homePage.clickCart();
  } else if (buttonName === 'Delete Account') {
    await homePage.clickDeleteAccount();
  } else {
    await page.click(`text="${buttonName}"`);
  }
});

When('Fill email {string}, password {string} and click {string} button', async function (email: string, pass: string, _btn: string) {
  getPages();
  await loginPage.login(email, pass);
});

When('Fill all details in Signup and create account', async function () {
  getPages();
  const timestamp = Date.now();
  const randomEmail = `testuser_${timestamp}@mailinator.com`;
  lastRegisteredUsername = 'TestUser';
  lastRegistrationDetails.email = randomEmail;
  await loginPage.fillSignup(lastRegisteredUsername, randomEmail);
  await loginPage.fillAccountDetails(lastRegistrationDetails);
});

When('Fill details in Signup with name {string} and email {string}', async function (name: string, email: string) {
  getPages();
  lastRegisteredUsername = name;
  await loginPage.fillSignup(name, email);
});

When('Click {string} button and submit login details', async function (_btnName: string) {
  getPages();
  const timestamp = Date.now();
  const freshEmail = `testuser_login_${timestamp}@mailinator.com`;
  await page.request.post('https://automationexercise.com/api/createAccount', {
    form: {
      name: 'TestUser',
      email: freshEmail,
      password: lastRegistrationDetails.password,
      title: 'Mr',
      birth_date: '10',
      birth_month: '5',
      birth_year: '1995',
      firstname: lastRegistrationDetails.firstName,
      lastname: lastRegistrationDetails.lastName,
      company: lastRegistrationDetails.company,
      address1: lastRegistrationDetails.address1,
      address2: lastRegistrationDetails.address2,
      country: lastRegistrationDetails.country,
      zipcode: lastRegistrationDetails.zipcode,
      state: lastRegistrationDetails.state,
      city: lastRegistrationDetails.city,
      mobile_number: lastRegistrationDetails.mobile
    }
  });

  await homePage.clickSignupLogin();
  await loginPage.login(freshEmail, lastRegistrationDetails.password);
  await homePage.verifyLoggedInAs('TestUser');
});

When('Again, go to Cart page', async function () {
  getPages();
  await homePage.clickCart();
});

Then('Verify {string} and click {string} button', async function (message: string, buttonText: string) {
  getPages();
  if (message.includes('ACCOUNT CREATED')) {
    await loginPage.verifyAccountCreated();
    await loginPage.clickContinue();
  } else if (message.includes('ACCOUNT DELETED')) {
    await loginPage.verifyAccountDeleted();
    await loginPage.clickContinue();
  } else {
    await page.locator(`text=${message}`).waitFor({ state: 'visible' });
    await page.click(`text="${buttonText}"`);
  }
});

Then('Verify {string} at top', async function (expectedText: string) {
  getPages();
  let username = expectedText.replace(/logged in as/i, '').trim();
  if (!username || username.toLowerCase() === 'username') {
    username = lastRegisteredUsername;
  }
  await homePage.verifyLoggedInAs(username);
});
