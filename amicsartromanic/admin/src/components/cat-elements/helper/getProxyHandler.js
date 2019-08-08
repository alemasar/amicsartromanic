/* eslint-disable */
const proxyHandlerObj = (nodes, html, whereInsert) => {
  return {
    get(obj, prop, proxy) {
      console.log(prop);
      return function(el) {
        console.log(Object.values(arguments)[0] instanceof Array);
        
        const result = Array.prototype[prop].apply(obj, arguments);
        
        if (typeof result === 'object') {
          return new Proxy(result, proxyHandlerObj(nodes,html));
        }
        return result;
      };
    }
  };
};

export default proxyHandlerObj;
