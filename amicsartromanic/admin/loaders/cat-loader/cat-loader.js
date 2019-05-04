/* eslint-disable */
const loader_utils = require("loader-utils");
const JSParser = require("../interpreter/parser/parsers/JSParser");
const path = require("path");
const RootIndexCompiler = require("../interpreter/FileTypes/RootIndex/RootIndexCompiler");
const fs = require("fs");
const Process = require("../interpreter/compiler/CompilerProcess");

module.exports = function(input) {
  const webpack = this;
  const callback = this.async();

  const config_string = loader_utils.stringifyRequest(webpack, input);
  const json = JSON.parse(JSON.parse(config_string));

  global.WEBComponentsTags.push(json.tag);
  webpack.clearDependencies();

  let template = fs.readFileSync(path.join(__dirname, "./tpl/index.js"), "utf8").toString();
  const compilerProcess = new Process(template, JSParser, RootIndexCompiler)
  const promise = compilerProcess.process(json, webpack);
  promise.then((compiledTemplate)=>{
    callback(null, compiledTemplate);
  });
  return;
};
