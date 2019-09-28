const replaceCode = (items, template) => {
  let returnString = template;
  let afterCodeReplaced = [];
  items.forEach(item => {
    let times = 0;
    item.code.forEach(c => {
      if (c instanceof Error) {
        console.log('-------------------------------');
        console.log('ERROR', c.message);
        console.log('-------------------------------');
      } else {
        /* console.log('-------------------------------');
        console.log('BIEN', c);
        console.log('-------------------------------'); */
      }
      if (times !== item.code.length - 1 && item.code.length > 1) {
        if (
          typeof item.code[0] === 'object' &&
          Object.prototype.hasOwnProperty.call(item.code[0], 'compilerResult')
        ) {
          const id = new Date().valueOf();
          item.code[0].compilerResult.forEach(result => {
            result.code.forEach(code => {
              if (Object.prototype.hasOwnProperty.call(code, 'afterResolve')) {
                returnString = code.afterResolve(returnString);
              }
              if (Object.prototype.hasOwnProperty.call(code, 'afterCodeReplaced')) {
                afterCodeReplaced[id] = code.afterCodeReplaced;
                // returnString = code.afterResolve(returnString);
              }
            });
          });
        }
      }
      if (times === item.code.length - 1) {
        returnString = returnString.replace(item.statement, item.code[item.code.length - 1]);
      }

      times += 1;
    });
  });
  Object.values(afterCodeReplaced).forEach(afterParsed => {
    returnString = afterParsed(returnString);
  });
  return returnString;
};

module.exports = replaceCode;
