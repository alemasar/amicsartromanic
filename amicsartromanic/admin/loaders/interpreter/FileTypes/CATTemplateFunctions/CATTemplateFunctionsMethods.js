/* eslint-disable */
const loader_utils = require('loader-utils');
const fs = require('fs');
const path = require('path');

class CATTemplateFunctionsMethods {
    importCatforeach(inputs, output){
        const options = loader_utils.getOptions(inputs.webpack);
        const jsPath = options.context + '/' + inputs.json.basePath + '/' + inputs.json.path;
        let jsFile = fs.readFileSync(jsPath, 'utf8');
        console.log("PASO PER CATFOREACH: ", jsFile);
        return '';
    }
}

module.exports = CATTemplateFunctionsMethods;
