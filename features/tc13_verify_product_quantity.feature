@tc13
Feature: Test Case 13: Verify Product quantity in Cart

  Scenario: Verify exact product quantity in cart
    Given Navigate to url "http://automationexercise.com"
    Then Verify that home page is visible successfully
    When Click "View Product" for any product on home page
    Then Verify product detail is opened
    When Increase quantity to 4
    And Click "Add to cart" button on product detail page
    And Click "View Cart" button in modal
    Then Verify that cart page is displayed
    And Verify that product is displayed in cart page with exact quantity 4
