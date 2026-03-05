# Mermaid Flow Editor - BDD Specifications

## Overview

Mermaid Flow Editor is an LLM-powered diagram editing tool that combines a drawing canvas with AI-assisted Mermaid diagram generation. Users can sketch diagrams, import existing Mermaid code, annotate rendered diagrams, and iteratively refine their work through natural visual markup.

---

## Feature: Application Layout

### Scenario: Initial application structure
```
Given the application is loaded
Then I should see a header bar at the top
And I should see a main canvas area on the left
And I should see a sidebar panel on the right (360px wide)
And the canvas area should have a dark background (#0d0d12)
```

### Scenario: Header contains core actions
```
Given the application is loaded
Then the header should display the logo "Mermaid Flow Editor"
And the header should have an "Import" button
And the header should have an "Export" button
And the header should have a "Generate" button (primary styled)
```

### Scenario: Sidebar has tabbed interface
```
Given the application is loaded
Then the sidebar should have two tabs: "Code" and "History"
And the "Code" tab should be active by default
And the Code panel should contain a code editor textarea
And the Code panel should have "Apply" and "Copy" buttons
```

---

## Feature: Intro Overlay

### Scenario: Show intro on first load
```
Given the application is freshly loaded
Then I should see an intro overlay covering the canvas
And the overlay should display "Create Diagrams with AI" heading
And the overlay should show three steps: "Draw or sketch", "Click Generate", "Refine & iterate"
And there should be a "Start Drawing" button
```

### Scenario: Dismiss intro by clicking start
```
Given the intro overlay is visible
When I click the "Start Drawing" button
Then the intro overlay should be hidden
And I should see the drawing canvas
```

### Scenario: Dismiss intro by importing mermaid code
```
Given the intro overlay is visible
When I import valid Mermaid code
Then the intro overlay should be hidden automatically
And the diagram should be rendered
```

### Scenario: Dismiss intro by applying code from editor
```
Given the intro overlay is visible
When I paste Mermaid code in the code editor
And I click the "Apply" button
Then the intro overlay should be hidden automatically
And the diagram should be rendered
```

---

## Feature: Drawing Canvas

### Scenario: Canvas initialization
```
Given the application is loaded
And the intro overlay is dismissed
Then I should see a Fabric.js canvas
And the canvas should have a transparent background
And the canvas should fill the available space in the canvas area
```

### Scenario: Canvas resizes with window
```
Given the canvas is visible
When I resize the browser window
Then the canvas should adjust to fill the new available space
```

---

## Feature: Drawing Tools

### Scenario: Toolbar visibility and position
```
Given the canvas is visible
Then I should see a floating toolbar at the bottom center of the canvas
And the toolbar should be above all other canvas elements (z-index: 10)
```

### Scenario: Available drawing tools
```
Given the toolbar is visible
Then I should see the following tool buttons in order:
  | Tool     | Icon Description    |
  | Select   | Pointer/cursor      |
  | Pencil   | Pencil icon         |
  | Arrow    | Line with arrowhead |
  | Rectangle| Rounded rectangle   |
  | Diamond  | Diamond shape       |
  | Ellipse  | Ellipse shape       |
  | Text     | Text "T" icon       |
```

### Scenario: Select tool is default
```
Given the canvas is loaded
Then the Select tool should be active by default
And the Select tool button should have an "active" visual state
```

### Scenario: Tool selection
```
Given I am on the canvas
When I click on a tool button (e.g., Pencil)
Then that tool should become active
And the previously active tool should become inactive
And only one tool can be active at a time
```

### Scenario: Color picker
```
Given the toolbar is visible
Then I should see a color picker input
And the default color should be red (#ef4444)
When I select a new color
Then new drawings should use that color
```

### Scenario: Stroke width slider
```
Given the toolbar is visible
Then I should see a stroke width slider
And the range should be 1 to 10
And the default value should be 3
When I adjust the stroke width
Then new drawings should use that width
```

---

## Feature: Select Tool

### Scenario: Select and move objects
```
Given the Select tool is active
And there are objects on the canvas
When I click on an object
Then that object should become selected (show selection handles)
When I drag the selected object
Then the object should move with my cursor
```

