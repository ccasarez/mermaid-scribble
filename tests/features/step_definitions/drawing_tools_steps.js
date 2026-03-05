const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

Then('the Select tool should be active by default', function() {
  const selectBtn = this.querySelector('[data-tool="select"]');
  expect(selectBtn).to.exist;
  expect(this.hasClass(selectBtn, 'active')).to.be.true;
});

Then('I should see the following tools in the toolbar:', function(dataTable) {
  const tools = dataTable.hashes().map(row => row.tool);
  
  for (const tool of tools) {
    const btn = this.querySelector(`[data-tool="${tool}"]`);
    expect(btn, `Expected to find tool button for "${tool}"`).to.exist;
  }
});

When('I click on the {string} tool', function(toolName) {
  const btn = this.querySelector(`[data-tool="${toolName}"]`);
  expect(btn, `Could not find tool button for "${toolName}"`).to.exist;
  this.click(btn);
});

Then('the {string} tool should be active', function(toolName) {
  const btn = this.querySelector(`[data-tool="${toolName}"]`);
  expect(btn).to.exist;
  expect(this.hasClass(btn, 'active')).to.be.true;
});

Then('the {string} tool should not be active', function(toolName) {
  const btn = this.querySelector(`[data-tool="${toolName}"]`);
  expect(btn).to.exist;
  expect(this.hasClass(btn, 'active')).to.be.false;
});

Then('only the {string} tool should be active', function(toolName) {
  const allToolBtns = this.querySelectorAll('[data-tool]');
  
  for (const btn of allToolBtns) {
    const tool = btn.getAttribute('data-tool');
    if (tool === toolName) {
      expect(this.hasClass(btn, 'active'), `Expected "${tool}" to be active`).to.be.true;
    } else {
      expect(this.hasClass(btn, 'active'), `Expected "${tool}" to NOT be active`).to.be.false;
    }
  }
});

Then('the color picker should have value {string}', function(value) {
  const picker = this.querySelector('#colorPicker');
  expect(picker).to.exist;
  expect(this.getValue(picker)).to.equal(value);
});

Then('the stroke width slider should have value {string}', function(value) {
  const slider = this.querySelector('#strokeWidth');
  expect(slider).to.exist;
  expect(this.getValue(slider)).to.equal(value);
});
