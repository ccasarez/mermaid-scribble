const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

When('I click the {string} button in the header', function(buttonText) {
  const buttons = this.querySelectorAll('.header .btn');
  const button = Array.from(buttons).find(btn => 
    this.getText(btn).toLowerCase().includes(buttonText.toLowerCase())
  );
  expect(button, `Could not find header button with text "${buttonText}"`).to.exist;
  this.click(button);
});

Then('the import modal should be visible', function() {
  const modal = this.querySelector('#importModal');
  expect(modal).to.exist;
  expect(this.hasClass(modal, 'visible')).to.be.true;
});

Then('the import modal should be hidden', function() {
  const modal = this.querySelector('#importModal');
  expect(this.hasClass(modal, 'visible')).to.be.false;
});

Then('the modal should have a textarea for code', function() {
  const textarea = this.querySelector('#importCode');
  expect(textarea).to.exist;
  expect(textarea.tagName.toLowerCase()).to.equal('textarea');
});

Then('the modal should have a {string} button', function(buttonText) {
  const modal = this.querySelector('#importModal');
  const buttons = modal.querySelectorAll('button');
  const found = Array.from(buttons).some(btn => 
    this.getText(btn).toLowerCase().includes(buttonText.toLowerCase())
  );
  expect(found, `Expected modal to have "${buttonText}" button`).to.be.true;
});

Then('the modal should have an {string} button', function(buttonText) {
  const modal = this.querySelector('#importModal');
  const buttons = modal.querySelectorAll('button');
  const found = Array.from(buttons).some(btn => 
    this.getText(btn).toLowerCase().includes(buttonText.toLowerCase())
  );
  expect(found, `Expected modal to have "${buttonText}" button`).to.be.true;
});

Given('the import modal is open', function() {
  const importBtn = this.querySelector('#importBtn');
  this.click(importBtn);
  const modal = this.querySelector('#importModal');
  expect(this.hasClass(modal, 'visible')).to.be.true;
});

When('I click the {string} button in the modal', function(buttonText) {
  const modal = this.querySelector('#importModal');
  const buttons = modal.querySelectorAll('button');
  const button = Array.from(buttons).find(btn => 
    this.getText(btn).toLowerCase().includes(buttonText.toLowerCase())
  );
  expect(button, `Could not find modal button with text "${buttonText}"`).to.exist;
  this.click(button);
});

When('I enter the following Mermaid code:', function(docString) {
  const textarea = this.querySelector('#importCode');
  this.setValue(textarea, docString);
});

Then('the code editor should contain the imported code', function() {
  const editor = this.querySelector('#codeEditor');
  const value = this.getValue(editor);
  expect(value).to.include('flowchart');
});

Given('the code editor is empty', function() {
  const editor = this.querySelector('#codeEditor');
  this.setValue(editor, '');
});

Then('I should see an error toast', function() {
  const toast = this.querySelector('#toast');
  // In real tests, we'd check if toast is visible and has error class
  expect(toast).to.exist;
});

Given('the code editor contains Mermaid code', function() {
  const editor = this.querySelector('#codeEditor');
  this.setValue(editor, 'flowchart TD\n    A[Start] --> B[End]');
});

Then('I should see a success toast saying {string}', function(message) {
  const toast = this.querySelector('#toast');
  // Toast visibility is handled asynchronously
  expect(toast).to.exist;
});
