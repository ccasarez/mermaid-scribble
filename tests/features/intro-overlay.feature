Feature: Intro Overlay
  As a new user
  I want to see an introduction screen
  So that I understand how to use the application

  Scenario: Show intro on first load
    Given the application is loaded
    Then I should see the intro overlay
    And the intro should display "Create Diagrams with AI"
    And I should see a "Start Drawing" button

  Scenario: Dismiss intro by clicking start
    Given the application is loaded
    And the intro overlay is visible
    When I click the "Start Drawing" button
    Then the intro overlay should be hidden

  Scenario: Dismiss intro by importing mermaid code
    Given the application is loaded
    And the intro overlay is visible
    When I open the import modal
    And I enter valid Mermaid code
    And I confirm the import
    Then the intro overlay should be hidden
