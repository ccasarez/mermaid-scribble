Feature: Application Layout
  As a user
  I want a well-organized interface
  So that I can easily create and edit diagrams

  Scenario: Initial application structure
    Given the application is loaded
    Then I should see a header bar at the top
    And I should see a main canvas area
    And I should see a sidebar panel on the right

  Scenario: Header contains core actions
    Given the application is loaded
    Then the header should display the logo "Mermaid Flow"
    And the header should have an "Import" button
    And the header should have an "Export" button

  Scenario: Sidebar has tabbed interface
    Given the application is loaded
    Then the sidebar should have a "Code" tab
    And the sidebar should have a "History" tab
    And the "Code" tab should be active by default
    And the Code panel should contain a code editor

  Scenario: Vertical toolbar is visible on the left
    Given the application is loaded
    And I dismiss the intro overlay
    Then I should see a vertical toolbar on the left side of the canvas area

  Scenario: Chat input is visible at the bottom
    Given the application is loaded
    And I dismiss the intro overlay
    Then I should see a chat input area at the bottom of the canvas area
