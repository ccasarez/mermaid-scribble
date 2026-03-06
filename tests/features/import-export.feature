Feature: Import and Export Mermaid Code
  As a user
  I want to import and export Mermaid code
  So that I can work with existing diagrams and save my work

  Scenario: Open import modal
    Given the application is loaded
    When I click the "Import" button in the header
    Then the import modal should be visible
    And the modal should have a textarea for code
    And the modal should have a "Cancel" button
    And the modal should have an "Import" button

  Scenario: Cancel import closes modal
    Given the application is loaded
    And the import modal is open
    When I click the "Cancel" button in the modal
    Then the import modal should be hidden

  Scenario: Import valid Mermaid code
    Given the application is loaded
    And the import modal is open
    When I enter the following Mermaid code:
      """
      flowchart TD
          A[Start] --> B[End]
      """
    And I click the "Import" button in the modal
    Then the import modal should be hidden
    And the code editor should contain the imported code

  Scenario: Export with no diagram shows error
    Given the application is loaded
    And the code editor is empty
    When I click the "Export" button in the header
    Then I should see an error toast
