import { When, Then } from '@cucumber/cucumber';
import { page } from '../support/hooks';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';

let homePage: HomePage;
let productsPage: ProductsPage;
let productDetailPage: ProductDetailPage;
let cartPage: CartPage;

export let lastAddedSearchedProductNames: string[] = [];

function getPages() {
  homePage = new HomePage(page);
  productsPage = new ProductsPage(page);
  productDetailPage = new ProductDetailPage(page);
  cartPage = new CartPage(page);
}

When('Hover over first product and click {string}', async function (_btnText: string) {
  getPages();
  await productsPage.addProductByIndex(0);
});

When('Click {string} button in modal', async function (btnName: string) {
  getPages();
  if (btnName === 'Continue Shopping') {
    await productsPage.clickContinueShopping();
  } else if (btnName === 'View Cart') {
    await productsPage.clickViewCartModal();
  }
});

When('Hover over second product and click {string}', async function (_btnText: string) {
  getPages();
  await productsPage.addProductByIndex(1);
});

When('Click {string} for any product on home page', async function (_btnText: string) {
  getPages();
  await homePage.clickFirstViewProduct();
});

Then('Verify product detail is opened', async function () {
  getPages();
  await productDetailPage.verifyProductDetailPageVisible();
});

When('Increase quantity to {int}', async function (quantity: number) {
  getPages();
  await productDetailPage.setQuantity(quantity);
});

When('Click {string} button on product detail page', async function (_btnText: string) {
  getPages();
  await productDetailPage.clickAddToCart();
});

When('Add products to cart', async function () {
  getPages();
  await homePage.addFirstProductToCart();
  await homePage.clickContinueShopping();
});

// TC20 steps
Then('Verify user is navigated to ALL PRODUCTS page successfully', async function () {
  getPages();
  await productsPage.verifyProductsPageVisible();
});

When('Enter product name in search input and click search button', async function () {
  getPages();
  await productsPage.searchProducts('Tshirt');
});

When('Enter product name {string} in search input and click search button', async function (productName: string) {
  getPages();
  await productsPage.searchProducts(productName);
});

Then('Verify {string} is visible', async function (text: string) {
  getPages();
  if (text.toUpperCase().includes('SEARCHED PRODUCTS')) {
    await productsPage.verifySearchedProductsVisible();
  } else if (text.toUpperCase().includes('SUBSCRIPTION')) {
    await homePage.verifySubscriptionVisible();
  } else {
    await page.locator(`text=${text}`).waitFor({ state: 'visible' });
  }
});

Then('Verify all the products related to search are visible', async function () {
  getPages();
  await productsPage.verifyAllSearchedProductsVisible();
});

When('Add those products to cart', async function () {
  getPages();
  lastAddedSearchedProductNames = await productsPage.addAllSearchedProductsToCart();
});

When('Click {string} button and verify that products are visible in cart', async function (_btnName: string) {
  getPages();
  await homePage.clickCart();
  await cartPage.verifyProductsVisibleInCart();
  if (lastAddedSearchedProductNames.length > 0) {
    await cartPage.verifyProductNamesInCart(lastAddedSearchedProductNames);
  }
});

Then('Verify that products are visible in cart', async function () {
  getPages();
  await cartPage.verifyProductsVisibleInCart();
  if (lastAddedSearchedProductNames.length > 0) {
    await cartPage.verifyProductNamesInCart(lastAddedSearchedProductNames);
  }
});

Then('Verify that those products are visible in cart after login as well', async function () {
  getPages();
  await cartPage.verifyProductsVisibleInCart();
  if (lastAddedSearchedProductNames.length > 0) {
    await cartPage.verifyProductNamesInCart(lastAddedSearchedProductNames);
  }
});

// TC25 steps
When('Scroll down page to bottom', async function () {
  getPages();
  await homePage.scrollToBottom();
});

When('Click on arrow at bottom right side to move upward', async function () {
  getPages();
  await homePage.clickScrollUpArrow();
});

Then('Verify that page is scrolled up and {string} text is visible on screen', async function (_expectedText: string) {
  getPages();
  await homePage.verifyScrolledUpAndTextVisible();
});
