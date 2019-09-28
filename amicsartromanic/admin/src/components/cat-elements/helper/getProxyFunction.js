import getComment from './getComments';
import insertNodes from './insertNodes';

const getProxyFunction = (mainPropertyName, mainObjName, tag, templateHTML) => {
  
  const rootElement = templateHTML.content;
  const firstElem = getComment(rootElement, `cat-foreach ${mainPropertyName}, ${mainObjName}`);
  const lastElem = getComment(rootElement, `end cat-foreach ${mainPropertyName}, ${mainObjName}`);
  let firstNode = firstElem.nextSibling;
  let arrayNodes = [];
  console.log(firstNode);

  while (firstNode !== lastElem) {
    if (firstNode.nodeType !== 3) {
      arrayNodes.push(firstNode);
    }
    firstNode = firstNode.nextSibling;
  }
  console.log('ARRAY NODES: ', arrayNodes);
  let returnArray = [];
  if (Object.values(arguments).length > 0) {
    let replacedTag = '';
    if (Object.values(arguments)[0].length > 0) {
      console.log('PROPIEDAD: ', prop);
      Object.values(arguments)[0].forEach(argument => {
        let tempTag = `${tag}`;
        tempTag = tempTag.replace(`cat-foreach="${mainObjName} in ${mainPropertyName}"`, '');
        Object.keys(argument).forEach(key => {
          const regAttributte = new RegExp('{{' + mainObjName + '.' + key + '}}', 'gi');
          tempTag = tempTag.replace(regAttributte, argument[key]);
        });
        replacedTag += tempTag;
      });
      const domObj = new DOMParser().parseFromString(replacedTag, 'text/html');
      console.log('ARRAY NODES: ', arrayNodes);
      arrayNodes = Array.prototype[prop].apply(arrayNodes, domObj.body.childNodes);
      insertNodes(arrayNodes, firstElem, lastElem);
      return new Proxy(
        Object.assign(Array.prototype[prop].apply(obj, Object.values(arguments)[0]), {
          _originalHandler: obj._originalHandler,
          _originalTarget: obj._originalTarget
        }),
        obj._originalHandler
      );
    }
  } else {
    let tempTag = `${tag}`;
    tempTag = tempTag.replace(`cat-foreach="${mainObjName} in ${mainPropertyName}"`, '');
    const insertElement = Object.values(arguments)[0];
    Object.keys(insertElement).forEach(key => {
      const regAttributte = new RegExp('{{' + mainObjName + '.' + key + '}}', 'gi');
      tempTag = tempTag.replace(regAttributte, insertElement[key]);
    });
    const domObj = new DOMParser().parseFromString(tempTag, 'text/html');
    Array.prototype[prop].apply(arrayNodes, domObj.body.childNodes);
    insertNodes(arrayNodes, firstElem, lastElem);
    return Array.prototype[prop].apply(obj, Object.values(arguments));
  }
  console.log('PROPIEDAD: ', prop);
  Array.prototype[prop].apply(arrayNodes);
  insertNodes(arrayNodes, firstElem, lastElem);
  return Array.prototype[prop].apply(obj, arguments);
};

export default getProxyFunction;
/* {
  get(obj, prop, proxy) {
    if (prop === 'constructor') {
      console.log(arguments)
      console.log(prop)
      return Array.prototype[prop].apply(obj, Object.values(arguments)[0]);
    }
    if (typeof obj[prop] === 'function') {
      console.log(proxy)
    }
  return Reflect.get(obj, prop, proxy);
  },
  set(obj, prop, value) {
    console.log("PASO PER AQUI", prop)
    return true;
  },
  deleteProperty: function (obj, prop) {
    console.log("PASO PER AQUI ????????", prop);
    return true;
  },
  apply(obj, args) {
    console.log("PASO PER apply", args)
  }
} */

/* this.${mainPropertyName} = new Proxy (Object.assign(this.${mainPropertyName}, {
  _originalHandler: handler${mainPropertyName},
  _originalTarget: this.${mainPropertyName}
}), handler${mainPropertyName}); */
