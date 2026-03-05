# Mermaid Flow Editor

A single-file diagram editor that turns hand-drawn sketches into Mermaid diagrams using Claude's vision. Deploy it as a Claude artifact and it works immediately with your existing Claude account.

## How It Works

1. **Draw** shapes, arrows, and text on the canvas
2. **Generate** to send your sketch to Claude, which interprets it as a Mermaid diagram
3. **Annotate** the rendered diagram (cross out nodes, draw new connections, add notes)
4. **Generate again.** Claude reads your annotations and updates the diagram accordingly

The editor keeps a version history so you can restore any previous iteration.

## Deploy as a Claude Artifact

Open [mermaid-editor.html](mermaid-editor.html), copy the entire file contents, and paste them into a Claude conversation as an artifact. That's it. The app detects it's running on `claude.ai` and uses Claude's built-in API access for diagram generation.

When running as an artifact, the app operates in **production mode**: the Generate button sends a canvas screenshot to Claude's vision API, which returns Mermaid syntax.

## Local Development

Open `mermaid-editor.html` directly in a browser (`file://` protocol) or serve it from `localhost`. Either way, the app automatically switches to **mock mode**, which returns deterministic diagram responses without any API calls. A yellow "Mock" badge appears in the header so you always know which mode you're in.

Mock mode picks a response based on what's on the canvas:

| Canvas state | Mock response |
|---|---|
| Empty | Default placeholder diagram |
| Diamond shape drawn | Decision-node flowchart |
| 4+ objects | Multi-node diagram |
| 2-3 objects | Simple flow with decision |
| Existing code + new drawings | Modified version of existing code |

You can also force mock mode programmatically:

```js
window.MermaidEditor.setMockMode(true);
```

### Exposed API

The `window.MermaidEditor` object provides a testing/debugging interface:

```js
MermaidEditor.getConfig()       // AppConfig (mode, isArtifact, isDevMode)
MermaidEditor.getCanvas()       // Fabric.js canvas instance
MermaidEditor.getMermaidCode()   // current Mermaid source
MermaidEditor.setMockMode(bool) // toggle mock mode
MermaidEditor.generate()        // trigger generation
MermaidEditor.import(code)      // import Mermaid code
```

## Testing

The test suite uses Cucumber.js with Playwright for BDD-style browser testing. Tests live in the `tests/` directory.

```
tests/
  cucumber.js                         # Cucumber config
  package.json                        # test dependencies
  features/
    layout.feature                    # app structure, header, sidebar
    intro-overlay.feature             # welcome screen behavior
    drawing-tools.feature             # pencil, arrow, rectangle, diamond, ellipse, text
    canvas-actions.feature            # undo, clear, delete, zoom, pan
    history.feature                   # version timeline, restore
    import-export.feature             # import modal, export file download
    step_definitions/                 # step implementations (Playwright)
    support/
      world.js                        # shared test context
```

To run:

```bash
cd tests
npm install
npx cucumber-js
```

## Architecture

The app is a single HTML file with no build step. External dependencies load from CDNs:

- **Fabric.js 5.3.1** for the drawing canvas
- **Mermaid.js 10.6.1** for diagram rendering

### Layer Stack

The canvas area layers five elements by z-index:

1. Mermaid overlay (z-index 1) renders the diagram as an SVG in a white card
2. Drawing canvas (z-index 2) sits on top, transparent, so annotations appear over the diagram
3. Toolbar (z-index 10) floats at bottom center
4. Intro overlay (z-index 50) covers everything on first load
5. Loading spinner (z-index 100) appears during generation

### Dual LLM Backend

`AppConfig` detects the runtime environment and routes generation requests to the right backend:

- **Production** (`claude.ai` / `anthropic.com`): sends the canvas screenshot to the Claude API with a prompt that interprets sketches and annotations
- **Mock** (`localhost`, `file://`, or `?mode=dev`): returns canned responses based on canvas object analysis. No network calls, fast feedback, fully deterministic for testing
