const Compiler = require('../../compiler/Compiler');
const Methods = require('./HTMLTemplateMethods');

class HTMLTemplateCompiler extends Compiler {
  constructor(dictionaries) {
    super();
    this.methods = new Methods();
    this.dictionaries = dictionaries;
  }
}

module.exports = HTMLTemplateCompiler;
