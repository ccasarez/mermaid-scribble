const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

When('I click the {string} tab', function(tabName) {
  const tabs = this.querySelectorAll('.sidebar-tab');
  const tab = Array.from(tabs).find(t => 
    this.getText(t).toLowerCase().includes(tabName.toLowerCase())
  );
  expect(tab, `Could not find tab "${tabName}"`).to.exist;
  this.click(tab);
});

Then('the History panel should be visible', function() {
  const panel = this.querySelector('[data-panel="history"]');
  expect(panel).to.exist;
  expect(this.hasClass(panel, 'active')).to.be.true;
});

Then('the Code panel should be hidden', function() {
  const panel = this.querySelector('[data-panel="code"]');
  expect(panel).to.exist;
  expect(this.hasClass(panel, 'active')).to.be.false;
});

Then('the Code panel should be visible', function() {
  const panel = this.querySelector('[data-panel="code"]');
  expect(panel).to.exist;
  expect(this.hasClass(panel, 'active')).to.be.true;
});

Then('the History panel should be hidden', function() {
  const panel = this.querySelector('[data-panel="history"]');
  expect(panel).to.exist;
  expect(this.hasClass(panel, 'active')).to.be.false;
});

Given('no diagrams have been generated', function() {
  // Default state - no history
});

Then('I should see an empty state message', function() {
  const emptyState = this.querySelector('.timeline-list .empty-state');
  expect(emptyState).to.exist;
});

Then('the message should say {string}', function(text) {
  const emptyState = this.querySelector('.timeline-list .empty-state');
  expect(this.getText(emptyState)).to.include(text);
});

Given('I am on the History tab', function() {
  const historyTab = Array.from(this.querySelectorAll('.sidebar-tab')).find(t => 
    this.getText(t).toLowerCase().includes('history')
  );
  this.click(historyTab);
});
