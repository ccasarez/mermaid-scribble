const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

class MermaidEditorWorld {
  constructor() {
    this.dom = null;
    this.window = null;
    this.document = null;
    this.canvas = null;
  }

  async loadApp() {
    // Read the HTML file - try multiple locations
    let html;

    const possiblePaths = [
      path.join(__dirname, '../../../mermaid-editor.html'),  // tests/features/support -> repo root
      path.join(process.cwd(), 'mermaid-editor.html'),       // run from repo root
      path.join(process.cwd(), '..', 'mermaid-editor.html')  // run from tests/
    ];
    
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        html = fs.readFileSync(p, 'utf8');
        break;
      }
    }
    
    if (!html) {
      throw new Error('Could not find mermaid-editor.html');
    }

    // Inject mock mode flag BEFORE the app scripts run
    html = html.replace(
      '<script>',
      `<script>
      // Injected by test harness
      window.MOCK_LLM = true;
      window.TEST_MODE = true;
      `
    );

    // Create JSDOM instance with required features
    this.dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      pretendToBeVisual: true,
      url: 'http://localhost'
    });

    this.window = this.dom.window;
    this.document = this.window.document;

    // Mock fabric.js Canvas since JSDOM doesn't support real canvas
    this.mockFabricCanvas();
    
    // Wait for DOMContentLoaded
    await new Promise(resolve => {
      if (this.document.readyState === 'complete') {
        resolve();
      } else {
        this.window.addEventListener('DOMContentLoaded', resolve);
      }
    });
  }

  mockFabricCanvas() {
    // Create a mock fabric object for testing without real canvas
    this.window.fabric = {
      Canvas: class MockCanvas {
        constructor() {
          this.objects = [];
          this.backgroundColor = 'transparent';
          this.isDrawingMode = false;
          this.selection = true;
          this.viewportTransform = [1, 0, 0, 1, 0, 0];
          this.freeDrawingBrush = { color: '#000', width: 1 };
          this._events = {};
        }
        add(obj) { this.objects.push(obj); }
        remove(obj) { 
          const idx = this.objects.indexOf(obj);
          if (idx > -1) this.objects.splice(idx, 1);
        }
        clear() { this.objects = []; }
        getObjects() { return this.objects; }
        getActiveObject() { return this._activeObject; }
        setActiveObject(obj) { this._activeObject = obj; }
        discardActiveObject() { this._activeObject = null; }
        renderAll() {}
        requestRenderAll() {}
        setDimensions() {}
        getZoom() { return 1; }
        zoomToPoint() {}
        setViewportTransform(t) { this.viewportTransform = t; }
        getPointer(e) { return { x: e.clientX || 0, y: e.clientY || 0 }; }
        toDataURL() { return 'data:image/png;base64,mock'; }
        on(event, handler) {
          if (!this._events[event]) this._events[event] = [];
          this._events[event].push(handler);
        }
        setCursor() {}
        set defaultCursor(v) {}
        get upperCanvasEl() {
          return { addEventListener: () => {} };
        }
      },
      Line: class { constructor() { this._isArrow = false; } set() {} },
      Rect: class { constructor() {} set() {} setCoords() {} },
      Ellipse: class { constructor() {} set() {} },
      Polygon: class { constructor() { this._isDiamond = false; } set() {} setCoords() {} },
      Triangle: class { constructor() {} },
      IText: class { 
        constructor(text) { this.text = text; this.isEditing = false; }
        enterEditing() { this.isEditing = true; }
        selectAll() {}
      },
      Group: class { constructor() {} },
      Image: {
        fromURL: (url, callback) => callback(null)
      }
    };

    // Mock mermaid
    this.window.mermaid = {
      initialize: () => {},
      render: async (id, code) => ({ svg: `<svg><text>${code}</text></svg>` })
    };
  }

  // Helper methods for tests
  querySelector(selector) {
    return this.document.querySelector(selector);
  }

  querySelectorAll(selector) {
    return this.document.querySelectorAll(selector);
  }

  click(element) {
    if (typeof element === 'string') {
      element = this.querySelector(element);
    }
    if (element) {
      const event = new this.window.MouseEvent('click', { bubbles: true });
      element.dispatchEvent(event);
    }
  }

  hasClass(element, className) {
    if (typeof element === 'string') {
      element = this.querySelector(element);
    }
    return element && element.classList.contains(className);
  }

  isVisible(element) {
    if (typeof element === 'string') {
      element = this.querySelector(element);
    }
    if (!element) return false;
    const style = this.window.getComputedStyle(element);
    return style.display !== 'none' && !element.classList.contains('hidden');
  }

  getValue(element) {
    if (typeof element === 'string') {
      element = this.querySelector(element);
    }
    return element ? element.value : null;
  }

  setValue(element, value) {
    if (typeof element === 'string') {
      element = this.querySelector(element);
    }
    if (element) {
      element.value = value;
      element.dispatchEvent(new this.window.Event('input', { bubbles: true }));
    }
  }

  getText(element) {
    if (typeof element === 'string') {
      element = this.querySelector(element);
    }
    return element ? element.textContent : null;
  }
}

setWorldConstructor(MermaidEditorWorld);

Before(async function() {
  await this.loadApp();
});

After(function() {
  if (this.dom) {
    this.dom.window.close();
  }
});
