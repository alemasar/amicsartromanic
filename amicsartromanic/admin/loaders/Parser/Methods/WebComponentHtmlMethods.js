/* eslint-disable */
const fs = require('fs');
const getProxyObj = require('../../helpers/getProxyObj');
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

  searchEndTagName(HTMLtemplate, tagName, position) {
    let sortir = false;
    let nextCloseTagName = HTMLtemplate.indexOf('</' + tagName, position);
    let tagNameChildNodes = HTMLtemplate.indexOf('<' + tagName, position + 1);
    let contChildNodes = 1;
    let contCloseChildNodes = 0;

    while (!sortir) {
      //tagPositions.push(tagNameChildNodes);
      //console.log(tagNameChildNodes);
      if (nextCloseTagName > -1) {
        contCloseChildNodes += 1;
      }
      if (tagNameChildNodes > -1) {
        contChildNodes += 1;
      }
      if (contChildNodes === contCloseChildNodes) {
        sortir = true;
      } else {
        nextCloseTagName = HTMLtemplate.indexOf('</' + tagName, nextCloseTagName + 1);
        tagNameChildNodes = HTMLtemplate.indexOf('<' + tagName, tagNameChildNodes + 1);
      }
    }
    return nextCloseTagName + tagName.length + 3;
  }

  getCatForEachAtribute(tag, posCatForeach) {
    const firstQuotePosition = tag.indexOf('"', posCatForeach);
    const secondQuotePosition = tag.indexOf('"', firstQuotePosition + 1);
    const catForeachAtribute = tag
      .substring(firstQuotePosition + 1, secondQuotePosition)
      .split('in');
    return {
      catForeachPropertyName: catForeachAtribute[0].trim(),
      mainObjectName: catForeachAtribute[1].trim()
    };
  }

  searchCatforeach(HTMLtemplate, position, elements) {
    const nextOpenTagPosition = HTMLtemplate.indexOf('<', position);
    const nextCloseTagPosition = HTMLtemplate.indexOf('</', position);
    let cont = 0;
    if (nextOpenTagPosition > -1 && nextOpenTagPosition !== nextCloseTagPosition) {
      let finalTagPosition = HTMLtemplate.indexOf('>', nextOpenTagPosition) + 1;
      const tag = HTMLtemplate.substring(nextOpenTagPosition, finalTagPosition);
      const posCatForeach = tag.indexOf('cat-foreach');
      if (posCatForeach > -1) {
        cont += 1;
        const spacePosition = HTMLtemplate.indexOf(' ', nextOpenTagPosition);
        const tagName = HTMLtemplate.substring(nextOpenTagPosition + 1, spacePosition);
        const catForeachAtribute = this.getCatForEachAtribute(tag, posCatForeach);
        if (htmlVoidElements.indexOf(tagName) === -1) {
          finalTagPosition = this.searchEndTagName(HTMLtemplate, tagName, nextOpenTagPosition);
          //console.log(HTMLtemplate.substring(nextOpenTagPosition, finalTagPosition));
        }
        /*console.log(HTMLtemplate.substring(nextOpenTagPosition, finalTagPosition))
        console.log("ELEMENTS: ", elements);*/
        if (
          elements.length > 0 &&
          elements[elements.length - 1].finalTagPosition > finalTagPosition
        ) {
          elements[elements.length - 1].child = [];
          elements[elements.length - 1].child.push({
            mainObjectName: catForeachAtribute.mainObjectName,
            catForeachPropertyName: catForeachAtribute.catForeachPropertyName,
            initialTagPosition: nextOpenTagPosition,
            finalTagPosition
          });
          elements = elements[elements.length - 1].child;
        } else {
          elements.push({
            mainObjectName: catForeachAtribute.mainObjectName,
            catForeachPropertyName: catForeachAtribute.catForeachPropertyName,
            initialTagPosition: nextOpenTagPosition,
            finalTagPosition
          });
        }
      }
      if (cont <= 1) {
        this.searchCatforeach(HTMLtemplate, nextOpenTagPosition + 1, elements);
      }
    } else if (nextCloseTagPosition > -1) {
      this.searchCatforeach(HTMLtemplate, nextOpenTagPosition + 1, elements);
    }
    return elements;
  }
  escapeInitialObject(values) {
    let returnValue = values;
    if (values.indexOf('{') > -1) {
      returnValue = returnValue.replace(/(?<!\\)'/g, '"');
      returnValue = returnValue.replace(/\'/g, "\\'");
      returnValue = returnValue.replace(/\n/g, '');
      returnValue = returnValue.replace(/\s+(?=([^"]*"[^"]*")*[^"]*$)/g, '');
      returnValue = returnValue.replace(/,/g, ',"');
      returnValue = returnValue.replace(/"{/g, '{');
      returnValue = returnValue.replace(/{/g, '{"');
      returnValue = returnValue.replace(/:/g, '":');
    } else {
      returnValue = returnValue.replace(/'/g, '"');
    }
    return returnValue;
  }

  parseChildInitialState(element, HTMLtemplate, obj) {
    let childHTML = '';
    let originalTag = '';
    let childObjKey = '';
    let objKey = '';
    let parsedChild = '';
    if (element.hasOwnProperty('child')) {
      objKey = element.catForeachPropertyName;
      console.log("ELEMENT EN PARSECHILD",element);
      const posSentence = HTMLtemplate.indexOf(objKey, HTMLtemplate.indexOf(element.mainObjectName) + 1)
      if (posSentence > -1){
        const sentence = HTMLtemplate.substring(posSentence, HTMLtemplate.indexOf('}', posSentence));
        
        console.log("HE ENCONTRADO: ", sentence)
      }
      element.child.forEach((child, index)=>{
        /*tempTag = tempTag.replace(
          '{{' + element.catForeachPropertyName + '.' + entry[0] + '}}',
          entry[1]
        );*/       
        childObjKey = child.mainObjectName.split(".")[1];
        parsedChild = this.parseChildInitialState(child, HTMLtemplate, obj[childObjKey][index])
      })
    }
    /*
    element.child.forEach(child => {
      console.log("ELEMENT CHILD: ",obj)
      let childTag = HTMLtemplate.substring(child.initialTagPosition, child.finalTagPosition);
      originalTag = childTag;
      const splittedMainChildObj = child.mainObjectName.split('.');
      obj[splittedMainChildObj[1]].forEach(entry=>{
        const values = Object.entries(entry)[0];
        childHTML += childTag.replace(
          '{{' + child.catForeachPropertyName + '.' + values[0] + '}}',
          values[1]
        );
      });
      if (child.hasOwnProperty('child')) {
        console.log("CHILD CHILD: ", obj)
      }
    });*/
    return {
      childHTML,
      originalTag
    };
  }

  parseInitialState(element, template, HTMLtemplate) {
    let returnTemplate = HTMLtemplate;
//    elements.forEach(element => {
      const propertyPosition = template.indexOf('this.' + element.mainObjectName);
      const equalPosition = template.indexOf('=', propertyPosition);
      const semicolonPosition = template.indexOf(';', equalPosition + 1);
      const objectString = template.substring(equalPosition + 1, semicolonPosition);
      let resultedTag = '';
      if (objectString.indexOf('[') > -1) {
        const catForeachObj = JSON.parse(this.escapeInitialObject(objectString));
        const tag = HTMLtemplate.substring(element.initialTagPosition, element.finalTagPosition);

        catForeachObj.forEach(obj => {
          let tempTag = tag;
          let child = {};
          Object.entries(obj).forEach(entry => {
            if (!element.hasOwnProperty('child')){
              tempTag = tempTag.replace(
                '{{' + element.catForeachPropertyName + '.' + entry[0] + '}}',
                entry[1]
              );
            }
          });
          let parsedChild = '';
          if (element.hasOwnProperty('child')) {
            //console.log("ELEMENT CHILD: ", element.child)
            element.child.forEach((child, index) => {
              const objKey = child.mainObjectName.split('.')[1];
              //console.log("CHILD HTML: ", obj[objKey][index])
              let childTag = HTMLtemplate.substring(child.initialTagPosition, child.finalTagPosition);
              parsedChild = this.parseChildInitialState(child, childTag, obj[objKey][index]);
            })
            /*child = this.parseChildInitialState(element, HTMLtemplate, obj[entry[0]]);
            resultedTag = resultedTag.replace(child.originalTag, child.childHTML);*/
          }
          resultedTag += tempTag;      
        });
        returnTemplate = returnTemplate.replace(tag, resultedTag);
      }
//    });
    return resultedTag;
  }

  importCatforeach(inputs, args) {
    const HTMLTemplatePath =
      inputs.options.context + '/' + inputs.json.basePath + '/' + inputs.json.template;
    let HTMLtemplate = fs.readFileSync(HTMLTemplatePath, 'utf8').toString();
    HTMLtemplate = HTMLtemplate.replace('<!-- import cat-foreach -->', '');
    // HTMLtemplate = HTMLtemplate.replace(/\n/gi, '');
    // HTMLtemplate = HTMLtemplate.replace(/>(\s)*</g, '><');
    this.elements = this.searchCatforeach(HTMLtemplate, 0, []);
    //const catForEachObj = getTagProperties(HTMLtemplate);
    const func = template => {
      //console.log('JS FILE', this.elements);
      let returnTemplate = template;
      let resultTemplate = '';
      //console.log("ELEMENT: ", this.elements[1].child)
      this.elements.forEach(element => {
        const tempTemplate = this.parseInitialState(element, returnTemplate, HTMLtemplate);
        resultTemplate += tempTemplate;
      });
      returnTemplate = returnTemplate.replace(HTMLtemplate, resultTemplate);      
      //if (catForEachObj.length > 0) {
      //const returnTemplate = this.insertJSBind(template, catForEachObj);
      /*const templatePosition = template.indexOf('templateHTML.innerHTML');
      const openTemplate = template.indexOf('`', templatePosition);
      console.log(openTemplate);
      const finalPosition = template.indexOf('`', openTemplate + 1);
      const HTMLtemplate = template.substring(openTemplate + 1, finalPosition).replace('\n', '');
      console.log('HTML Template', HTMLtemplate);*/
      /*this.elements.forEach((element) => {
        console.log(template.substring(element.initialTagPosition, element.finalTagPosition));
      })*/
      return returnTemplate;
      //}
    };
    return new Promise((resolve, reject) => {
      resolve({
        afterCodeReplaced: func.bind(this)
      });
    });
    /*    return new Promise((resolve, reject) => {
      resolve(true);
    });*/
  }
}

module.exports = WebComponentHtmlMethods;
