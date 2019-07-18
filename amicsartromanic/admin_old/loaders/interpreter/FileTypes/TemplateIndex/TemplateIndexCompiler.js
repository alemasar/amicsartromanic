const Compiler = require('../../compiler/Compiler');
const Methods = require('./TemplateIndexMethods');

class TemplateIndexCompiler extends Compiler {
  constructor(dictionaries) {
    super();
    this.methods = new Methods();
    this.dictionaries = dictionaries;
  }
}

module.exports = TemplateIndexCompiler;
