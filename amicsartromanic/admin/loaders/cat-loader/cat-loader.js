/* eslint-disable */
const loader_utils = require('loader-utils');
const path = require('path');
const fs = require('fs');
const Ajv = require('ajv');
const Parser = require('../Parser/Parser');
const JSType = require('../Parser/FileType/JSParser');
const RootIndexMethods = require('../Parser/Methods/RootIndexMethods')

module.exports = function(input) {
  const webpack = this;
  const callback = this.async();

  const config_string = loader_utils.stringifyRequest(webpack, input);
  const json = JSON.parse(JSON.parse(config_string));

  const ajv = Ajv({ allErrors: true });
  const catLoaderSchema = require('./cat-loader.schema');
  ajv.addSchema(catLoaderSchema, 'cat-loader');
  const valid = ajv.validate('cat-loader', json);

  if (!valid) {
    const return_string = `document.addEventListener("DOMContentLoaded", () =>{
      document.body.innerHTML += "${webpack.resourcePath}: ${ajv.errorsText()}";
    })`;
    callback(null, return_string);
  } else {
    global.WEBComponentsTags.push(json.tag);
    webpack.clearDependencies();

    let template = fs.readFileSync(path.join(__dirname, './tpl/index.js'), 'utf8').toString();
    const parser = new Parser(template, JSType, RootIndexMethods);
    //const compilerProcess = new Process(template, JSParser, RootIndexCompiler);
    //const promise = compilerProcess.process(json, webpack);
    //promise.then(compiledTemplate => {
      callback(null, template);
    //});
  }

  return;
};
