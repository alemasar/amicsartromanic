/* eslint-disable */
const fs = require("fs");
const path = require("path");
const createDirectory = require('../../helpers/createDirectory');

class RootIndexTemplateMethods {
  writeJs(inputs, args) {
    let js = '';
    if (inputs.json.hasOwnProperty('js')) {
      js = fs.readFileSync(
        inputs.options.context + '/' + inputs.json.basePath + '/' + inputs.json.js,
        'utf8'
      ).toString();
    }
    return new Promise((resolve, reject) => {
      resolve(js);
    });
  }

  writeTemplate(inputs, args) {
    // console.log("WRITE PATH: ", inputs.json.templatePath)
    console.log("PASO PER WRITE TEMPLATE", fs.readFileSync(inputs.options.context + '/' + inputs.json.basePath + '/' + inputs.json.template, 'utf8').toString())
    const template = fs.readFileSync(inputs.options.context + '/' + inputs.json.basePath + '/' + inputs.json.template, 'utf8').toString();
    return new Promise((resolve, reject) => {
      resolve(template);
    });
  }
  compileTemplate(inputs, args) {
    
    createDirectory(inputs.options.context + '/' + inputs.json.basePath + '/' + 'dist');

   /* const options = loader_utils.getOptions(inputs.webpack);

    const compiledFilePath = inputs.json.template.replace(".html", "_compiled.html");
    const pathFile =
      options.context + "/" + inputs.json.basePath + "/" + inputs.json.template;
      // console.log("COMPILED TEMPLATE: ", pathFile)
    const completeCompiledPath = options.context + "/" + inputs.json.basePath + "/" + compiledFilePath;
    inputs.json.templatePath = completeCompiledPath;
    let template = fs.readFileSync(pathFile, "utf8").toString();
    const compilerProcess = new Process(template, HTMLParser, HTMLTemplateCompiler)
    const promise = compilerProcess.process(inputs.json, inputs.webpack)
    promise.then((compiledTemplate)=>{
      
      fs.writeFileSync(completeCompiledPath, compiledTemplate);
     // inputs.webpack.addDependency(completeCompiledPath);
    })*/
    console.log("PASO PER COMPILE TEMPLATE")
    return new Promise((resolve, reject) => {
      resolve(inputs.json);
    });
  }

  writePath(inputs, args) {
    console.log("PASO PER WRITE PATH")
    return new Promise((resolve, reject) => {
      resolve(inputs.json.path);
    });
  }
  writeClassName(inputs, args) {
    console.log("PASO PER WRITE CLASS NAME")
    return new Promise((resolve, reject) => {
      resolve(inputs.json.className);
    });
  }
  // Deprecated: Doesn't exist the rootTag
  /*writeRootTag(inputs, output) {
    return inputs.json["rootTag"];
  }*/

  writeTag(inputs, args) {
    console.log("PASO PER WRITE TAG")
    return new Promise((resolve, reject) => {
      resolve(inputs.json.tag);
    });
  }

  writeRouterTag(inputs, args) {
    console.log("PASO PER WRITE ROUTER TAG")
    return new Promise((resolve, reject) => {
      resolve(inputs.json.routerTag);
    });
  }

  writeRouter(inputs, output) {
    console.log("PASO PER WRITE ROUTER")
    return new Promise((resolve, reject) => {
      resolve(`window.addEventListener('popstate', function(event) {
        if (document.location.pathname === "${inputs.json['path']}"){
          console.log('popstate fired!', document.location.pathname);
          console.log("passsoo popstate event", "${inputs.json['path']}")
          const templateInstance = new ${inputs.json['className']}();
          // templateInstance.loadComponents();
        }
      });`);
    });
  }

  writeEvents(inputs, args) {
    //customElements.get( 'custom-element' )
    let events = '';
    console.log("PASO PER AQUI", path.resolve('./src', inputs.json['basePath'] + '/' + inputs.json['template']))
    const template = fs
      .readFileSync(
        path.resolve('./src', inputs.json['basePath'] + '/' + inputs.json['template']),
        'utf8'
      )
      .toString();

    global.WEBComponentsTags.filter(WEBComponentTag => template.indexOf(WEBComponentTag) > -1).map(
      (WEBComponentTag, index) => {
        events += `const event${index} = new Event("event-${WEBComponentTag}");
      document.dispatchEvent(event${index});`;
      }
    );
    console.log("PASO PER WRITE EVENTS")
    return new Promise((resolve, reject) => {
      resolve(events);
    });
  }
}

module.exports = RootIndexTemplateMethods;
