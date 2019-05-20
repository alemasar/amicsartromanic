const dictionary = {
  open: "/*",
  close: "*/",
  statements: {
    import: {
      template: function(inputs) {
        return (
          `const template = document.createElement("template");` +
          "template.innerHTML = `" +
          "<style>" +
          `${inputs['css']}` +
          "</style>" +
          "`;"
        );
      },
      class: function(prova) {
        console.log(prova)
      }
    }
  }
};

class JSDictionary {
  constructor() {
  }

  render(js, inputs,resolve) {
    //resolve(js)
    const lines = js.split("\n");
    let return_value = '';
    lines.forEach((line) => {
      let compiled_value = line;
      if (line.indexOf(dictionary.open) != -1) {
        const statement = line
          .replace(dictionary.open, "")
          .replace(dictionary.close, "")
          .trim()
          .split(" ");
        const statementName = statement.shift();
        const statementParameter = statement.shift();
        if (dictionary.statements.hasOwnProperty(statementName)) {
          compiled_value =
            dictionary.statements[statementName][statementParameter](inputs);
          //console.log(dictionary.statements[statementName][statementParameter]('hola'));
        }
      }
      return_value += compiled_value;
    });
    resolve(return_value);
  }
}

module.exports = JSDictionary;
