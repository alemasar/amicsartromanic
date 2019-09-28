const htmlVoidElements = require('html-void-elements');

const getTagProperties = HTMLtemplate => {
  let indexCatForEach = HTMLtemplate.indexOf('cat-foreach');
  let returnObj = [];
  while (indexCatForEach > -1) {
    const indexOfFirstLetterTag = HTMLtemplate.lastIndexOf('<', indexCatForEach);
    const tagName = HTMLtemplate.substring(
      indexOfFirstLetterTag + 1,
      HTMLtemplate.lastIndexOf(' ', indexCatForEach)
    );
    let tag = '';
    console.log(htmlVoidElements.indexOf(tagName));
    if (htmlVoidElements.indexOf(tagName) > -1) {
      tag = HTMLtemplate.substring(
        indexOfFirstLetterTag,
        HTMLtemplate.indexOf('>', indexOfFirstLetterTag) + 1
      );
    } else {
      const endTag = `</${tagName}>`;
      let posEndTag = HTMLtemplate.indexOf(endTag, indexOfFirstLetterTag);
      const posEndTags = [];
      while (posEndTag > -1) {
        posEndTags.push(posEndTag);
        posEndTag = HTMLtemplate.indexOf(endTag, posEndTag + 1);
      }
      if (posEndTags.length === 0) {
        console.log('ERROR A TAG: ', tagName);
      } else {
        posEndTag = posEndTags.pop();
        let posIniTagName = '';
        let notFinded = true;
        while (notFinded && posEndTag) {
          posIniTagName = HTMLtemplate.lastIndexOf(`<${tagName}`, posEndTag + 1);
          if (posIniTagName > -1 && posIniTagName > indexOfFirstLetterTag) {
            posEndTag = posEndTags.pop();
          } else {
            notFinded = false;
          }
        }
        tag = HTMLtemplate.substring(indexOfFirstLetterTag, posEndTag);
      }
    }
    const splittedMainPropertyName = tag
      .substring(
        tag.indexOf('=', tag.indexOf('cat-foreach')) + 2,
        tag.indexOf('"', tag.indexOf('=') + 3)
      )
      .trim()
      .split('in');
    console.log(splittedMainPropertyName);
    returnObj.push({
      mainPropertyName: splittedMainPropertyName[1].trim(),
      mainObjName: splittedMainPropertyName[0].trim(),
      tag
    });
    indexCatForEach = HTMLtemplate.indexOf('cat-foreach', indexCatForEach + 1);
  }
  return returnObj;
};

module.exports = getTagProperties;
