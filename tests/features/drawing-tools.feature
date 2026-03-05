Feature: Drawing Tools
  As a user
  I want various drawing tools
  So that I can create and annotate diagrams

  Scenario: Select tool is default
    Given the application is loaded
    And I dismiss the intro overlay
    Then the Select tool should be active by default

  Scenario: Available drawing tools
    Given the application is loaded
    And I dismiss the intro overlay
    Then I should see the following tools in the toolbar:
      | tool     |
      | select   |
      | pencil   |
      | line     |
      | rect     |
      | diamond  |
      | ellipse  |
      | text     |

  Scenario: Tool selection changes active tool
    Given the application is loaded
    And I dismiss the intro overlay
    When I click on the "pencil" tool
    Then the "pencil" tool should be active
    And the "select" tool should not be active

  Scenario: Only one tool can be active at a time
    Given the application is loaded
    And I dismiss the intro overlay
    When I click on the "rect" tool
    And I click on the "ellipse" tool
    Then only the "ellipse" tool should be active

  Scenario: Color picker has default value
    Given the application is loaded
    And I dismiss the intro overlay
    Then the color picker should have value "#ef4444"

  Scenario: Stroke width slider has default value
    Given the application is loaded
    And I dismiss the intro overlay
    Then the stroke width slider should have value "3"