### Scenario: Multi-select with drag
```
Given the Select tool is active
And there are multiple objects on the canvas
When I click and drag to create a selection box
Then all objects within the box should become selected
```

---

## Feature: Pencil Tool (Freehand Drawing)

### Scenario: Freehand drawing
```
Given the Pencil tool is active
When I click and drag on the canvas
Then a freehand path should be drawn following my cursor
And the path should use the current color
And the path should use the current stroke width
When I release the mouse button
Then the path should become a selectable object
```

---

## Feature: Arrow Tool

### Scenario: Draw arrow
```
Given the Arrow tool is active
When I click and drag on the canvas
Then a line should appear from the start point to my cursor
When I release the mouse button
Then an arrowhead should appear at the end point
And the arrow should be a grouped object (line + triangle)
And the arrow should be selectable
```

### Scenario: Arrow styling
```
Given I draw an arrow
Then the arrow line should use the current color
And the arrowhead should be filled with the current color
And the stroke width should affect both line and arrowhead size
```

---

## Feature: Rectangle Tool

### Scenario: Draw rectangle
```
Given the Rectangle tool is active
When I click and drag on the canvas
Then a rectangle should appear and resize as I drag
And the rectangle should have transparent fill
And the rectangle should have a stroke in the current color
When I release the mouse button
Then the rectangle should become a selectable object
```

### Scenario: Rectangle in any direction
```
Given the Rectangle tool is active
When I drag from top-left to bottom-right
Then the rectangle should draw correctly
When I drag from bottom-right to top-left
Then the rectangle should still draw correctly (not inverted)
```

---

## Feature: Diamond Tool

### Scenario: Draw diamond
```
Given the Diamond tool is active
When I click and drag on the canvas
Then a diamond shape should appear (rotated square)
And the diamond should be centered in the bounding box of my drag
And the diamond should have transparent fill
And the diamond should have a stroke in the current color
When I release the mouse button
Then the diamond should become a selectable object
```

### Scenario: Diamond proportions
```
Given I draw a diamond
Then the diamond points should be:
  - Top point at horizontal center, top edge
  - Right point at right edge, vertical center
  - Bottom point at horizontal center, bottom edge
  - Left point at left edge, vertical center
```

---

## Feature: Ellipse Tool

### Scenario: Draw ellipse
```
Given the Ellipse tool is active
When I click and drag on the canvas
Then an ellipse should appear and resize as I drag
And the ellipse should have transparent fill
And the ellipse should have a stroke in the current color
When I release the mouse button
Then the ellipse should become a selectable object
```

---

## Feature: Text Tool

### Scenario: Add text
```
Given the Text tool is active
When I click on the canvas
Then a text object should be created at that position
And the text should contain placeholder "Type here"
And the text should immediately enter edit mode
And all placeholder text should be selected
And I should be able to type to replace it
```

### Scenario: Text styling
```
Given I create a text object
Then the text should use the font "Outfit"
And the text should use the current color
And the font size should be 20px
```

### Scenario: Edit existing text
```
Given there is a text object on the canvas
And the Select tool is active
When I double-click the text object
Then the text should enter edit mode
And I should be able to modify the text content
```

---

## Feature: Canvas Actions

### Scenario: Undo last action
```
Given there are objects on the canvas
When I click the Undo button in the toolbar
Then the most recently added object should be removed
```

### Scenario: Clear canvas
```
Given there are objects on the canvas
And there is a rendered Mermaid diagram
When I click the Clear button in the toolbar
Then all objects should be removed from the canvas
And the Mermaid diagram should be cleared
```

### Scenario: Delete selected object with keyboard
```
Given an object is selected on the canvas
And I am not editing text
When I press the Delete key
Then the selected object should be removed
When I press the Backspace key
Then the selected object should be removed
```

### Scenario: Do not delete while editing text
```
Given a text object is in edit mode
When I press the Delete or Backspace key
Then the key should affect the text content
And the text object should NOT be deleted
```

---

## Feature: Canvas Zoom

### Scenario: Zoom with mouse wheel
```
Given the canvas is visible
When I scroll the mouse wheel up
Then the canvas should zoom in
When I scroll the mouse wheel down
Then the canvas should zoom out
```

