/* eslint-disable */
const loader_utils = require('loader-utils');
const JSParser = require('../interpreter/parser/parsers/JSParser');
const path = require('path');
const TemplateIndexCompiler = require('../interpreter/FileTypes/TemplateIndex/TemplateIndexCompiler');
const fs = require('fs');
const Process = require('../interpreter/compiler/CompilerProcess');
const Ajv = require('ajv');

module.exports = function(input) {
  const webpack = this;
  const callback = this.async();

  const config_string = loader_utils.stringifyRequest(webpack, input);
  const json = JSON.parse(JSON.parse(config_string));

  // webpack.clearDependencies();
  const ajv = Ajv({ allErrors: true });
  const templateLoaderSchema = require('./template-loader.schema');
  ajv.addSchema(templateLoaderSchema, 'template-loader');
  const valid = ajv.validate('template-loader', json);

  if (!valid) {
    console.log(ajv.errorsText());
    const return_string = `document.addEventListener("DOMContentLoaded", () =>{
      document.body.innerHTML += "${webpack.resourcePath}: ${ajv.errorsText()}";
    })`;
    callback(null, return_string);
  } else {
    //console.log("TEMPLATE LOADER: ", global.WEBComponentsTags)
    let template = "";
    console.log(json.hasOwnProperty("compilerTemplate")+'    '+json)
    if (json.hasOwnProperty("compilerTemplate")) {
      template = fs.readFileSync(path.join(__dirname, './tpl/' + json.compilerTemplate), 'utf8').toString();
    } else {
      template = fs.readFileSync(path.join(__dirname, './tpl/template.js'), 'utf8').toString();
    }
    const compilerProcess = new Process(template, JSParser, TemplateIndexCompiler);
    const promise = compilerProcess.process(json, webpack);
    promise
      .then(compiledTemplate => {
        callback(null, compiledTemplate);
      })
      .catch(error => {
        console.log('TEMPLATE LOADER: ', error);
        throw new Error(error);
      });
  }
  return;
  //callback(null, "compiledTemplate");
};
