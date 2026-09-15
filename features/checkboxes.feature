Feature: Checkboxes

  Background:
    Given I am on the checkboxes page

  Scenario: Default checked state
    Then checkbox 1 should be unchecked
    And checkbox 2 should be checked

  Scenario: Toggling checkboxes
    When I check checkbox 1
    Then checkbox 1 should be checked
    When I uncheck checkbox 2
    Then checkbox 2 should be unchecked
