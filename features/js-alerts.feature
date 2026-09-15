Feature: JavaScript alerts

  Background:
    Given I am on the JS alerts page

  Scenario: Accepting a JS alert
    When I trigger the alert and accept it
    Then the result should read "You successfully clicked an alert"

  Scenario: Accepting a JS confirm
    When I trigger the confirm and accept it
    Then the result should read "You clicked: Ok"

  Scenario: Dismissing a JS confirm
    When I trigger the confirm and dismiss it
    Then the result should read "You clicked: Cancel"

  Scenario: Entering text into a JS prompt
    When I trigger the prompt and enter "Playwright"
    Then the result should read "You entered: Playwright"
