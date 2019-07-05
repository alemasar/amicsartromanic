/* eslint-disable */
class Compiler {
  constructor(template, statements) {
    this.template = template;
    this.statements = statements;
  }

  compile(){
    this.statements.forEach(statement => {
      let result = "";
      statement.methods.forEach(method => {
        result = method.method();
      })
      this.template = this.template.replace(statement.statement, result)
    });
    console.log(this.template);
  }
}

module.exports = Compiler;
