/* eslint-disable */
const loader_utils = require('loader-utils');
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const sass = require('node-sass');

class HTMLTemplateMethods {
  importTemplateStyles(inputs, output) {
    const options = loader_utils.getOptions(inputs.webpack);
    console.log("PASO PER WRITE TEMPLATE STYLES: ", __dirname)

    const ajv = Ajv({ allErrors: true });
    const mainStylesSchema = require('./schema/main-styles.schema');
    ajv.addSchema(mainStylesSchema, 'mainStyles-loader');
    const valid = ajv.validate('mainStyles-loader', inputs.json);

    if (!valid) {
      inputs.json.css = new Promise((resolve, reject) =>{
        reject(ajv.errorsText());
      });
    } else {
      const mainStylesBasePath = options.context + '/' + inputs.json.basePath + '/';
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
              console.log(err)
              const css = result.css.toString();
              inputs.webpack.emitFile(inputs.json.basePath + '/' + mainStyle.replace(".scss",".css").replace("scss","css"), css);
            }
          );
        }
      });
    }

    return inputs.json;
  }

  writeLinkPath(inputs, output){
    let css = ``;
    inputs.json.mainStyles.forEach(mainStyle=>{
      css += `<link href="${inputs.json.basePath + '/' + mainStyle.replace(".scss",".css").replace("scss","css")}" rel="stylesheet" type="text/css">`
    })
    return css;
  }
}

module.exports = HTMLTemplateMethods;
