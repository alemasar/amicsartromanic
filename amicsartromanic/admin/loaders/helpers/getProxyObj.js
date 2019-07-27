const getProxyObj = properties => {
  const porpertyName = properties.mainPropertyName;
  const objName = properties.mainObjName;
  const tag = `${properties.tag.replace(`cat-foreach="${objName} in ${porpertyName}"`, '')}`;
  const handler = `
  (originalObj) => {
    let t = originalObj;
    const arrayNodes = getNodes(templateHTML.content, '${porpertyName}', '${objName}');
    console.log(arrayNodes)
    return new Proxy(t, proxyHandlerObj(arrayNodes, \`${tag}\`));
  }
  `;
  return `${handler}`;
};

module.exports = getProxyObj;
