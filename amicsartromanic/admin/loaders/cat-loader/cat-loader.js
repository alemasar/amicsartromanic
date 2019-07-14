/* eslint-disable */
const loader_utils = require('loader-utils');
const path = require('path');
const fs = require('fs');
const Ajv = require('ajv');
const Parser = require('../Parser/Parser');
const JSType = require('../Parser/FileType/JSParser');
const RootIndexMethods = require('../Parser/Methods/RootIndexMethods');
const Compiler = require('../Compiler/Compiler');
const replaceCode = require('../helpers/processArray');

module.exports = async function(input) {
  const webpack = this;
  const options = loader_utils.getOptions(webpack);
  const callback = this.async();

  const config_string = loader_utils.stringifyRequest(webpack, input);
  const json = JSON.parse(JSON.parse(config_string));

  const ajv = Ajv({ allErrors: true });
  const catLoaderSchema = require('./cat-loader.schema');
  ajv.addSchema(catLoaderSchema, 'cat-loader');
  const valid = ajv.validate('cat-loader', json);
  webpack.clearDependencies();
  if (!valid) {
    const return_string = `document.addEventListener("DOMContentLoaded", () =>{
      document.body.innerHTML += "${webpack.resourcePath}: ${ajv.errorsText()}";
    })`;
    callback(null, return_string);
  } else {
    global.WEBComponentsTags.push(json.tag);


    let template = fs.readFileSync(path.join(__dirname, './tpl/index.js'), 'utf8').toString();
    const parser = new Parser(template, JSType, RootIndexMethods);
    const compiler = new Compiler(parser.statements);
    let return_string = template;
    const compilerResult = await compiler.compile({ json, options, webpack }).catch(e => {
      console.log('ERROR EN CAT LOADER');
      return_string = `document.addEventListener("DOMContentLoaded", () =>{
        document.body.innerHTML += "${webpack.resourcePath}: ${e}";
      })`;
    });
    const compiledTemplate = await replaceCode(compilerResult, template);
    console.log('LLAMO AL CALLBACK CON: ', compiledTemplate);
    callback(null, compiledTemplate);
  }
  console.log("PASOOOOOOO");
  return;
};
/* .catch(e => {
  console.log('ERROR EN CATLOADER', e);
  const return_string = `document.addEventListener("DOMContentLoaded", () =>{
    document.body.innerHTML += "${webpack.resourcePath}: ${e}";
  })`;
  callback(null, return_string);
}); */
