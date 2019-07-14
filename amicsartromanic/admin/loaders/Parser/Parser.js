/* eslint-disable */
class Parser {
  constructor(template, Type, Methods) {
    this.template = template;
    this.statements = [];
    this.type = new Type();
    this.methods = new Methods();
    this.extractStatements();
  }

  extractStatements() {
    let pos_ini_comment = this.template.indexOf(this.type.open);
    do {
      const pos_fi_comment = this.template.indexOf(this.type.close, pos_ini_comment);
      if (pos_ini_comment > -1) {
        const statement_with_comments = this.template.substr(
          pos_ini_comment,
          pos_fi_comment - pos_ini_comment + this.type.close.length
        );
        const checkedComment = this.checkComment(statement_with_comments);
        if (checkedComment.length > 0) {
          if (Object.keys(checkedComment).indexOf("error") === -1){
            this.statements.push({
              statement: statement_with_comments,
              methods: checkedComment
            });
          } else {
            console.log("ERROR!!!!!")
          }
        }
      }
      pos_ini_comment = this.template.indexOf(this.type.open, pos_fi_comment);
    } while (pos_ini_comment != -1);
    //console.log('STATEMENTS: ', this.statements);
  }

  formatMethod(methodArray) {
    const methodFormatted = [];
    methodArray.forEach((partMethod, index) => {
      if (index != 0) {
        methodFormatted.push(
          partMethod.substring(0, 1).toUpperCase() + partMethod.substring(1).replace('-', '')
        );
      } else {
        methodFormatted.push(
          partMethod.substring(0, 1).toLowerCase() + partMethod.substring(1).replace('-', '')
        );
      }
    });
    return methodFormatted.join('');
  }

  parseMethods(sequencedMethods){
    let methodWithArgument = false;
    let methods = [];
    sequencedMethods.forEach(sequencedMethod => {
      methodWithArgument = false;
      this.type.argumentKeywords.forEach(keyword => {
        const position = sequencedMethod.indexOf(keyword);
        if (position != -1) {
          const formattedMethod = this.formatMethod(sequencedMethod.slice(0, position));
          if (Object.getPrototypeOf(this.methods).hasOwnProperty(formattedMethod)) {
            methods.push({
              method: this.methods[formattedMethod].bind(this.methods),
              arguments: sequencedMethod.slice(position + 1)
            });
          }
          methodWithArgument = true;
        }
      });
      if (!methodWithArgument) {
        const formattedMethod = this.formatMethod(sequencedMethod);
        if (Object.getPrototypeOf(this.methods).hasOwnProperty(formattedMethod)) {
          methods.push({
            method: this.methods[formattedMethod].bind(this.methods),
            arguments: []
          });
        }
      }
    });
    return methods;
  }
  checkComment(comment) {
    let rawStatement = comment
      .replace(this.type.open, '')
      .replace(this.type.close, '')
      .trim();
    let rawStatementSplitted = [];
    let methods = [];
    const sequencedMethods = [];
    let initialPos = 0;
    const keywordPosition = [];
    this.type.sequenceKeywords.forEach(keyword => {
      rawStatementSplitted = rawStatement.split(' ');
      let lastIndexOf = rawStatementSplitted.indexOf(keyword);
      while (lastIndexOf != -1) {
        keywordPosition.push(lastIndexOf);
        lastIndexOf = rawStatementSplitted.indexOf(keyword, lastIndexOf + 1);
      }
    });
    keywordPosition.sort();
    keywordPosition.forEach(position => {
      if (position != -1) {
        sequencedMethods.push(rawStatementSplitted.slice(initialPos, position));
        initialPos = position + 1;
      }
    });
    sequencedMethods.push(rawStatementSplitted.slice(initialPos, rawStatementSplitted.length));
    methods = this.parseMethods(sequencedMethods);
    if (methods.length > 0 && methods.length != sequencedMethods.length){
      methods["error"] = "Not all methods defined";
    }
    return methods;
  }
}

module.exports = Parser;
