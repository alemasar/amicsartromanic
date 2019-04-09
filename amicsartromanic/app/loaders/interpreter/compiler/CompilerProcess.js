const fs = require("fs");

class CompilerProcess {
  constructor(template, parser, compiler) {
    this.template = template;
    this.parser = parser;
    this.compiler = compiler;
  }

  process(json, webpack) {
    const root_parser = new this.parser(this.template);
    const dictionaries = [];
    root_parser.setDictionaries(dictionaries);
    const compiler = new this.compiler(dictionaries);
    const methods = [];
    compiler.initCompilation(methods);
    const methodsPromise = [];
    methods.forEach(method => {
      methodsPromise.push(compiler.callMethods(method, { json, webpack }));
    });
    let compiledCodes = [];
    compiledCodes = methodsPromise.map(methodPromise => {
      return methodPromise.compiledMethodCode.reduce(
        async (previousPromiseCode, nextPromiseCode) => {
          await previousPromiseCode;
          return nextPromiseCode;
        },
        Promise.resolve()
      );
    });

    return new Promise((resolve, reject) => {
      Promise.all(compiledCodes).then(compiledCode => {
        compiledCode.forEach((code, index) => {
          this.template = this.template.replace(methods[index].comment, code);
        });
        resolve(this.template);
      });
    });
  }
}

module.exports = CompilerProcess;
