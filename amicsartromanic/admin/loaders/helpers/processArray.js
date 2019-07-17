const replaceCode = (items, template) => {
  let returnString = template;
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
      if (
        times !== item.code.length - 1 &&
        item.code.length > 1 &&
        typeof item.code[0] === 'object'
      ) {
        if (item.code[0].length > 0) {
          console.log('Process Array', item.code[0][0]);
          item.code[0][0].code.forEach(code => {
            if (Object.prototype.hasOwnProperty.call(code, 'afterResolve')) {
              console.log('PROCESS ARRAY: ', code);
              returnString = code.afterResolve(returnString);
            }
          });
        }
      }
      if (times === item.code.length - 1) {
        returnString = returnString.replace(item.statement, item.code[item.code.length - 1]);
      }

      times += 1;
    });
  });
  return returnString;
};

module.exports = replaceCode;
