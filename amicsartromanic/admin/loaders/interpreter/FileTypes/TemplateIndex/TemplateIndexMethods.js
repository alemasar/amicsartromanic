/* eslint-disable */
const loader_utils = require("loader-utils");
const fs = require("fs");
const path = require("path");
const Process = require("../../compiler/CompilerProcess");
const HTMLTemplateCompiler = require("../HTMLTemplate/HTMLTemplateCompiler");
const JSParser = require("../../parser/parsers/JSParser");

class TemplateIndexMethods {
  writeTemplate(inputs, output) {
    const options = loader_utils.getOptions(inputs.webpack);
    console.log("WRITE PATH: ", inputs.json.templatePath)

    const template = fs.readFileSync(inputs.json.templatePath, "utf8").toString();
    return template;
  }

  compileTemplate(inputs, output) {

    const options = loader_utils.getOptions(inputs.webpack);

    const compiledFilePath = inputs.json.template.replace(".html", "_compiled.html");
    const pathFile =
      options.context + "/" + inputs.json.basePath + "/" + inputs.json.template;
      console.log("COMPILED TEMPLATE: ", pathFile)
    inputs.json.templatePath = pathFile;
    inputs.webpack.addDependency(pathFile)
    let template = fs.readFileSync(pathFile, "utf8").toString();
    const compilerProcess = new Process(template, JSParser, HTMLTemplateCompiler)
    const promise = compilerProcess.process(inputs.json, inputs.webpack)
    promise.then((compiledTemplate)=>{
      const completeCompiledPath = options.context + "/" + inputs.json.basePath + "/" + compiledFilePath;
      fs.writeFileSync(completeCompiledPath, compiledTemplate);
    })
    return inputs.json;
  }
  writePath(inputs, output) {
    return inputs.json["path"];
  }
  writeClassName(inputs, output) {
    return inputs.json["className"];
  }
  writeRootTag(inputs, output) {
    return inputs.json["rootTag"];
  }

  writeRouter(inputs, output) {
    return `window.addEventListener('popstate', function(event) {
      if (document.location.pathname === "${inputs.json['path']}"){
        console.log('popstate fired!', document.location.pathname);
        console.log("passsoo popstate event", "${inputs.json['path']}")
        const templateInstance = new ${inputs.json["className"]}();
        templateInstance.loadComponents();
      }
    });`;
  }

  writeEvents(inputs, output){
    //customElements.get( 'custom-element' )
    let events = ``;
    const template = fs.readFileSync(path.resolve("./src", inputs.json["basePath"]+"/"+inputs.json["template"]), "utf8").toString();
    global.WEBComponentsTags.filter(WEBComponentTag => template.indexOf(WEBComponentTag) > -1).map((WEBComponentTag, index) =>{
      events += `const event${index} = new Event("event-${WEBComponentTag}");
      document.dispatchEvent(event${index});`;
    });
    return events;
  }
// Deprecated: Doesn't compile the template
  /*writeTemplate(inputs, output) {
    const options = loader_utils.getOptions(inputs.webpack);
    const pathFile =
      options.context + "/" + inputs.json.basePath + "/" + inputs.json.template;
    const template = fs.readFileSync(pathFile, "utf8").toString();
    return template;
  }*/
}

module.exports = TemplateIndexMethods;
