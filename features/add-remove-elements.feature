Feature: Add and remove elements

  Background:
    Given I am on the add and remove elements page

  Scenario: Adding elements adds delete buttons
    When I add 3 elements
    Then there should be 3 delete buttons

  Scenario: Removing an element removes its delete button
    When I add 1 element
    And I delete the first element
    Then there should be 0 delete buttons
