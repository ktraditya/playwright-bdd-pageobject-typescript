Feature: Dropdown

  Background:
    Given I am on the dropdown page

  Scenario: Default value is the placeholder
    Then the dropdown value should be ""

  Scenario Outline: Selecting an option updates the value
    When I select the option "<option>"
    Then the dropdown value should be "<value>"

    Examples:
      | option   | value |
      | Option 1 | 1     |
      | Option 2 | 2     |
