/* eslint-disable */
const loader_utils = require('loader-utils');
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const sass = require('node-sass');

class HTMLTemplateMethods {

  compileTemplate(inputs, args) {
    const argumentURL = args[0];
    const dataURL = args[1];

    const template = fs.readFileSync(inputs.options.context + '/' + argumentURL, "utf8").toString();
    const dataJSON = JSON.parse(fs.readFileSync(inputs.options.context + '/' + inputs.json.basePath + '/' + dataURL, "utf8").toString());
    let compiledTemplate = "";
    let posOpenIndexComment = 0;
    let posCloseIndexComment = 0;
    dataJSON.form.forEach((formElement, index)=>{
      posOpenIndexComment = template.indexOf("<!-- write element with index " + (index + 1) + " -->");
      const templateBetweenElements = template.substr(posCloseIndexComment, posOpenIndexComment-posCloseIndexComment);
      posCloseIndexComment = template.indexOf("<!-- end write element -->", posOpenIndexComment);
      let partialTemplate = template.substr(posOpenIndexComment, posCloseIndexComment-posOpenIndexComment);
      let compiledPartialTemplate = "";

      if (formElement.hasOwnProperty("label")){
        compiledPartialTemplate = partialTemplate.replace("{{ label }}", formElement.label);
        compiledPartialTemplate = compiledPartialTemplate.replace("{{ id }}", formElement.attributes.id);
      }
      let tagTemplate = "<" + formElement.tag
      Object.keys(formElement.attributes).forEach((key) => {
        tagTemplate += ` ${key} = "${formElement.attributes[key]}"`;
      });
      tagTemplate += "/>";
      compiledPartialTemplate = compiledPartialTemplate.replace("{{ tag }}", tagTemplate);
      compiledTemplate += templateBetweenElements + compiledPartialTemplate;
    })
    compiledTemplate += template.substr(posCloseIndexComment);
    return new Promise((resolve, reject) => {
      resolve(compiledTemplate);
    });
  }
  importTemplateStyles(inputs, args) {
    // console.log("PASO PER WRITE TEMPLATE STYLES: ", __dirname)

    const ajv = Ajv({ allErrors: true });
    const mainStylesSchema = require('./schema/main-styles.schema');
    ajv.addSchema(mainStylesSchema, 'mainStyles-loader');
    const valid = ajv.validate('mainStyles-loader', inputs.json);

    if (!valid) {
      inputs.json.css = new Promise((resolve, reject) =>{
        reject(ajv.errorsText());
      });
    } else {
      const mainStylesBasePath = inputs.options.context + '/' + inputs.json.basePath + '/';
      inputs.json.mainStyles.forEach(mainStyle=>{
        if (mainStyle.indexOf(".css") != -1) {
          const styles = fs.readFileSync(mainStylesBasePath + mainStyle, "utf8").toString();
          inputs.webpack.emitFile(inputs.json.basePath + '/' + mainStyle, styles);
        } else if (mainStyle.indexOf(".scss") != -1) {
          sass.render(
            {
              file: mainStylesBasePath + mainStyle
            },
            (err, result) => {
              // console.log(err)
              const css = result.css.toString();
              inputs.webpack.emitFile(inputs.json.basePath + '/' + mainStyle.replace(".scss",".css").replace("scss","css"), css);
            }
          );
        }
      });
    }

    return new Promise((resolve, reject) => {
      resolve(inputs.json);
    });
  }

  writeLinkPath(inputs, args){
    let css = ``;
    inputs.json.mainStyles.forEach(mainStyle=>{
      css += `<link href="${inputs.json.basePath + '/' + mainStyle.replace(".scss",".css").replace("scss","css")}" rel="stylesheet" type="text/css">`
    })
    return new Promise((resolve, reject) => {
      resolve(css);
    });
  }
}

module.exports = HTMLTemplateMethods;
