/* const getCode = async (code, template) => {
  let compilingTemplate = template;
  await code
    .reduce(async (prevPromise, i) => {
      await prevPromise.catch(e => {
        console.log('ERROR EN GETCODE', e);
        return Promise.reject(e);
      });
      const compiledCode = await i.code.catch(e => {
        console.log('ERROR EN GETCODE', e);
        return Promise.reject(e);
      });
      if (!Object.prototype.hasOwnProperty.call(compiledCode, 'afterResolve')) {
        compilingTemplate = compilingTemplate.replace(i.statement, compiledCode);
      } else {
        console.log('PASO AFTER RESOLVE');
        compilingTemplate = compilingTemplate.replace(i.statement, compiledCode.code);
        compiledCode.afterResolve();
      }
      return i;
    }, Promise.resolve())
    .catch(e => {
      console.log('ERROR EN GETCODE', e);
      return Promise.reject(e);
    });
  return compilingTemplate;
}; */

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
  // Note that async functions return a promise
  /*const promises = items.map(async item => {
    console.log('ITEM: ', item);
    const result = await Promise.all(item.code).catch(e => {
      console.log('ERROR EN PROCESSARRAY');
      Promise.reject(e);
    });
    // Log individual results as they finish
    console.log('RESULT EN PROCESSARRAY ', result.length);
    const returnValue = await result[0];
    return returnValue;
  });
   const results = await Promise.all(promises).catch(e => {
    return Promise.reject(e);
  }); */
};

module.exports = replaceCode;
