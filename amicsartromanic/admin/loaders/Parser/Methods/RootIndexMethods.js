/* eslint-disable */
const Parser = require('../Parser');
const JSType = require('../FileType/JSParser');
const WebComponentMethods = require('./WebComponentMethods');
const Compiler = require('../../Compiler/Compiler');
const fs = require('fs');
const getCode = require('../../helpers/processArray');

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

  compileComponent(inputs, args) {
    const pathFile = inputs.options.context + '/' + inputs.json.basePath + '/' + inputs.json.js;
    inputs.webpack.addDependency(pathFile);
    let template = fs.readFileSync(pathFile, 'utf8').toString();
    const parser = new Parser(template, JSType, WebComponentMethods);
    const compiler = new Compiler(template, parser.statements, parser.methods);
    compiler
      .compile({ json: inputs.json, options: inputs.options, webpack: inputs.webpack })
      .then(async code => {
        const compiledTemplate = await getCode(code, template);
        //console.log('COMPILECOMPONENT: ', compiledTemplate);
        //callback(null, template);
      });

    return new Promise((resolve, reject) => {
      resolve(pathFile);
    });
  }
  writePath(inputs, args, promise) {
//    console.log('PASO PER WRITEPATH!!!!', promise);
    const getPath = async () => {
      const path = await promise;
      return new Promise((resolve, reject) => {
        resolve(path);
      });
    }
    return getPath();
  }
}

module.exports = RootIndexMethods;
