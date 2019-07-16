/* eslint-disable */
const loader_utils = require('loader-utils');
const path = require('path');
const fs = require('fs');
const Ajv = require('ajv');
const Parser = require('../Parser/Parser');
const JSType = require('../Parser/FileType/JSParser');
const RootIndexTemplateMethods = require('../Parser/Methods/RootIndexTemplateMethods');
const Compiler = require('../Compiler/Compiler');
const replaceCode = require('../helpers/processArray');

module.exports = async function(input) {
  const webpack = this;
  const callback = this.async();
  const options = loader_utils.getOptions(webpack);

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
    if (json.hasOwnProperty("compilerTemplate")) {
      template = fs.readFileSync(path.join(__dirname, './tpl/' + json.compilerTemplate), 'utf8').toString();
    } else {
      template = fs.readFileSync(path.join(__dirname, './tpl/template.js'), 'utf8').toString();
    }

    const parser = new Parser(template, JSType, RootIndexTemplateMethods);
    const compiler = new Compiler(parser.statements);
    const compilerResult = await compiler.compile({ json, options, webpack }).catch(e => {
      // console.log('ERROR EN CAT LOADER');
      return_string = `document.addEventListener("DOMContentLoaded", () =>{
        document.body.innerHTML += "${webpack.resourcePath}: ${e}";
      })`;
    });
    const compiledTemplate = await replaceCode(compilerResult, template);
    /* console.log("******************************************************");
    console.log(compiledTemplate);
    console.log("******************************************************") */
    callback(null, compiledTemplate);
  }
  return;
  //callback(null, "compiledTemplate");
};
