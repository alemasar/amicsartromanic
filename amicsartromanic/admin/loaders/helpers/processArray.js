const replaceCode = (items, template) => {
  let returnString = template;
  items.forEach(item => {
    item.code.forEach(c => {
      if (c instanceof Error) {
        console.log('-------------------------------');
        console.log('ERROR', c.message);
        console.log('-------------------------------');
      } else {
        console.log('-------------------------------');
        console.log('BIEN', c);
        console.log('-------------------------------');
      }
      returnString = returnString.replace(item.statement, item.code[item.code.length - 1]);
    });
  });
  return returnString;

};

module.exports = replaceCode;