### Scenario: Zoom limits
```
Given I am zooming the canvas
Then the minimum zoom level should be 0.25x (25%)
And the maximum zoom level should be 5x (500%)
```

### Scenario: Zoom toward cursor
```
Given I position my cursor over a specific point on the canvas
When I zoom in with the mouse wheel
Then the zoom should center on my cursor position
And the point under my cursor should remain under my cursor
```

### Scenario: Mermaid diagram scales with zoom
```
Given a Mermaid diagram is rendered
When I zoom the canvas
Then the Mermaid diagram should scale proportionally
```

---

## Feature: Canvas Pan

### Scenario: Pan with right-click drag
```
Given the canvas is visible
When I right-click and hold on the canvas
Then the cursor should change to "grabbing"
When I drag while holding right-click
Then the canvas viewport should move with my drag
And the movement should be relative to where I clicked (anchored)
When I release the right-click
Then the cursor should return to default
```

### Scenario: Pan moves mermaid overlay
```
Given a Mermaid diagram is rendered
When I pan the canvas with right-click drag
Then the Mermaid diagram should move with the canvas
And annotations should stay aligned with the diagram
```

### Scenario: No context menu on right-click
```
Given the canvas is visible
When I right-click on the canvas
Then the browser context menu should NOT appear
```

---

## Feature: Reset Zoom

### Scenario: Reset zoom button
```
Given the canvas is zoomed and/or panned
When I click the Reset Zoom button (arrows icon in toolbar)
Then the zoom level should reset to 100%
And the pan offset should reset to origin (0, 0)
And the Mermaid diagram overlay should reset position
```

---

## Feature: Import Mermaid Code

### Scenario: Open import modal
```
Given I am on the application
When I click the "Import" button in the header
Then an import modal should appear
And the modal should have a textarea for pasting code
And the modal should have "Cancel" and "Import" buttons
```

### Scenario: Cancel import
```
Given the import modal is open
When I click "Cancel"
Then the modal should close
And no changes should be made
```

### Scenario: Import valid code
```
Given the import modal is open
When I paste valid Mermaid code into the textarea
And I click "Import"
Then the modal should close
And the Mermaid diagram should be rendered on the canvas
And the code should appear in the code editor
And the intro overlay should be hidden (if visible)
And a success toast should appear
```

### Scenario: Close modal by clicking outside
```
Given the import modal is open
When I click outside the modal (on the overlay)
Then the modal should close
```

---

## Feature: Export Mermaid Code

### Scenario: Export current diagram
```
Given there is Mermaid code in the editor
When I click the "Export" button in the header
Then a file download should be triggered
And the file should be named "diagram.mmd"
And the file should contain the current Mermaid code
And a success toast should appear
```

### Scenario: Export with no diagram
```
Given there is no Mermaid code
When I click the "Export" button
Then an error toast should appear saying "No diagram to export"
```

---

## Feature: Code Editor

### Scenario: Code editor displays current code
```
Given a Mermaid diagram has been generated or imported
Then the code editor should display the current Mermaid code
```

### Scenario: Apply code changes
```
Given I have modified the code in the editor
When I click the "Apply" button
Then the Mermaid diagram should re-render with the new code
And the history should be updated
And the intro overlay should be hidden (if visible)
```

### Scenario: Copy code to clipboard
```
Given there is code in the editor
When I click the "Copy" button
Then the code should be copied to the clipboard
And a success toast should appear saying "Code copied to clipboard"
```

### Scenario: Code editor placeholder
```
Given no diagram has been created
Then the code editor should show placeholder text with an example
```

---

## Feature: Mermaid Rendering

### Scenario: Render diagram in overlay
```
Given valid Mermaid code is applied
Then the diagram should render as an SVG
And the diagram should appear in a white card with rounded corners
And the diagram should be centered in the canvas area
And the diagram should be behind the drawing canvas (z-index: 1)
```

### Scenario: Drawing layer is above diagram
```
Given a Mermaid diagram is rendered
When I draw on the canvas
Then my drawings should appear on top of the diagram
And my drawings should be visible over the diagram
```

