/* eslint-disable */
const loader_utils = require('loader-utils');
const sass = require('node-sass');
const fs = require('fs');
const CatHTMLParser = require("../../parser/parsers/CatHTMLParser");
const CATTemplateFunctionsCompiler = require("../CATTemplateFunctions/CATTemplateFunctionsCompiler");
const Process = require("../../compiler/CompilerProcess");
const path = require('path');
const Ajv = require('ajv');

class WebComponentJSMethods {
  compileJs(inputs, output){
    console.log("PASO PER COMPILE JS")
  }
  compileHTML(inputs, output) {
    const options = loader_utils.getOptions(inputs.webpack);

    const ajv = Ajv({ allErrors: true });
    const scssSchema = require('./schema/template.schema');
    ajv.addSchema(scssSchema, 'template-loader');
    const valid = ajv.validate('template-loader', inputs.json);

    if (!valid) {
      inputs.json.HTML = new Promise((resolve, reject) =>{
        reject(ajv.errorsText());
      });
    } else {
      const templatePath = options.context + '/' + inputs.json.basePath + '/' + inputs.json.template;
      let template = fs.readFileSync(templatePath, 'utf8');
      inputs.webpack.addDependency(templatePath);
      const compilerProcess = new Process(template, CatHTMLParser, CATTemplateFunctionsCompiler)
      const promise = compilerProcess.process(inputs.json, inputs.webpack);
      inputs.json.HTML = promise.then((string)=>{
        //console.log("ES ESTO????", string);
        let returnValue = template;
        if (string != ""){
          returnValue = string.html;
        }
        return new Promise((resolve, reject) => {
          resolve(returnValue);
        })
      });
    }
    return inputs.json;
  }

  writeHTML(inputs, output) {
    const getHTML = async () => {
      try {
        const html = await inputs.json[output];
        return (
          `const templateHTML = document.createElement("template");
           templateHTML.innerHTML = \`${html}\`;`
        );
      } catch (error) {
        // return new Error(error);
        return '/* ' + error + ' */';
      }
    };
    return getHTML();
  }
  searchImages(css, basePath, webpack) {
    const lines = css.split('\n');
    lines.forEach(line => {
      let imagePos = 0;
      if ((imagePos = line.indexOf('url')) > -1) {
        const pathImage = line.substring(imagePos + 8, line.indexOf(')', imagePos + 8) - 1);
        const image = fs.readFileSync(
          path.join(__dirname, '../../../../src/' + basePath + '/' + pathImage),
          'utf8'
        );
        // webpack.emitFile("./"+pathImage, image);
      }
    });
  }

  compileScss(inputs, output) {
    //    if (Object.getPrototypeOf(inputs.json).hasOwnProperty(output)){
    const options = loader_utils.getOptions(inputs.webpack);

    const ajv = Ajv({ allErrors: true });
    const scssSchema = require('./schema/scss.schema');
    ajv.addSchema(scssSchema, 'scss-loader');
    const valid = ajv.validate('scss-loader', inputs.json);

    if (!valid) {
      inputs.json.css = new Promise((resolve, reject) =>{
        reject(ajv.errorsText());
      });
    } else {
      const scssPath = options.context + '/' + inputs.json.basePath + '/' + inputs.json.scss;
      // let scss = fs.readFileSync(scssPath, 'utf8');
      inputs.webpack.addDependency(scssPath);
      // console.log(options.context)
      const compileScssPromise = new Promise((resolve, reject) => {
        sass.render(
          {
            file: scssPath
          },
          (err, result) => {
            // console.log(err)
            const css = result.css.toString();
            this.searchImages(css, inputs.json.basePath, inputs.webpack);
            resolve(css);
          }
        );
      });
      inputs.json.css = compileScssPromise;
    }

    return inputs.json;
  }

  writeCss(inputs, output) {
    const getCss = async () => {
      try {
        const css = await inputs.json[output];
        return (
          `const templateCss = document.createElement("template");` +
          'templateCss.innerHTML = `' +
          '<style>' +
          `${css}` +
          '</style>' +
          '`;'
        );
      } catch (error) {
        // return new Error(error);
        return '/* ' + error + ' */';
      }
    };
    return getCss();
  }

}

module.exports = WebComponentJSMethods;
