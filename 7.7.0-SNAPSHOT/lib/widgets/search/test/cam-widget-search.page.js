/* jshint node: true, unused: false */
/* global __dirname: false, describe: false, before: false, it: false, browser: false,
          element: false, expect: false, by: false, protractor: false */
'use strict';

var SearchPill = require('../../search-pill/test/cam-widget-search-pill-object.page.js');


function Example(id) { this.node = element(by.id('example'+id)); }

Example.prototype.searchInput = function() {
  return this.node.element(by.css('[cam-widget-search] [ng-model="inputQuery"]'));
};

Example.prototype.inputDropdown = function() {
  return this.node.element(by.css('[cam-widget-search] .form-container > ul'));
};

Example.prototype.inputDropdownOption = function(option) {
  return this.node.all(by.css('[cam-widget-search] .form-container > ul > li')).get(option);
};

Example.prototype.inputDropdownOptionCount = function() {
  return this.node.all(by.css('[cam-widget-search] .form-container > ul > li')).count();
};

Example.prototype.storageEl = function() {
  return this.node.element(by.css('.stored-criteria'));
};

Example.prototype.storageDropdownButton = function() {
  return this.storageEl().element(by.css('.dropdown-toggle'));
};

Example.prototype.storageDropdownMenu = function() {
  return this.storageEl().element(by.css('.dropdown-menu'));
};

Example.prototype.storageDropdownMenuItems = function() {
  return this.storageDropdownMenu().all(by.css('li'));
};

Example.prototype.storageDropdownMenuItem = function(index) {
  return this.storageDropdownMenuItems().get(index);
};

Example.prototype.storageDropdownMenuItemRemove = function(index) {
  return this.storageDropdownMenuItems().get(index).all(by.css('a')).first();
};

Example.prototype.storageDropdownMenuItemName = function(index) {
  return this.storageDropdownMenuItems().get(index).all(by.css('a')).last();
};

Example.prototype.storageDropdownInput = function() {
  return this.storageDropdownMenu().element(by.css('.input-group input'));
};

Example.prototype.storageDropdownInputButton = function() {
  return this.storageDropdownMenu().element(by.css('.input-group button'));
};

Example.prototype.searchPills = function() {
  return this.node.all(by.css('[cam-widget-search] [cam-widget-search-pill]'));
};

Example.prototype.searchPill = function(pill) {
  return new SearchPill(this.searchPills().get(pill));
};

Example.prototype.allSearchesCount = function() {
  return this.node.element(by.id('allSearchesCount')).getText();
};
Example.prototype.validSearchesCount = function() {
  return this.node.element(by.id('validSearchesCount')).getText();
};

function Page() { }

Page.prototype.example = function(id) {
  return new Example(id);
};

module.exports = new Page();
