@tc16
Feature: Test Case 16: Place Order: Login before Checkout

  Scenario: Login before checkout and place order successfully
    Given Navigate to url "http://automationexercise.com"
    Then Verify that home page is visible successfully
    When Click "Signup / Login" button
    And Fill all details in Signup and create account
    Then Verify "ACCOUNT CREATED!" and click "Continue" button
    And Verify "Logged in as username" at top
    When Add products to cart
    And Click "Cart" button
    Then Verify that cart page is displayed
    When Click Proceed To Checkout
    Then Verify Address Details and Review Your Order
    When Enter description in comment text area and click "Place Order"
    And Enter payment details: Name on Card, Card Number, CVC, Expiration date
    And Click "Pay and Confirm Order" button on payment page
    Then Verify success message "Your order has been placed successfully!"
    When Click "Delete Account" button
    Then Verify "ACCOUNT DELETED!" and click "Continue" button
