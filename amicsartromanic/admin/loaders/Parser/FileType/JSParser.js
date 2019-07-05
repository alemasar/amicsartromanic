/* eslint-disable */

class JSParser {
  constructor() {
    this.open = '/*';
    this.close = '*/';
    this.replaceCode = true;
    this.sequenceKeywords = ["then"];
    this.argumentKeywords = ["from", "with"];
  }
}

module.exports = JSParser;
