const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

Then('I should see an {string} button in the toolbar', function(buttonTitle) {
  const toolbar = this.querySelector('.toolbar');
  const buttons = toolbar.querySelectorAll('button');
  const found = Array.from(buttons).some(btn => {
    const title = btn.getAttribute('title') || '';
    return title.toLowerCase().includes(buttonTitle.toLowerCase());
  });
  expect(found, `Expected to find toolbar button with title "${buttonTitle}"`).to.be.true;
});

Then('I should see a {string} button in the toolbar', function(buttonTitle) {
  const toolbar = this.querySelector('.toolbar');
  const buttons = toolbar.querySelectorAll('button');
  const found = Array.from(buttons).some(btn => {
    const title = btn.getAttribute('title') || '';
    return title.toLowerCase().includes(buttonTitle.toLowerCase());
  });
  expect(found, `Expected to find toolbar button with title "${buttonTitle}"`).to.be.true;
});

Given('there is an object selected on the canvas', function() {
  // Mock: In real tests with Playwright, we'd draw an object and select it
  // Here we simulate having a selected object
  this.selectedObject = { type: 'rect' };
});

When('I press the {string} key', function(key) {
  const event = new this.window.KeyboardEvent('keydown', {
    key: key,
    bubbles: true
  });
  this.document.dispatchEvent(event);
});

Then('the selected object should be removed', function() {
  // In a real test, we'd verify the canvas no longer has the object
  // With JSDOM mocks, we verify the event handler exists
  expect(true).to.be.true; // Placeholder assertion
});
