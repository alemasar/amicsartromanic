/* eslint-disable */

class CompilerError extends Error{
  constructor(message){
    super();
    this.name = 'CompilerError';
    this.message = message || '';
  }
}

class Compiler {
  constructor(statements) {
    this.statements = statements;
  }

  async compile(inputs) {
    let statement = this.statements.pop();
    const returnValues = [];
    while (statement) {
      //console.log(statement.methods);
      let firstIndex = true;
      const lastMethods = [];
      const promises = statement.methods.map(method => {
        let result = {};
        if (!firstIndex) {
          // const recursiveMethod = lastMethods.pop();
          const lastMethod = lastMethods.pop();
          const returnMethod = method.method(inputs, method.arguments, lastMethod).catch(e => {
            return new Promise((resolve, reject) => {
              reject(e);
            });
          });
          lastMethods.push({
            method: returnMethod
          });
          result = returnMethod;
        } else {

          result = method.method(inputs, method.arguments);
          // console.log("RETURN METHOD: ",result)
          /*.catch(e => {
            return new Promise((resolve, reject) => {
              console.log("PASO PER AQUI ", e)
              reject(e);
            });
          });*/
          lastMethods.push(result);
          firstIndex = false;
        }
        return result;
      });
      const results = await Promise.all(promises).catch(e =>{
        const errors = [];
        errors.push(new CompilerError(e));
        return errors;
      });
      if (results) {
        
        returnValues.push({
          statement: statement.statement,
          code: results
        });
      }
      statement = this.statements.pop();
    }
    return returnValues;
  }
}

module.exports = Compiler;
