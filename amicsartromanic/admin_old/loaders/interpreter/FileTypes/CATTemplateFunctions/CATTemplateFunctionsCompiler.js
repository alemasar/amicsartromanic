const Compiler = require('../../compiler/Compiler');
const Methods = require('./CATTemplateFunctionsMethods');

class HTMLTemplateCompiler extends Compiler {
  constructor(dictionaries) {
    super();
    this.methods = new Methods();
    this.dictionaries = dictionaries;
  }
}

module.exports = HTMLTemplateCompiler;
