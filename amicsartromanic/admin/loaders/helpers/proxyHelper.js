const getInitialObjectString = (mainPropertyName, jsFile) => {
  const propertyPosition = jsFile.indexOf('this.' + mainPropertyName);
  const equalPosition = jsFile.indexOf('=', propertyPosition);
  const semicolonPosition = jsFile.indexOf(';', equalPosition + 1);
  const values = jsFile.substring(equalPosition + 1, semicolonPosition).trim();
  return values;
};

const escapeInitialCatForeachObject = values => {
  let returnValue = values;
  if (values.indexOf("{") > -1){
    returnValue = returnValue.replace(/(?<!\\)'/g, '"');
    returnValue = returnValue.replace(/\'/g, "\\'");
    returnValue = returnValue.replace(/\n/g, '');
    returnValue = returnValue.replace(/\s+(?=([^"]*"[^"]*")*[^"]*$)/g, '');
    returnValue = returnValue.replace(/,/g, ',"');
    returnValue = returnValue.replace(/"{/g, '{');
    returnValue = returnValue.replace(/{/g, '{"');
    returnValue = returnValue.replace(/:/g, '":');
  } else {
    returnValue = returnValue.replace(/'/g, '"');
  }
  return returnValue;
};

module.exports = {
  escapeInitialCatForeachObject,
  getInitialObjectString
};
