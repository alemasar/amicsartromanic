class Compiler {
  initCompilation(methods) {
    // eslint-disable-next-line array-callback-return
    this.dictionaries.reduce((compilation, compilationObj) => {
      const posibleMethods = compilationObj.methods.fileMethods.filter(
        posibleFileMethod =>
          // eslint-disable-next-line no-prototype-builtins
          Object.getPrototypeOf(this.methods).hasOwnProperty(posibleFileMethod.method) === true
      );
      if (posibleMethods.length === compilationObj.methods.fileMethods.length) {
        methods.push(compilationObj.methods);
      }
    }, []);
  }

  callMethod(method, inputs) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      resolve(this.methods[method.method](inputs, method.output));
    });
  }

  callMethods(methods, inputs) {
    const result = methods.fileMethods.map(method => this.callMethod(method, inputs));
    return {
      comment: methods.comment,
      compiledMethodCode: result
    };
  }
}
module.exports = Compiler;
