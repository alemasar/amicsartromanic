/* eslint-disable */
const loader_utils = require('loader-utils');
const JSParser = require('../interpreter/parser/parsers/JSParser');
const path = require('path');
const TemplateIndexCompiler = require('../interpreter/FileTypes/TemplateIndex/TemplateIndexCompiler');
const fs = require('fs');
const Process = require('../interpreter/compiler/CompilerProcess');

module.exports = function(input) {
  const webpack = this;
  const callback = this.async();

  const config_string = loader_utils.stringifyRequest(webpack, input);
  const json = JSON.parse(JSON.parse(config_string));
  // webpack.clearDependencies();

  //console.log("TEMPLATE LOADER: ", global.WEBComponentsTags)
  let template = fs.readFileSync(path.join(__dirname, './tpl/template.js'), 'utf8').toString();
  const compilerProcess = new Process(template, JSParser, TemplateIndexCompiler);
  const promise = compilerProcess.process(json, webpack);
  promise.then(compiledTemplate => {
    console.log('TEMPLATE LOADER: ', compiledTemplate);
    callback(null, compiledTemplate);
  });
  return;
  //callback(null, "compiledTemplate");
};
