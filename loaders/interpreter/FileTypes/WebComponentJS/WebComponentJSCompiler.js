const Compiler = require("../../compiler/Compiler");
const Methods = require("./WebComponentJSMethods");
class WebComponentJSCompiler extends Compiler{
  constructor(dictionaries) {
    super();
    this.methods = new Methods();
    this.dictionaries = dictionaries;
  }
}

module.exports = WebComponentJSCompiler;