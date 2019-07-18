const Compiler = require('../../compiler/Compiler');
const Methods = require('./RootIndexMethods');

class RootIndexCompiler extends Compiler {
  constructor(dictionaries) {
    super();
    this.methods = new Methods();
    this.dictionaries = dictionaries;
  }
}

module.exports = RootIndexCompiler;
