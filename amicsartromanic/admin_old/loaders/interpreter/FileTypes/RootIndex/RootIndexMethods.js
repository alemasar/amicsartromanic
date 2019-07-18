/* eslint-disable */
const loader_utils = require("loader-utils");
const JSParser = require("../../parser/parsers/JSParser");
const WebComponentJSCompiler = require("../WebComponentJS/WebComponentJSCompiler");
const fs = require("fs");
const Process = require("../../compiler/CompilerProcess");
const Ajv = require('ajv');

class RootIndexMethods {
  compileComponent(inputs, output) {
    const options = loader_utils.getOptions(inputs.webpack);
    console.log("VOY A TRATAR: ", inputs.json.tag);
    const pathFile =
    options.context + "/" + inputs.json.basePath + "/" + inputs.json.js;
    inputs.webpack.addDependency(pathFile);
    let template = fs.readFileSync(pathFile, "utf8").toString();
    const compilerProcess = new Process(template, JSParser, WebComponentJSCompiler);
    const promise = compilerProcess.process(inputs.json, inputs.webpack);
    promise.then((compiledTemplate)=>{
      // console.log("COMPILED TEMPLATE", compiledTemplate);
      const compiledFilePath = "./" + inputs.json.js.replace(".js", "_compiled.js");
      const completeCompiledPath = options.context + "/" + inputs.json.basePath + "/" + compiledFilePath;
      fs.writeFileSync(completeCompiledPath, compiledTemplate);
    });
    /*const options = loader_utils.getOptions(inputs.webpack);

    const compiledFilePath = "./" + inputs.json.js.replace(".js", "_compiled.js");
    const pathFile =
      options.context + "/" + inputs.json.basePath + "/" + inputs.json.js;
    const templatePathFile =
      options.context + "/" + inputs.json.basePath + "/" + inputs.json.template;
    inputs.json.path = compiledFilePath;   
    inputs.webpack.addDependency(pathFile);
    let template = fs.readFileSync(pathFile, "utf8").toString();
    const completeCompiledPath = options.context + "/" + inputs.json.basePath + "/" + compiledFilePath;
    if (fs.existsSync(templatePathFile)){
      const htmlTemplate = fs.readFileSync(templatePathFile, "utf8").toString()
      const CATCompilerProcess = new Process(htmlTemplate, CatHTMLParser, CATTemplateFunctionsCompiler)
      const CATPromise = CATCompilerProcess.process(inputs.json, inputs.webpack);
      CATPromise.then((CATTemplate)=>{
        console.log("COMPILE JS: ")
        let compilerProcess = {}; 
        if (CATTemplate != ""){
          compilerProcess = new Process(CATTemplate.js, JSParser, WebComponentJSCompiler);
        } else {
          compilerProcess = new Process(template, JSParser, WebComponentJSCompiler);
        }
        const promise = compilerProcess.process(inputs.json, inputs.webpack);
        promise.then((compiledTemplate)=>{
          fs.writeFileSync(completeCompiledPath, compiledTemplate);
        });
      })
    }else{
      const compilerProcess = new Process(template, JSParser, WebComponentJSCompiler)
      const promise = compilerProcess.process(inputs.json, inputs.webpack);
      promise.then((compiledTemplate)=>{
        fs.writeFileSync(completeCompiledPath, compiledTemplate);
      })
    }*/

    return inputs.json;
  }

  writePath(inputs, output) {
    return "./" + inputs.json.js.replace(".js", "_compiled.js");
  }

  writeTag(inputs, output) {
    return inputs.json[output];
  }

  writeExtends(inputs, output){

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
      if (inputs.json.hasOwnProperty("extends")) {
        extendsString = `, {extends: "${inputs.json["extends"]}"}`;
      }
      return extendsString;
    }
  }
}

module.exports = RootIndexMethods;
