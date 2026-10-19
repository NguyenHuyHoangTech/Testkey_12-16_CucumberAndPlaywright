@tc12
Feature: Test Case 12: Add Products in Cart

  Scenario: Add products to cart and verify details
    Given Navigate to url "http://automationexercise.com"
    Then Verify that home page is visible successfully
    When Click "Products" button
    And Hover over first product and click "Add to cart"
    And Click "Continue Shopping" button in modal
    And Hover over second product and click "Add to cart"
    And Click "View Cart" button in modal
    Then Verify both products are added to Cart
    And Verify their prices, quantity and total price
