/* eslint-disable */
const fs = require('fs');
const getTagProperties = require('../../helpers/catForeachHelper');
const getProxyObj = require('../../helpers/getProxyObj');
const escapeInitialCatForeachObject = require('../../helpers/proxyHelper');
const getInitialObjectString = require('../../helpers/proxyHelper');
const htmlVoidElements = require('html-void-elements');

class WebComponentHtmlMethods {
  constructor() {
    this.elements = [];
  }

  insertJSBind(jsFile, catForeachProperties) {
    const codeImports = `import getProxyFunction from '../../../cat-elements/helper/getProxyFunction.js';\n
                         import proxyHandlerObj from '../../../cat-elements/helper/getProxyHandler.js';\n
                         import getNodes from '../../../cat-elements/helper/getNodes.js';\n`;
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
      this.${mainPropertyName} = handler${mainPropertyName}(this.${mainPropertyName})`;
      template = codeBeforeProxy + insertedProxyString + codeAfterProxy;
    });
    return codeImports + template;
  }

  searchCatforeach(HTMLtemplate, position) {
    console.log(position);
    let catForEachPosition = HTMLtemplate.indexOf('cat-foreach', position);
    if (catForEachPosition > -1) {
      let firstTagPosition = HTMLtemplate.lastIndexOf('<', catForEachPosition);
      let tag = HTMLtemplate.substring(
        firstTagPosition,
        HTMLtemplate.indexOf('>', catForEachPosition) + 1
      );
      let tagName = HTMLtemplate.substring(
        firstTagPosition + 1,
        HTMLtemplate.indexOf(' ', firstTagPosition)
      );
      if (htmlVoidElements.indexOf(tagName) > -1) {
        console.log('HE ENCONTRADO UN VOID ELEMENT', tagName);
        this.elements.push({ tagName });
      } else {
        console.log('HE ENCONTRADO UN ELEMENT', tagName);
        this.elements.push({ tagName });
      }
      this.searchCatforeach(HTMLtemplate, catForEachPosition + 1);
    }
  }

  getAttributes(tag, tagName) {
    const attributes = [];
    const atributtesString = tag
      .replace('<' + tagName, '')
      .replace('/>', '')
      .replace('>', '')
      .trim();
    let spacePosition = atributtesString.indexOf(' ', 0);
    let equalPosition = atributtesString.indexOf('=', 0);
    let endAtribute = 0;
    let sortir = false;
    if (equalPosition > 0 || spacePosition > 0) {
      while (equalPosition > 0 || spacePosition > 0 && !sortir) {      
        const openQuote = atributtesString.indexOf('"', equalPosition);
        const closeQuote = atributtesString.indexOf('"', openQuote + 1);
        if (equalPosition < spacePosition) {
          const atributeName = atributtesString.substring(endAtribute, equalPosition);
          const atributeValue = atributtesString.substring(openQuote + 1, closeQuote);
          attributes.push({
            atributeName,
            atributeValue
          });
        } else if (equalPosition > -1) {
          const atributeName = atributtesString.substring(endAtribute, equalPosition);
          attributes.push({
            atributeName
          });
        }
        spacePosition = atributtesString.indexOf(' ', closeQuote + 2);
        equalPosition = atributtesString.indexOf('=', closeQuote + 1);
        endAtribute = closeQuote+2;
        //sortir = true;
      }
      if (endAtribute < atributtesString.length) {
        const atributteString = atributtesString.substring(endAtribute, atributtesString.length);
        equalPosition = atributteString.indexOf('=', 0);
        if (equalPosition > -1) {
          const openQuote = atributtesString.indexOf('"', equalPosition);
          const closeQuote = atributtesString.indexOf('"', openQuote + 1);
          attributes.push({
            atributeName : atributteString.substring(0, equalPosition),
            atributeValue : atributtesString.substring(openQuote + 1, closeQuote)
          });
        } else {
          attributes.push({
            atributeName : atributteString.substring(0)
          });
        }
      }
    }
    return attributes;
  }

  parseHTML(HTMLtemplate, position) {
    const nextOpenTagPosition = HTMLtemplate.indexOf('<', position);
    const nextCloseTagPosition = HTMLtemplate.indexOf('</', position);
    if (nextOpenTagPosition > -1 && nextOpenTagPosition !== nextCloseTagPosition) {
      const tag = HTMLtemplate.substring(
        nextOpenTagPosition,
        HTMLtemplate.indexOf('>', nextOpenTagPosition) + 1
      );
      let posCloseTagName = 0;
      const spacePosition = HTMLtemplate.indexOf(' ', nextOpenTagPosition);
      const closeTagNamePosition = HTMLtemplate.indexOf('>', nextOpenTagPosition);
      if (spacePosition < closeTagNamePosition) {
        posCloseTagName = spacePosition;
      } else {
        posCloseTagName = closeTagNamePosition;
      }
      const tagName = HTMLtemplate.substring(nextOpenTagPosition + 1, posCloseTagName);
      console.log('TAG: ', tag);
      console.log('TAGNAME: ', tagName);
      const atributes = this.getAttributes(tag, tagName);
      this.elements.push({ tagName, atributes });
      this.parseHTML(HTMLtemplate, nextOpenTagPosition + 1);
    } else if (nextCloseTagPosition > -1) {
      this.parseHTML(HTMLtemplate, nextOpenTagPosition + 1);
    }
  }

  importCatforeach(inputs, args) {
    const HTMLTemplatePath =
      inputs.options.context + '/' + inputs.json.basePath + '/' + inputs.json.template;
    let HTMLtemplate = fs.readFileSync(HTMLTemplatePath, 'utf8').toString();
    HTMLtemplate = HTMLtemplate.replace('<!-- import cat-foreach -->', '');
    HTMLtemplate = HTMLtemplate.replace(/\n/gi, '');
    HTMLtemplate = HTMLtemplate.replace(/>(\s)*</g, '><');
    console.log(HTMLtemplate);
    this.parseHTML(HTMLtemplate, 0);
    console.log(this.elements);
    /*    const catForEachObj = getTagProperties(HTMLtemplate);
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
    });*/
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}

module.exports = WebComponentHtmlMethods;
