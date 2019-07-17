/* eslint-disable */
const fs = require('fs');
class WebComponentHtmlMethods {
  insertJSBind(jsFile, property) {
    console.log("JS FILE", jsFile)
    const propertyPosition = jsFile.indexOf('this.' + property);
    const equalPosition = jsFile.indexOf('=', propertyPosition);
    const semicolonPosition = jsFile.indexOf(';', equalPosition + 1);
    const codeBeforeProxy = jsFile.substring(0, semicolonPosition + 1);
    const codeAfterProxy = jsFile.substring(semicolonPosition + 1);
    const insertedProxyString = `
        this.${property} = new Proxy (this.${property}, {
            get (target, key, proxy) {
                // console.log("TEMPLATE: " + templateHTML.innerHTML);
                return Reflect.get(target, key, proxy);
            }
        });`;
    return codeBeforeProxy + insertedProxyString + codeAfterProxy;
  }

  importCatforeach(inputs, args) {
    const func = template => {
      const HTMLTemplatePath =  inputs.options.context + '/' + inputs.json.basePath + '/' + inputs.json.template;
      let HTMLtemplate = fs.readFileSync(HTMLTemplatePath, 'utf8').toString();
      HTMLtemplate = HTMLtemplate.replace('<!-- import cat-foreach -->', '');
      const indexCatForEach = HTMLtemplate.indexOf('cat-foreach');
      if (indexCatForEach > -1) {
        const tag = HTMLtemplate.substring(
          HTMLtemplate.lastIndexOf('<', indexCatForEach),
          HTMLtemplate.indexOf('>', indexCatForEach) + 1
        );
        const mainPropertyName = tag
          .substring(
            tag.indexOf('=', tag.indexOf('cat-foreach')) + 2,
            tag.indexOf('"', tag.indexOf('=') + 3)
          )
          .trim()
          .split('in')[1]
          .trim();
        HTMLtemplate = HTMLtemplate.replace(tag, '<cat-foreach>' + tag + '</cat-foreach>');
        const returnTemplate = this.insertJSBind(template, mainPropertyName);
        console.log('ESTOY EN CAT FOREACH!!!!', HTMLtemplate);
        return returnTemplate;
      }
    };
    return new Promise((resolve, reject) => {
      resolve({
        code: 'ESTOY EN CAT FOREACH!!!!',
        afterResolve: func.bind(this)
      });
    });
  }
}

module.exports = WebComponentHtmlMethods;
