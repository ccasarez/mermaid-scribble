Feature: History Timeline
  As a user
  I want to access my diagram history
  So that I can restore previous versions

  Scenario: Switch to history tab
    Given the application is loaded
    When I click the "History" tab
    Then the History panel should be visible
    And the Code panel should be hidden

  Scenario: Empty history state
    Given the application is loaded
    And no diagrams have been generated
    When I click the "History" tab
    Then I should see an empty state message
    And the message should say "No history yet"

  Scenario: Switch back to code tab
    Given the application is loaded
    And I am on the History tab
    When I click the "Code" tab
    Then the Code panel should be visible
    And the History panel should be hidden
