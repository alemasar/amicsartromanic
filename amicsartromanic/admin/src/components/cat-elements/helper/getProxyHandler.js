/* eslint-disable */
const proxyHandlerObj = (nodes, tag) => {
  return {
    get(obj, prop, proxy) {
      console.log(prop);
      return function(el) {
        console.log(tag);
        const result = Array.prototype[prop].apply(obj, arguments);
        if (typeof result === 'object') {
          return new Proxy(result, proxyHandlerObj(nodes,tag));
        }
        return result;
      };
    }
  };
};

export default proxyHandlerObj;
