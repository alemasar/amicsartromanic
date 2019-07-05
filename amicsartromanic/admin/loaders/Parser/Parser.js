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
        this.checkComment(statement_with_comments);
        // console.log(statement_with_comments);
      }
      pos_ini_comment = this.template.indexOf(this.type.open, pos_fi_comment);
    } while (pos_ini_comment != -1);
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
    let methodWithArgument = false;
    this.methods.sequenceKeywords.map(keyword => {
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
    sequencedMethods.map(sequencedMethod => {
      methodWithArgument = false;
      this.methods.argumentKeywords.forEach(keyword => {
        const position = sequencedMethod.indexOf(keyword);
        if (position != -1) {
          // console.log('METHOD: ', sequencedMethod.slice(0, position));
          // console.log('ARGUMENT: ', sequencedMethod.slice(position + 1));
          methods.push({
            method: this.formatMethod(sequencedMethod.slice(0, position)),
            arguments: sequencedMethod.slice(position + 1)
          });
          methodWithArgument = true;
        }
      });
      if (!methodWithArgument) {
        methods.push({
          method: this.formatMethod(sequencedMethod),
          arguments: []
        });
      }
    });
    //    methods.push(rawStatementSplitted.slice(initialPos, rawStatementSplitted.length));
    //    console.log("KEYWORD POSITION: ", keywordPosition);
    console.log('METHODS: ', methods);
  }
}

module.exports = Parser;
