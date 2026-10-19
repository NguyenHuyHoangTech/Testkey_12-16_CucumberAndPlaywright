import { When, Then } from '@cucumber/cucumber';
import { page } from '../support/hooks';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { lastRegistrationDetails } from './login.steps';

let cartPage: CartPage;
let checkoutPage: CheckoutPage;
let paymentPage: PaymentPage;

function getPages() {
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
  paymentPage = new PaymentPage(page);
}

Then('Verify that cart page is displayed', async function () {
  getPages();
  await cartPage.verifyCartPageVisible();
});

Then('Verify both products are added to Cart', async function () {
  getPages();
  await cartPage.verifyProductCount(2);
});

Then('Verify their prices, quantity and total price', async function () {
  getPages();
  await cartPage.verifyProductDetails(0);
  await cartPage.verifyProductDetails(1);
});

Then('Verify that product is displayed in cart page with exact quantity {int}', async function (expectedQty: number) {
  getPages();
  await cartPage.verifyProductQuantity(0, expectedQty);
});

When('Click Proceed To Checkout', async function () {
  getPages();
  await cartPage.clickProceedToCheckout();
});

When('Click {string} button on checkout modal', async function (btnName: string) {
  getPages();
  if (btnName.includes('Register') || btnName.includes('Login')) {
    await cartPage.clickRegisterLoginModal();
  }
});

Then('Verify Address Details and Review Your Order', async function () {
  getPages();
  await checkoutPage.verifyAddressDetails();
  await checkoutPage.verifyOrderReview();
});

Then('Verify that the delivery address is same address filled at the time registration of account', async function () {
  getPages();
  await checkoutPage.verifyDeliveryAddressMatches(lastRegistrationDetails);
});

Then('Verify that the billing address is same address filled at the time registration of account', async function () {
  getPages();
  await checkoutPage.verifyBillingAddressMatches(lastRegistrationDetails);
});

When('Enter description in comment text area and click {string}', async function (_btnName: string) {
  getPages();
  await checkoutPage.enterComment('Testing order placement automation flow with Playwright and Cucumber.');
  await checkoutPage.clickPlaceOrder();
});

When('Enter payment details: Name on Card, Card Number, CVC, Expiration date', async function () {
  getPages();
  await paymentPage.enterPaymentDetails('Test Cardholder', '4111111111111111', '123', '12', '2028');
});

When('Click {string} button on payment page', async function (_btnName: string) {
  getPages();
  await paymentPage.clickPayAndConfirm();
});

Then('Verify success message {string}', async function (_expectedMsg: string) {
  getPages();
  await paymentPage.verifySuccessMessage();
});
