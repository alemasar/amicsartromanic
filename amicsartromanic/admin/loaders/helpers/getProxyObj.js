const getProxyObj = properties => {
  const propertyName = properties.mainPropertyName;
  const objName = properties.mainObjName;
  // const tag = `${properties.tag.replace(`cat-foreach="${objName} in ${propertyName}"`, '')}`;
  console.log(properties.tag)
  let tag = properties.tag.replace(/\n/gi, '');
  tag = tag.replace(/>(\s)*</g, '><');
  const reg = RegExp(/<(.*?)[/>|>]/g);
  //console.log("A VEURE QUE TROBO: ",reg.exec(tag))

  let tagExpresion = reg.exec(tag);
  while (tagExpresion) {
    console.log(tagExpresion[1]);
    const atributtesString = tagExpresion[1];
    let spacePosition = atributtesString.indexOf(' ');
    let startPosition = 0;
    let atribute = '';
    if (spacePosition === -1) {
      if (atributtesString !== '') {
        console.log("TAG:", atributtesString.trim());
      }
    } else {
      while (spacePosition > -1) {
        const equalPosition = atributtesString.lastIndexOf('=', spacePosition);
        if (equalPosition === -1) {
          atribute = atributtesString.substring(startPosition, spacePosition);
          startPosition = spacePosition + 1;
          spacePosition = atributtesString.indexOf(' ', startPosition);
          console.log('ATRIBUTE', atribute);
        } else {
          const closeQuote = atributtesString.indexOf('"', equalPosition + 3);
          startPosition = atributtesString.lastIndexOf(' ', equalPosition);
          atribute = atributtesString.substring(startPosition, closeQuote + 1);
          startPosition = atributtesString.indexOf(' ', closeQuote + 1);
          spacePosition = atributtesString.indexOf(' ', startPosition + 1);
          console.log('ATRIBUTE', atribute);
          console.log('ATRIBUTE WITH QUOTES', spacePosition);
          if (spacePosition === -1 && closeQuote !== atributtesString.length) {
            console.log(
              'LAST ATRIBUTE',
              atributtesString.substring(closeQuote + 1, atributtesString.length)
            );
            // atributtesString.substring(closeQuote + 1, atributtesString.length)
            //console.log('LAST ATRIBUTE', reg.exec(tag));
          }
        }
      }
    }
    tagExpresion = reg.exec(tag);
  }

  const handler = `
  (originalObj) => {
    let t = originalObj;
    const arrayNodes = getNodes(templateHTML.content, '${propertyName}', '${objName}');
    console.log(templateHTML.content)
    return new Proxy(t, proxyHandlerObj(arrayNodes, templateHTML${propertyName}));
  }
  `;
  return `${handler}`;
};

module.exports = getProxyObj;
