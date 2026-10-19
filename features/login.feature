Feature: User Authentication

  @login
  Scenario: Login with valid credentials
    Given Navigate to url "http://automationexercise.com"
    Then Verify that home page is visible successfully
    When Click "Signup / Login" button
    And Fill email "testuser@example.com", password "Password123!" and click "Login" button
