Feature: Canvas Actions
  As a user
  I want to perform actions on the canvas
  So that I can manage my drawings

  Scenario: Undo button exists
    Given the application is loaded
    And I dismiss the intro overlay
    Then I should see an "Undo" button in the toolbar

  Scenario: Clear canvas button exists
    Given the application is loaded
    And I dismiss the intro overlay
    Then I should see a "Clear Canvas" button in the toolbar

  Scenario: Reset zoom button exists
    Given the application is loaded
    And I dismiss the intro overlay
    Then I should see a "Reset Zoom" button in the toolbar

  Scenario: Delete key removes selected object
    Given the application is loaded
    And I dismiss the intro overlay
    And there is an object selected on the canvas
    When I press the "Delete" key
    Then the selected object should be removed

  Scenario: Backspace key removes selected object
    Given the application is loaded
    And I dismiss the intro overlay
    And there is an object selected on the canvas
    When I press the "Backspace" key
    Then the selected object should be removed
