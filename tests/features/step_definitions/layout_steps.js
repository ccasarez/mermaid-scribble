const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

Given('the application is loaded', async function() {
  // App is loaded in Before hook via world.js
  expect(this.document).to.exist;
});

Then('I should see a header bar at the top', function() {
  const header = this.querySelector('.header');
  expect(header).to.exist;
});

Then('I should see a main canvas area', function() {
  const canvasArea = this.querySelector('.canvas-area');
  expect(canvasArea).to.exist;
});

Then('I should see a sidebar panel on the right', function() {
  const sidebar = this.querySelector('.sidebar');
  expect(sidebar).to.exist;
});

Then('the header should display the logo {string}', function(logoText) {
  const logo = this.querySelector('.logo-text');
  expect(logo).to.exist;
  expect(this.getText(logo)).to.include(logoText);
});

Then('the header should have an {string} button', function(buttonText) {
  const buttons = this.querySelectorAll('.header .btn');
  const found = Array.from(buttons).some(btn => 
    this.getText(btn).toLowerCase().includes(buttonText.toLowerCase())
  );
  expect(found, `Expected to find button with text "${buttonText}"`).to.be.true;
});

Then('the header should have a {string} button', function(buttonText) {
  const buttons = this.querySelectorAll('.header .btn');
  const found = Array.from(buttons).some(btn => 
    this.getText(btn).toLowerCase().includes(buttonText.toLowerCase())
  );
  expect(found, `Expected to find button with text "${buttonText}"`).to.be.true;
});

Then('the sidebar should have a {string} tab', function(tabName) {
  const tabs = this.querySelectorAll('.sidebar-tab');
  const found = Array.from(tabs).some(tab => 
    this.getText(tab).toLowerCase().includes(tabName.toLowerCase())
  );
  expect(found, `Expected to find tab "${tabName}"`).to.be.true;
});

Then('the {string} tab should be active by default', function(tabName) {
  const tabs = this.querySelectorAll('.sidebar-tab');
  const tab = Array.from(tabs).find(t => 
    this.getText(t).toLowerCase().includes(tabName.toLowerCase())
  );
  expect(tab).to.exist;
  expect(this.hasClass(tab, 'active')).to.be.true;
});

Then('the Code panel should contain a code editor', function() {
  const editor = this.querySelector('#codeEditor');
  expect(editor).to.exist;
  expect(editor.tagName.toLowerCase()).to.equal('textarea');
});

Given('I dismiss the intro overlay', function() {
  const startBtn = this.querySelector('#startBtn');
  if (startBtn) {
    this.click(startBtn);
  }
});

Then('I should see a floating toolbar at the bottom of the canvas', function() {
  const toolbar = this.querySelector('.toolbar');
  expect(toolbar).to.exist;
});
