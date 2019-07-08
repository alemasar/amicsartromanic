/* eslint-disable */
const path = require('path');
const Ajv = require('ajv');
const sass = require('node-sass');
const fs = require('fs');

class WebComponentMethods {
  compileHTML(inputs, args) {
    const ajv = Ajv({ allErrors: true });
    const scssSchema = require('./schema/template.schema');
    ajv.addSchema(scssSchema, 'template-loader');
    const valid = ajv.validate('template-loader', inputs.json);

    if (!valid) {
      inputs.json.HTML = new Promise((resolve, reject) => {
        reject(ajv.errorsText());
      });
    } else {
      const templatePath =
        inputs.options.context + '/' + inputs.json.basePath + '/' + inputs.json.template;
      let template = fs.readFileSync(templatePath, 'utf8');
      inputs.webpack.addDependency(templatePath);
      const compileHTMLPromise = new Promise((resolve, reject) => {
        resolve(template);
      });
      //console.log("COMPILE HTML ",compileHTMLPromise);
      return compileHTMLPromise;
    }
  }
  writeHTML(inputs, args, promise) {
    const getHTML = async () => {
      try {
        const html = await promise;
        console.log("WRITEHTML", promise);
        return new Promise((resolve, reject) => {
          resolve(
            `const templateHTML = document.createElement("template");
           templateHTML.innerHTML = \`${html}\`;`
          );
        });
      } catch (error) {
        // return new Error(error);
        return new Promise((resolve, reject) => {
          reject('/* ' + error + ' */');
        });
      }
    };
    return getHTML();
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
            console.log('ESTO ES THIS: ', this);
            this.searchImages(css, inputs.json.basePath, inputs.webpack);
            resolve(css);
          }
        );
      });
      promise = compileScssPromise;
    }

    return promise;
  }

  writeCss(inputs, args, promise) {
    const getCss = async () => {
      try {
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
      } catch (error) {
        // return new Error(error);
        return new Promise((resolve, reject) => {
          reject('/* ' + error + ' */');
        });
      }
    };
    return getCss();
  }
}

module.exports = WebComponentMethods;
