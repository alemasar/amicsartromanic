const Parser = require("../../parser/Parser");
const Dictionary = require("../../dictionaries/Dictionary");

class WebComponentJSParser extends Parser {
  constructor(file, config) {
    super(config);

    this.open = "/*";
    this.close = "*/";
    this.dictionaryClass = Dictionary;
    this.template = file;
    this.initCompilation();
  }
}

module.exports = WebComponentJSParser;
