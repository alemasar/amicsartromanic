const getProxyObj = properties => {
  const handler = `
  {
    get(obj, prop, proxy) {
      console.log(prop)
      if (typeof obj[prop] === 'function') {
        return function (el) {
          const rootElement = templateHTML.content;
          const firstElem = getComment(
            rootElement,
            \`cat-foreach ${properties.mainPropertyName}, ${properties.mainObjName}\`
          );
          const lastElem = getComment(
            rootElement,
            \`end cat-foreach ${properties.mainPropertyName}, ${properties.mainObjName}\`
          );
          let firstNode = firstElem.nextSibling;
          let arrayNodes = [];
          console.log(firstNode)

          while (firstNode !== lastElem){
            if (firstNode.nodeType !== 3){
              arrayNodes.push(firstNode);
            }
            firstNode = firstNode.nextSibling;
          }
          console.log("ARRAY NODES: ",arrayNodes);
          let returnArray = [];
          if (Object.values(arguments).length > 0){
            let replacedTag = '';
            if (Object.values(arguments)[0].length > 0){
              console.log("PROPIEDAD: ", prop);
              Object.values(arguments)[0].forEach(argument => {
                let tempTag = \`${properties.tag}\`;
                Object.keys(argument).forEach(key => {
                  const regAttributte = new RegExp('{{${properties.mainObjName}.'+key+'}}', 'gi')
                  tempTag = tempTag.replace(regAttributte, argument[key]);
                });
                replacedTag += tempTag;
              });
              const domObj = new DOMParser().parseFromString(replacedTag, "text/html");
              console.log("ARRAY NODES: ",arrayNodes);
              arrayNodes = Array.prototype[prop].apply(arrayNodes, domObj.body.childNodes);
              insertNodes(arrayNodes, firstElem, lastElem);
              return new Proxy (Object.assign(Array.prototype[prop].apply(obj, Object.values(arguments)[0]), {
                _originalHandler: obj._originalHandler,
                _originalTarget: obj._originalTarget
              }), obj._originalHandler);
            } else {
              let tempTag = \`${properties.tag}\`;
              const insertElement = Object.values(arguments)[0];
              Object.keys(insertElement).forEach(key => {
                const regAttributte = new RegExp('{{${properties.mainObjName}.'+key+'}}', 'gi')
                tempTag = tempTag.replace(regAttributte, insertElement[key]);
              });
              const domObj = new DOMParser().parseFromString(tempTag, "text/html");
              Array.prototype[prop].apply(arrayNodes, domObj.body.childNodes);
              insertNodes(arrayNodes, firstElem, lastElem);
              return Array.prototype[prop].apply(obj, Object.values(arguments));
            }
          }
          console.log("PROPIEDAD: ",prop);
          Array.prototype[prop].apply(arrayNodes);
          insertNodes(arrayNodes, firstElem, lastElem);
          return Array.prototype[prop].apply(obj, arguments);
      }

    }
    return obj[prop];
    },
    set(obj, prop, value) {
      console.log("PASO PER AQUI", prop)
      return true;
    },
    deleteProperty: function (obj, prop) {
      console.log("PASO PER AQUI ????????", prop)
    }
  }
  `;
  return `${handler}`;
};

module.exports = getProxyObj;
