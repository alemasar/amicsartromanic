/* eslint-disable */
const Parser = require('../Parser');
const JSType = require('../FileType/JSParser');
const WebComponentMethods = require('./WebComponentMethods');
const Compiler = require('../../Compiler/Compiler');
const fs = require('fs');
const replaceCode = require('../../helpers/processArray');
const path = require('path');
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
        console.log('ERROR EN CAT LOADER');
        return_string = `document.addEventListener("DOMContentLoaded", () =>{
        document.body.innerHTML += "${inputs.webpack.resourcePath}: ${e}";
      })`;
      });
    const compiledTemplate = await replaceCode(compilerResult, template);
    const joinedFilePath = inputs.json.js.split('/');
    const compiledFilePath = joinedFilePath[0] + '/' + 'dist' + '/' + joinedFilePath[1];
    console.log(compiledFilePath);
    const completeCompiledPath =
      inputs.options.context + '/' + inputs.json.basePath + '/' + compiledFilePath;

    fs.mkdirSync(
      inputs.options.context + '/' + inputs.json.basePath + '/' + joinedFilePath[0] + '/' + 'dist',
      { recursive: true },
      e => {
        if (e) {
          console.error(e);
        } else {
          //console.log('Success');
        }
      }
    );
    console.log("COMPILED TEMPLATE", compiledTemplate)
    fs.writeFileSync(completeCompiledPath, compiledTemplate);
    return new Promise((resolve, reject) => {
      resolve(compiledFilePath);
    });
  }
  async writePath(inputs, args, promise) {
    const path = await promise.catch(e => {
      reject(e);
    });
    console.log('EJECUTO WRITE PATH', './' + path);
    return new Promise((resolve, reject) => {
      resolve('./' + path);
    });
  }
}

module.exports = RootIndexMethods;
