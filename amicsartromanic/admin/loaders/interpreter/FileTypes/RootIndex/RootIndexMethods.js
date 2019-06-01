/* eslint-disable */
const loader_utils = require("loader-utils");
const JSParser = require("../../parser/parsers/JSParser");
const WebComponentJSCompiler = require("../WebComponentJS/WebComponentJSCompiler");
const fs = require("fs");
const Process = require("../../compiler/CompilerProcess");
const Ajv = require('ajv');

class RootIndexMethods {
  writePath(inputs, output) {
    return inputs.json[output];
  }

  writeTag(inputs, output) {
    return inputs.json[output];
  }

  compileJs(inputs, output) {
    const options = loader_utils.getOptions(inputs.webpack);

    const compiledFilePath = "./" + inputs.json.js.replace(".js", "_compiled.js");
    const pathFile =
      options.context + "/" + inputs.json.basePath + "/" + inputs.json.js;
    inputs.json.path = compiledFilePath;
    inputs.webpack.addDependency(pathFile)
    let template = fs.readFileSync(pathFile, "utf8").toString();
    const compilerProcess = new Process(template, JSParser, WebComponentJSCompiler)
    const promise = compilerProcess.process(inputs.json, inputs.webpack)
    promise.then((compiledTemplate)=>{
      const completeCompiledPath = options.context + "/" + inputs.json.basePath + "/" + compiledFilePath;
      fs.writeFileSync(completeCompiledPath, compiledTemplate);
    })
    return inputs.json;
  }

  writeExtends(inputs, output){
    console.log("WRITE EXTENDS")
    const options = loader_utils.getOptions(inputs.webpack);

    const ajv = Ajv({ allErrors: true });
    const extendsSchema = require('./schema/extends.schema');
    ajv.addSchema(extendsSchema, 'extends-loader');
    const valid = ajv.validate('extends-loader', inputs.json);

    if (!valid) {
      inputs.json.css = new Promise((resolve, reject) =>{
        reject(ajv.errorsText());
      });
    } else {
      let extendsString = '';      
      if (Object.getPrototypeOf(inputs.json).hasOwnProperty("extends")) {
        extendsString = `, {extends: "${inputs.json["extends"]}"}`;
      }
      return extendsString;
    }
  }
}

module.exports = RootIndexMethods;