### Scenario: Handle invalid Mermaid syntax
```
Given I apply invalid Mermaid code
Then an error toast should appear with the syntax error
And the previous diagram should remain (if any)
```

---

## Feature: Generate Diagram with AI

### Scenario: Generate from blank canvas with drawings
```
Given I have drawn shapes on a blank canvas
When I click the "Generate" button
Then a loading overlay should appear with "Generating diagram..."
And the canvas should be captured as an image
And the image should be sent to the Claude API
And the AI should interpret my drawings as a Mermaid diagram
And the resulting code should be rendered
And the code should appear in the editor
And a success toast should appear
```

### Scenario: Generate with existing diagram and annotations
```
Given a Mermaid diagram is rendered
And I have drawn annotations on top of it (crossed out boxes, new arrows, text notes)
When I click the "Generate" button
Then a composite image should be captured (diagram + annotations)
And the current Mermaid code should be included in the prompt
And the AI should interpret my annotations as edits to the existing diagram
And the modified code should be rendered
```

### Scenario: Composite image capture
```
Given I click Generate
Then the captured image should include:
  - A white background
  - The rendered Mermaid diagram (if present)
  - All user annotations on top
And the image should be a PNG
```

### Scenario: Loading state during generation
```
Given I click Generate
Then a loading overlay should cover the canvas
And a spinner should be visible
And the overlay should say "Generating diagram..."
When generation completes (success or error)
Then the loading overlay should disappear
```

### Scenario: Generation error handling
```
Given I click Generate
And the API request fails
Then an error toast should appear
And the loading overlay should disappear
And the previous state should be preserved
```

### Scenario: AI prompt includes current code
```
Given there is existing Mermaid code
When I generate a new diagram
Then the prompt should include the current Mermaid code
And the prompt should instruct the AI to use it as a starting point
```

### Scenario: AI interprets visual annotations
```
Given the AI receives an annotated diagram
Then it should interpret:
  - Crossed-out boxes as "remove these nodes"
  - Crossed-out lines/arrows as "remove these connections"
  - New drawn boxes/shapes as "add new nodes"
  - Redrawn arrows as "update connections"
  - Handwritten text as "labels or renames"
  - Comments/notes as "instructions for modifications"
```

---

## Feature: History Timeline

### Scenario: Switch to history tab
```
Given I am on the application
When I click the "History" tab in the sidebar
Then the history panel should become visible
And the code panel should be hidden
```

### Scenario: Empty history state
```
Given no diagrams have been generated
When I view the history tab
Then I should see an empty state message
And the message should say "No history yet"
```

### Scenario: History entries after generation
```
Given I have generated one or more diagrams
When I view the history tab
Then I should see a list of history entries
And each entry should have:
  - A thumbnail image
  - A version number (e.g., "Version 1")
  - A timestamp
  - A restore button
And entries should be in reverse chronological order (newest first)
```

### Scenario: Restore from history
```
Given I have multiple history entries
When I click the restore button on an older entry
Then that diagram should be restored
And the code editor should update with that version's code
And a success toast should appear saying "Restored from history"
And the restored entry should be marked as active
```

---

## Feature: Toast Notifications

### Scenario: Success toast
```
Given an action completes successfully
Then a toast should appear at the bottom center
And the toast should have a green border
And the toast should disappear after 3 seconds
```

### Scenario: Error toast
```
Given an action fails
Then a toast should appear at the bottom center
And the toast should have a red border
And the toast should disappear after 3 seconds
```

### Scenario: Warning toast
```
Given an action partially succeeds
Then a toast should appear with an orange/yellow border
```

---

## Feature: Responsive Behavior

### Scenario: Canvas area fills available space
```
Given the browser window is resized
Then the canvas area should fill the space between header and bottom
And the canvas area should fill the space left of the sidebar
```

### Scenario: Sidebar maintains fixed width
```
Given the browser window is resized
Then the sidebar should maintain its 360px width
```

---

## Technical Specifications

### Canvas Technology
- Uses Fabric.js for canvas manipulation
- Canvas has `fireRightClick: true` and `stopContextMenu: true` options
- Canvas background is transparent to show mermaid overlay beneath

