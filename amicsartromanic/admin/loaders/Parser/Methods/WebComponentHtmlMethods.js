/* eslint-disable */
const fs = require('fs');
const getTagProperties = require('../../helpers/catForeachHelper');
const getProxyObj = require('../../helpers/getProxyObj');

class WebComponentHtmlMethods {
  insertJSBind(jsFile, catForeachProperties) {
    const codeImports = `import getComment from '../../../cat-elements/helper/getComments.js';\nimport insertNodes from '../../../cat-elements/helper/insertNodes.js';\n`;
    let template = jsFile;
    catForeachProperties.forEach(properties => {
      const mainPropertyName = properties.mainPropertyName;
      const propertyPosition = template.indexOf('this.' + mainPropertyName);
      const equalPosition = template.indexOf('=', propertyPosition);
      const semicolonPosition = template.indexOf(';', equalPosition + 1);
      const codeBeforeProxy = template.substring(0, semicolonPosition + 1);
      const codeAfterProxy = template.substring(semicolonPosition + 1);
      const insertedProxyString = `
      const handler${mainPropertyName} = ${getProxyObj(properties)};
      this.${mainPropertyName} = new Proxy (Object.assign(this.${mainPropertyName}, {
        _originalHandler: handler${mainPropertyName},
        _originalTarget: this.${mainPropertyName}
      }), handler${mainPropertyName});`;
      template = codeBeforeProxy + insertedProxyString + codeAfterProxy;
    });
    return codeImports + template;
  }

  importCatforeach(inputs, args) {
    const HTMLTemplatePath =
      inputs.options.context + '/' + inputs.json.basePath + '/' + inputs.json.template;
    let HTMLtemplate = fs.readFileSync(HTMLTemplatePath, 'utf8').toString();
    HTMLtemplate = HTMLtemplate.replace('<!-- import cat-foreach -->', '');
    const catForEachObj = getTagProperties(HTMLtemplate);
    const func = template => {
      if (catForEachObj.length > 0) {
        const returnTemplate = this.insertJSBind(template, catForEachObj);
        return returnTemplate;
      }
    };
    return new Promise((resolve, reject) => {
      resolve({
        afterResolve: func.bind(this)
      });
    });
  }
}

module.exports = WebComponentHtmlMethods;
