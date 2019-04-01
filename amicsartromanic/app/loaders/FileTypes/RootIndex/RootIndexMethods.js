const loader_utils = require("loader-utils");
const WebComponentJSParser = require("../WebComponentJS/WebComponentJSParser");
const WebComponentJSCompiler = require("../WebComponentJS/WebComponentJSCompiler");
const fs = require("fs");

const Process = require("../../compiler/CompilerProcess");

class RootIndexMethods {
  importPolyfills(inputs, output) {
    return (
      `const polyfills = [];
    polyfills.push(import(
        /* webpackChunkName: "webcomponents-bundle" */
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */ 
        /* webpackPreload: true */` +
      "`" +
      "@webcomponents/webcomponentsjs/webcomponents-bundle.js" +
      "`" +
      `));
    polyfills.push(import(
        /* webpackChunkName: "webcomponents-loader" */
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */ 
        /* webpackPreload: true */` +
      "`" +
      "@webcomponents/webcomponentsjs/webcomponents-loader.js" +
      "`" +
      `));
    polyfills.push(import(
        /* webpackChunkName: "custom-elements-es5-adapter" */
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */ 
        /* webpackPreload: true */` +
      "`" +
      "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js" +
      "`" +
      `));`
    );
  }

  writePath(inputs, output) {
    return inputs.json[output];
  }

  writeTag(inputs, output) {
    return inputs.json[output];
  }

  compileJs(inputs, output) {
    const options = loader_utils.getOptions(inputs.webpack);

    const compiledFilePath = "./" + inputs.json.js.replace(".js", "_compiled.js");
    const pathFile =
      options.context + "/" + inputs.json.basePath + "/" + inputs.json.js;
    inputs.json.path = compiledFilePath;
    
    let template = fs.readFileSync(pathFile, "utf8").toString();
    const compilerProcess = new Process(template, WebComponentJSParser, WebComponentJSCompiler)
    const promise = compilerProcess.process(inputs.json, inputs.webpack)
    promise.then((compiledTemplate)=>{
      const completeCompiledPath = options.context + "/" + inputs.json.basePath + "/" + compiledFilePath;
      fs.writeFileSync(completeCompiledPath, compiledTemplate);
    })
    return inputs.json;
  }
}

module.exports = RootIndexMethods;
