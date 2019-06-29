/* eslint-disable */
const Parser = require('../Parser');
const Dictionary = require('../../dictionaries/Dictionary');

class CatHTMLParser extends Parser {
  constructor(file, config) {
    super(config);

    this.open = '<!--';
    this.close = '-->';
    this.dictionaryClass = Dictionary;
    this.template = file;
    this.replaceCode = false;
    this.initCompilation();
  }
}

module.exports = CatHTMLParser;