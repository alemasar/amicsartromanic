/* eslint-disable */
class ParseStatement {
  constructor(comment, statement) {
    this.comment = comment;
    this.statement = statement;
  }

  setStatement(statements) {
    const fileMethods = this.getMethodsFromStatement();
    statements.push({
        comment: this.comment,
        fileMethods
    });
  }

  getMethodsFromStatement() {
    const fileMethods = [];
    this.statement.split("then").map(statement => {
      const method = statement.trim().split(" ").reduce((method, parameter) => {
        return ({
          method: method +
          parameter.substring(0, 1).toUpperCase() +
          parameter.substring(1),
          output: parameter
        });
      });
      fileMethods.push(method);
    });
    return fileMethods;
  }
}

module.exports = ParseStatement;
