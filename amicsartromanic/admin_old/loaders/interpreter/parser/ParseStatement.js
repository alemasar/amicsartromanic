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
      const methodArguments = statement.trim().split("from");
      let argument = methodArguments[0];
      let data = {};
      if (methodArguments.length > 1){
        const methodData = methodArguments[1].trim().split("with");
        argument = methodData[0].trim();
        if (methodData.length > 1) {
          data = methodData[1].trim();
        }
      }
      // console.log("ARGUMENT METHODS: ", methodArguments);
      const method = methodArguments[0].trim().split(" ").reduce((method, parameter) => {
        return ({
          method: method +
          parameter.substring(0, 1).toUpperCase() +
          parameter.substring(1).replace("-",""),
          output: parameter,
          argument: argument,
          data: data
        });
      });
      //console.log("METHODS: ", method.method)
      fileMethods.push(method);
    });
    return fileMethods;
  }
}

module.exports = ParseStatement;