### Layer Stack (z-index order)
1. Mermaid overlay (z-index: 1) - rendered diagram
2. Drawing canvas (z-index: 2) - user annotations
3. Toolbar (z-index: 10) - drawing tools
4. Intro overlay (z-index: 50) - welcome screen
5. Loading overlay (z-index: 100) - generation spinner
6. Modal overlay (z-index: 1000) - import dialog

### API Integration
- Uses Anthropic Claude API (claude-sonnet-4-6-20250217 model)
- Sends images as base64 PNG
- Max tokens: 4096
- Expects raw Mermaid code response (no markdown formatting)

### LLM Backend Architecture
The app uses a dual-backend system for development flexibility:

```
┌─────────────────────────────────────────────────────────────┐
│                     Mermaid Flow Editor                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              LLMBackend.generate()                   │    │
│  │  Unified interface for diagram generation            │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│            ┌─────────────┴─────────────┐                    │
│            ▼                           ▼                    │
│  ┌─────────────────┐         ┌─────────────────┐           │
│  │ MockLLMBackend  │         │ ProductionLLM   │           │
│  │                 │         │    Backend      │           │
│  │ • Deterministic │         │                 │           │
│  │ • Fast (~500ms) │         │ • Real Claude   │           │
│  │ • No API calls  │         │ • Full vision   │           │
│  │ • BDD testable  │         │ • Artifact auth │           │
│  └─────────────────┘         └─────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

**Environment Detection (AppConfig):**
- `isArtifact`: Detects Claude.ai artifact runtime
- `isDevMode`: Detects localhost, file://, or `?mode=dev`
- `mode`: Returns 'mock' or 'production'

**Mock Mode Triggers:**
- `window.MOCK_LLM = true` (set programmatically)
- `?mode=dev` query parameter
- Running on localhost or file://
- Test harness injection

**Mock Response Logic:**
- Empty canvas → Default empty diagram
- Single shape → Simple flowchart
- Diamond drawn → Decision node flowchart
- Multiple shapes → Multi-node diagram
- Existing code + annotations → Modified version

**Exposed Testing API (`window.MermaidEditor`):**
- `getConfig()` - Returns AppConfig
- `getCanvas()` - Returns Fabric.js canvas
- `getMermaidCode()` - Returns current mermaid code
- `setMockMode(bool)` - Enable/disable mock mode
- `generate()` - Trigger generation
- `import(code)` - Import mermaid code

### Mermaid Configuration
- Uses Mermaid.js v10.6.1
- Theme: default
- Security level: loose
- startOnLoad: false (manual rendering)

### Styling
- Font families: Outfit (UI), JetBrains Mono (code)
- Color scheme: Dark theme with purple accent (#6366f1)
- Border radius: 8-16px on components
- Uses CSS custom properties for theming

### Keyboard Shortcuts
- Delete/Backspace: Remove selected object (when not editing text)

### Mouse Controls
- Left click: Tool actions (draw, select, etc.)
- Right click + drag: Pan canvas
- Mouse wheel: Zoom in/out

---

## Data Flow

### Generation Flow
```
1. User clicks Generate
2. Hide intro overlay (if visible)
3. Create composite canvas:
   a. Fill with white background
   b. Draw mermaid SVG (if present)
   c. Draw fabric canvas annotations on top
4. Convert to PNG data URL
5. Show loading overlay
6. Send to Claude API with:
   - Composite image (base64)
   - Current mermaid code (if any)
   - Interpretation instructions
7. Receive raw mermaid code
8. Clean markdown formatting (if any)
9. Update mermaidCode state
10. Update code editor
11. Render mermaid diagram
12. Save to history
13. Hide loading overlay
14. Show success toast
```

### Import Flow
```
1. User clicks Import
2. Show import modal
3. User pastes code
4. User clicks Import button
5. Update mermaidCode state
6. Update code editor
7. Render mermaid diagram
8. Hide intro overlay
9. Hide modal
10. Show success toast
```

### Apply Code Flow
```
1. User modifies code in editor
2. User clicks Apply
3. Hide intro overlay (if visible)
4. Update mermaidCode state
5. Render mermaid diagram
6. Save to history
```
