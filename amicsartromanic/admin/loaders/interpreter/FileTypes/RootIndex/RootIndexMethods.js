/* eslint-disable */
const loader_utils = require("loader-utils");
const JSParser = require("../../parser/parsers/JSParser");
const WebComponentJSCompiler = require("../WebComponentJS/WebComponentJSCompiler");
const fs = require("fs");
const Process = require("../../compiler/CompilerProcess");

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
}

module.exports = RootIndexMethods;
