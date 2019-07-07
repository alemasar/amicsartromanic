const getCode = async (code, template) => {
  let compilingTemplate = template;
  await code.reduce(async (prevPromise, i) => {
    await prevPromise;
    console.log(i);
    const compiledCode = await i.code;
    compilingTemplate = compilingTemplate.replace(i.statement, compiledCode);
    return i;
  }, Promise.resolve());
  return compilingTemplate;
};

module.exports = getCode;
