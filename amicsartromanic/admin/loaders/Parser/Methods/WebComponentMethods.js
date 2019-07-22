/* eslint-disable */
const path = require('path');
const Ajv = require('ajv');
const sass = require('node-sass');
const fs = require('fs');
const Parser = require('../Parser');
const Compiler = require('../../Compiler/Compiler');
const HTMLType = require('../FileType/HTMLParser');
const WebComponentHtmlMethods = require('./WebComponentHtmlMethods');
const replaceCode = require('../../helpers/processArray');
const getTagProperties = require('../../helpers/catForeachHelper');

class WebComponentMethods {
  async compileHTML(inputs, args) {
    const ajv = Ajv({ allErrors: true });
    const scssSchema = require('./schema/template.schema');
    ajv.addSchema(scssSchema, 'template-loader');
    const valid = ajv.validate('template-loader', inputs.json);

    if (!valid) {
      return Promise.reject(ajv.errorsText());
    } else {
      const templatePath =
        inputs.options.context + '/' + inputs.json.basePath + '/' + inputs.json.template;
      let template = fs.readFileSync(templatePath, 'utf8');
      inputs.webpack.addDependency(templatePath);
      const parser = new Parser(template, HTMLType, WebComponentHtmlMethods);
      let statement = '';
      if (parser.statements.length > 0) {
        // console.log('COMPILE HTML', parser.statements[0]);
        statement = parser.statements[0].statement;
      }
      const compiler = new Compiler(parser.statements);
      const compilerResult = await compiler
        .compile({ json: inputs.json, options: inputs.options, webpack: inputs.webpack })
        .catch(e => {
          console.log('ERROR EN WEBCOMPONENTMETHODS', e);
          return_string = `document.addEventListener("DOMContentLoaded", () =>{
        document.body.innerHTML += "${inputs.webpack.resourcePath}: ${e}";
      })`;
        });

      return new Promise((resolve, reject) => {
        resolve({ compilerResult, template, statement });
      });
    }
  }
  async writeHTML(inputs, args, promise) {
    const html = await promise;
    console.log('WRITE HTML', inputs.webpack.resource);
    const jsPath = inputs.options.context + '/' + inputs.json.basePath + '/' + inputs.json.js;
    const jsFile = fs.readFileSync(jsPath, 'utf8');
    let HTMLtemplate = html.template;
    HTMLtemplate = HTMLtemplate.replace('<!-- import cat-foreach -->', '');
    const catForEachObj = getTagProperties(HTMLtemplate);

    if (catForEachObj.length > 0) {

      catForEachObj.forEach(catForEach => {
        const mainPropertyName = catForEach.mainPropertyName;
        const propertyPosition = jsFile.indexOf('this.' + mainPropertyName);
        const equalPosition = jsFile.indexOf('=', propertyPosition);
        const semicolonPosition = jsFile.indexOf(';', equalPosition + 1);
        let values = jsFile.substring(equalPosition + 1, semicolonPosition).trim();
        values = values.replace(/'/g, '"');
        const json = JSON.parse(values);
        console.log("VALUES:", json[0])
        HTMLtemplate = HTMLtemplate.replace(
          catForEach.tag,
          `<!-- cat-foreach ${catForEach.mainPropertyName}, ${catForEach.mainObjName} -->
         ${catForEach.tag}
         <!-- end cat-foreach ${catForEach.mainPropertyName}, ${catForEach.mainObjName} -->`
        );
        
      });
      console.log('HTML', HTMLtemplate);
    }

    return new Promise((resolve, reject) => {
      resolve(
        `const templateHTML = document.createElement("template");
           templateHTML.innerHTML = \`${HTMLtemplate}\`;`
      );
    });
  }

  searchImages(css, basePath) {
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

  compileScss(inputs, args) {
    //    if (Object.getPrototypeOf(inputs.json).hasOwnProperty(output)){
    let promise = {};
    const ajv = Ajv({ allErrors: true });
    const scssSchema = require('./schema/scss.schema');
    ajv.addSchema(scssSchema, 'scss-loader');
    const valid = ajv.validate('scss-loader', inputs.json);

    if (!valid) {
      promise = new Promise((resolve, reject) => {
        reject(ajv.errorsText());
      });
    } else {
      const scssPath = inputs.options.context + '/' + inputs.json.basePath + '/' + inputs.json.scss;
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
      promise = compileScssPromise;
    }

    return promise;
  }

  async writeCss(inputs, args, promise) {
    const css = await promise;
    return new Promise((resolve, reject) => {
      resolve(
        `const templateCss = document.createElement("template");` +
          'templateCss.innerHTML = `' +
          '<style>' +
          `${css}` +
          '</style>' +
          '`;'
      );
    });
  }
}

module.exports = WebComponentMethods;
