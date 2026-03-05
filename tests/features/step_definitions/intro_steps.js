const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

Then('I should see the intro overlay', function() {
  const intro = this.querySelector('#introOverlay');
  expect(intro).to.exist;
  expect(this.hasClass(intro, 'hidden')).to.be.false;
});

Then('the intro should display {string}', function(text) {
  const intro = this.querySelector('#introOverlay');
  expect(this.getText(intro)).to.include(text);
});

Then('I should see a {string} button', function(buttonText) {
  const buttons = this.querySelectorAll('button');
  const found = Array.from(buttons).some(btn => 
    this.getText(btn).toLowerCase().includes(buttonText.toLowerCase())
  );
  expect(found, `Expected to find button with text "${buttonText}"`).to.be.true;
});

Given('the intro overlay is visible', function() {
  const intro = this.querySelector('#introOverlay');
  expect(intro).to.exist;
  expect(this.hasClass(intro, 'hidden')).to.be.false;
});

When('I click the {string} button', function(buttonText) {
  const buttons = this.querySelectorAll('button');
  const button = Array.from(buttons).find(btn => 
    this.getText(btn).toLowerCase().includes(buttonText.toLowerCase())
  );
  expect(button, `Could not find button with text "${buttonText}"`).to.exist;
  this.click(button);
});

Then('the intro overlay should be hidden', function() {
  const intro = this.querySelector('#introOverlay');
  expect(this.hasClass(intro, 'hidden')).to.be.true;
});

When('I open the import modal', function() {
  const importBtn = this.querySelector('#importBtn');
  this.click(importBtn);
});

When('I enter valid Mermaid code', function() {
  const textarea = this.querySelector('#importCode');
  this.setValue(textarea, 'flowchart TD\n    A[Start] --> B[End]');
});

When('I confirm the import', function() {
  const confirmBtn = this.querySelector('#confirmImport');
  this.click(confirmBtn);
});

When('I enter Mermaid code in the editor', function() {
  const editor = this.querySelector('#codeEditor');
  this.setValue(editor, 'flowchart TD\n    A[Start] --> B[End]');
});
