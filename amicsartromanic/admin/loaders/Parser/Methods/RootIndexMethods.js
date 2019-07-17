/* eslint-disable */
const Parser = require('../Parser');
const JSType = require('../FileType/JSParser');
const WebComponentMethods = require('./WebComponentMethods');
const Compiler = require('../../Compiler/Compiler');
const fs = require('fs');
const replaceCode = require('../../helpers/processArray');
const createDirectory = require('../../helpers/createDirectory');

class RootIndexMethods {
  writeTag(inputs, args) {
    //console.log('PASO PER WRITETAG!!!!');
    return new Promise((resolve, reject) => {
      resolve(inputs.json.tag);
    });
  }

  writeExtends(inputs, args) {
    //console.log('PASO PER WRITEEXTENDS!!!!');
    let extendsString = '';
    if (inputs.json.hasOwnProperty('extends')) {
      extendsString = `, {extends: "${inputs.json.extends}"}`;
    }
    return new Promise((resolve, reject) => {
      resolve(extendsString);
    });
  }

  async compileComponent(inputs, args) {
    const pathFile = inputs.options.context + '/' + inputs.json.basePath + '/' + inputs.json.js;
    inputs.webpack.addDependency(pathFile);
    let template = fs.readFileSync(pathFile, 'utf8').toString();
    const parser = new Parser(template, JSType, WebComponentMethods);
    const compiler = new Compiler(parser.statements);
    let return_string = template;
    const compilerResult = await compiler
      .compile({ json: inputs.json, options: inputs.options, webpack: inputs.webpack })
      .catch(e => {
        return_string = `document.addEventListener("DOMContentLoaded", () =>{
        document.body.innerHTML += "${inputs.webpack.resourcePath}: ${e}";
      })`;
      });
    const compiledTemplate = await replaceCode(compilerResult, return_string);
    const splittedFilePath = inputs.json.js.split('/');
    const compiledFilePath = splittedFilePath[0] + '/' + 'dist' + '/' + splittedFilePath[1];
    const completeCompiledPath =
      inputs.options.context + '/' + inputs.json.basePath + '/' + compiledFilePath;
    const distPath =
      inputs.options.context + '/' + inputs.json.basePath + '/' + splittedFilePath[0] + '/' + 'dist';
    createDirectory(distPath);
    fs.writeFileSync(completeCompiledPath, compiledTemplate);
    return new Promise((resolve, reject) => {
      resolve(compiledFilePath);
    });
  }
  async writePath(inputs, args, promise) {
    const path = await promise.catch(e => {
      reject(e);
    });
    return new Promise((resolve, reject) => {
      resolve('./' + path);
    });
  }
}

module.exports = RootIndexMethods;
