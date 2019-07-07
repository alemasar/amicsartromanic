/* eslint-disable */
class Compiler {
  constructor(template, statements) {
    this.template = template;
    this.statements = statements;
  }

  compile(inputs) {
    const resultsPromise = [];
    this.statements.forEach(statement => {
      if (statement.methods.length === 1) {
        resultsPromise.push(
          new Promise((resolve, reject) => {
            resolve({
              code: statement.methods[0].method(inputs, statement.methods[0].arguments),
              statement: statement.statement
            });
          })
        );
      } else {
        let previousMethodPromise = [];
        statement.methods.forEach((method, index) => {
          if (index === statement.methods.length - 1) {
            const previousMethod = previousMethodPromise.pop();
            resultsPromise.push(
              new Promise((resolve, reject) => {
                resolve({
                  code: method.method(inputs, method.arguments, previousMethod.method),
                  statement: statement.statement
                });
              })
            );
          } else {
            if (previousMethodPromise.length > 0) {
              const previousMethod = previousMethodPromise.pop();
              previousMethodPromise.push({
                method: method.method(inputs, method.arguments, previousMethod.method),
                arguments: method.arguments
              });
            } else {
              previousMethodPromise.push({
                method: method.method(inputs, method.arguments),
                arguments: method.arguments
              });
            }
          }
        });
      }
    });
    return Promise.all(resultsPromise).then(result => {
      return result;
    });
  }
}

module.exports = Compiler;
