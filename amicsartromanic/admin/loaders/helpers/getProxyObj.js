const getProxyObj = properties => {
  return `{
    get(target, key, proxy) {
      console.log('TEMPLATE: ' + key);
      return target[key];
    },
    set(obj, prop, value) {
      if (parseInt(prop)) {
        obj[prop] = value;
        const rootElement = templateHTML.content;
        const lastElem = getComment(
          rootElement,
          \`end cat-foreach ${properties.mainPropertyName}, ${properties.mainObjName}\`
        ).previousSibling;
        let replacedTag = \`${properties.tag}\`;
        Object.keys(value).forEach(key => {
          replacedTag = replacedTag.replace(\`{{${properties.mainObjName}[key]}}\`, value[key]);
        });
        const element = new DOMParser().parseFromString(replacedTag, 'text/html').body.firstChild;
        lastElem.parentNode.insertBefore(element, lastElem.nextSibling);
      }
      return true;
    }
  }`;
};

module.exports = getProxyObj;
