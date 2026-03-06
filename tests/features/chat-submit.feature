Feature: Chat Submit
  As a user
  I want a chat-style input to instruct the AI
  So that I can describe diagram changes naturally alongside my sketches

  # --- Layout ---

  Scenario: Chat box is visible at the bottom of the canvas area
    Given the application is loaded
    And I dismiss the intro overlay
    Then I should see a chat input area at the bottom of the canvas area
    And the chat input should have a text field
    And the chat input should have a submit button with an up-arrow icon

  Scenario: Submit button replaces the generate button
    Given the application is loaded
    Then the header should not have a "Generate" button
    And the chat input submit button should be present

  Scenario: Draw toolbar is vertical on the left
    Given the application is loaded
    And I dismiss the intro overlay
    Then I should see a vertical toolbar on the left side of the canvas area
    And the vertical toolbar should contain all drawing tools
    And the vertical toolbar should contain the color picker
    And the vertical toolbar should contain the stroke width slider
    And the vertical toolbar should contain the undo button
    And the vertical toolbar should contain the reset zoom button
    And the vertical toolbar should contain the clear button

  Scenario: Code pane has no action buttons
    Given the application is loaded
    Then the code panel should not have an "Apply" button
    And the code panel should not have a "Copy" button

  # --- Submit Button Activation ---

  Scenario: Submit button is disabled by default
    Given the application is loaded
    And I dismiss the intro overlay
    Then the submit button should be disabled

  Scenario: Submit button activates when text is entered in chat box
    Given the application is loaded
    And I dismiss the intro overlay
    And the submit button is disabled
    When I type "add a login node" in the chat input
    Then the submit button should be enabled

  Scenario: Submit button activates when a sketch is added to the canvas
    Given the application is loaded
    And I dismiss the intro overlay
    And the submit button is disabled
    When I draw a shape on the canvas
    Then the submit button should be enabled

  Scenario: Submit button activates when mermaid code is edited
    Given the application is loaded
    And I dismiss the intro overlay
    And a diagram has been generated
    And the submit button is disabled
    When I edit the mermaid code in the code editor
    Then the submit button should be enabled

  Scenario: Submit button deactivates when chat text is cleared
    Given the application is loaded
    And I dismiss the intro overlay
    And I type "add a login node" in the chat input
    And the submit button is enabled
    When I clear the chat input text
    And the canvas has no objects
    And the code editor has no unsaved changes
    Then the submit button should be disabled

  # --- Submit Flow ---

  Scenario: Submitting sends chat text, canvas image, and mermaid code
    Given the application is loaded
    And I dismiss the intro overlay
    And I type "add a database node" in the chat input
    When I click the submit button
    Then the backend should receive the chat text "add a database node"
    And the backend should receive a composite image of the canvas
    And the backend should receive the current mermaid code

  Scenario: Successful submit updates the diagram
    Given the application is loaded
    And I dismiss the intro overlay
    And I type "create a flowchart" in the chat input
    When I click the submit button
    And the backend returns mermaid code
    Then the mermaid diagram should be rendered
    And the code editor should contain the returned mermaid code
    And the diagram should be saved to history

  Scenario: Chat text clears after successful submit
    Given the application is loaded
    And I dismiss the intro overlay
    And I type "create a flowchart" in the chat input
    When I click the submit button
    And the backend returns mermaid code
    Then the chat input should be empty

  Scenario: Submit button disables after successful submit
    Given the application is loaded
    And I dismiss the intro overlay
    And I type "create a flowchart" in the chat input
    When I click the submit button
    And the backend returns mermaid code
    Then the submit button should be disabled

  Scenario: Loading state during submission
    Given the application is loaded
    And I dismiss the intro overlay
    And I type "create a flowchart" in the chat input
    When I click the submit button
    Then I should see a loading indicator
    And the submit button should be disabled during loading

  Scenario: Submit with only canvas sketch and no chat text
    Given the application is loaded
    And I dismiss the intro overlay
    And the chat input is empty
    When I draw a shape on the canvas
    And I click the submit button
    Then the backend should receive an empty chat text
    And the backend should receive a composite image of the canvas

  Scenario: Submit with only code edits
    Given the application is loaded
    And I dismiss the intro overlay
    And a diagram has been generated
    When I edit the mermaid code in the code editor
    And I click the submit button
    Then the backend should receive the edited mermaid code
    And the backend should receive an empty chat text

  # --- Keyboard Interaction ---

  Scenario: Pressing Enter submits the chat input
    Given the application is loaded
    And I dismiss the intro overlay
    And I type "add a node" in the chat input
    When I press Enter in the chat input
    Then the submission should be triggered

  Scenario: Submit via keyboard is blocked when button is disabled
    Given the application is loaded
    And I dismiss the intro overlay
    And the chat input is empty
    And the canvas has no objects
    And the code editor has no unsaved changes
    When I press Enter in the chat input
    Then the submission should not be triggered
