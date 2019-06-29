/* eslint-disable */
const loader_utils = require('loader-utils');
const fs = require('fs');
const path = require('path');

class CATTemplateFunctionsMethods {
    insertJSBind(jsFile, property) {
        const propertyPosition = jsFile.indexOf("this."+property);
        const equalPosition = jsFile.indexOf("=", propertyPosition);
        const semicolonPosition = jsFile.indexOf(";", equalPosition + 1);
        const codeBeforeProxy = jsFile.substring(0, semicolonPosition + 1);
        const codeAfterProxy = jsFile.substring(semicolonPosition + 1);
        const insertedProxyString = `
        /* not to delete */
        this.${property} = new Proxy (this.${property}, {
            get (target, key, proxy) {
                return Reflect.get(target, key, value, proxy);
            }
        });`;
        console.log("INSERTO EL CODIGO!!!!!");
        return codeBeforeProxy + insertedProxyString + codeAfterProxy;
    }
    
    importCatforeach(inputs, output, argument){
        const options = loader_utils.getOptions(inputs.webpack);
        const jsPath = options.context + '/' + inputs.json.basePath + '/' + inputs.json.js;
        let jsFile = fs.readFileSync(jsPath, 'utf8');
        let templateWithOutArgument = inputs.template.replace("<!-- " + argument + " -->", "");
        const indexCatForEach = templateWithOutArgument.indexOf("cat-foreach");
        if (indexCatForEach > -1) {
            const tag = templateWithOutArgument.substring(
                            templateWithOutArgument.lastIndexOf("<", indexCatForEach),
                            templateWithOutArgument.indexOf(">", indexCatForEach)+1
                        );
            const mainPropertyName = tag.substring(tag.indexOf("=", tag.indexOf("cat-foreach"))+2, tag.indexOf('"',tag.indexOf("=")+3)).trim().split("in")[1].trim();
            templateWithOutArgument = templateWithOutArgument.replace(tag, "<cat-foreach>" + tag + "</cat-foreach>")          
            console.log("CAT_FOREACH" + templateWithOutArgument)
            /*const jsTempFilePath = jsPath.replace(".js", "_compiled_tmp.js");
            fs.unlinkSync(jsTempFilePath)*/
            // fs.writeFileSync(jsTempFilePath, this.insertJSBind(jsFile, mainPropertyName));
        }
        return templateWithOutArgument;
    }
}

module.exports = CATTemplateFunctionsMethods;
