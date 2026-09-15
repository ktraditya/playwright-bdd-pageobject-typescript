Feature: Login form
  As a user of the-internet.herokuapp.com
  I want to log in and out of the secure area
  So that I know the auth flow behaves correctly

  Background:
    Given I am on the login page

  Scenario: Valid credentials log the user in
    When I log in with username "tomsmith" and password "SuperSecretPassword!"
    Then I should see the flash message "You logged into a secure area!"
    And I should be on the secure page

  Scenario: Invalid username shows an error
    When I log in with username "invalidUser" and password "SuperSecretPassword!"
    Then I should see the flash message "Your username is invalid!"

  Scenario: Invalid password shows an error
    When I log in with username "tomsmith" and password "wrongPassword"
    Then I should see the flash message "Your password is invalid!"

  Scenario: Logging out returns to the login page
    Given I have logged in with username "tomsmith" and password "SuperSecretPassword!"
    When I log out
    Then I should see the flash message "You logged out of the secure area!"
    And I should be on the login page
