@tc20
Feature: Test Case 20: Search Products and Verify Cart After Login

  Scenario: Search products, add to cart and verify cart after login
    Given Navigate to url "http://automationexercise.com"
    When Click "Products" button
    Then Verify user is navigated to ALL PRODUCTS page successfully
    When Enter product name "Tshirt" in search input and click search button
    Then Verify "SEARCHED PRODUCTS" is visible
    And Verify all the products related to search are visible
    When Add those products to cart
    And Click "Cart" button and verify that products are visible in cart
    When Click "Signup / Login" button and submit login details
    And Again, go to Cart page
    Then Verify that those products are visible in cart after login as well
