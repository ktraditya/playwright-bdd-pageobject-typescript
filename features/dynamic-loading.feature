Feature: Dynamic loading

  Scenario: Example 1 - element is hidden then rendered visible
    Given I am on dynamic loading example 1
    When I click start
    Then the loading indicator should be visible
    And the finish text should eventually read "Hello World!"

  Scenario: Example 2 - element is added to the DOM after loading
    Given I am on dynamic loading example 2
    Then the finish element should be hidden
    When I click start
    Then the loading indicator should be visible
    And the finish text should eventually read "Hello World!"
