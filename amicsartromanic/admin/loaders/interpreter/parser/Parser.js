/* eslint-disable */
const ParseStatement = require("./ParseStatement");

class Parser {
  constructor(config, inputs){
    this.inputs = config;
  }
  set open(open) {
    this._open = open;
  }
  set close(close) {
    this._close = close;
  }
  get open() {
    return this._open;
  }
  get close() {
    return this._close;
  }

  initCompilation() {
    this.statements=[];
    let pos_ini_comment = this.template.indexOf(this.open);
    do {
      const pos_fi_comment = this.template.indexOf(this.close, pos_ini_comment);
      if (pos_ini_comment > -1) {
        const statement_with_comments = this.template.substr(
          pos_ini_comment,
          pos_fi_comment - pos_ini_comment + this.close.length
        );
        const statement = new ParseStatement(statement_with_comments, statement_with_comments.replace(this.open, "").replace(this.close, "").trim());
        statement.setStatement(this.statements)
      }
      pos_ini_comment = this.template.indexOf(this.open, pos_fi_comment);
    } while (pos_ini_comment != -1);
  }

  setDictionaries(dictionaries) {
    this.statements.forEach((method) => {
      dictionaries.push(new this.dictionaryClass(method))
    })
  }
}

module.exports = Parser;
