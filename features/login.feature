Feature: User Authentication

  @login
  Scenario: Login user with correct email and password
    Given Navigate to url "http://automationexercise.com"
    Then Verify that home page is visible successfully
    When Click "Signup / Login" button
    And Fill email, password and click "Login" button
    Then Verify "Logged in as username" at top
    When Click "Delete Account" button
    Then Verify "ACCOUNT DELETED!" and click "Continue" button
