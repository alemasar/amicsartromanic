const Parser = require("../../parser/Parser");
const Dictionary = require("./RootIndexDictionary");

class RootIndexParser extends Parser {
  constructor(file, config) {
    super(config);

    this.open = "/*";
    this.close = "*/";
    this.dictionaryClass = Dictionary;
    this.template = file;
    this.initCompilation();
  }

}
module.exports = RootIndexParser;
