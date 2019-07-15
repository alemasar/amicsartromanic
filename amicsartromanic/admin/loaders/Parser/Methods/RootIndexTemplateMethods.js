/* eslint-disable */
const fs = require("fs");
const path = require("path");
const createDirectory = require('../../helpers/createDirectory');
const Parser = require('../Parser');
const HTMLType = require('../FileType/HTMLParser');
const HTMLTemplateMethods = require('./HTMLTemplateMethods');
const Compiler = require('../../Compiler/Compiler');
const replaceCode = require('../../helpers/processArray');

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

  async writeTemplate(inputs, args, promise) {
    const path = await promise.catch(e => {
      reject(e);
    });

    const template = fs.readFileSync(path, 'utf8').toString();
    return new Promise((resolve, reject) => {
      console.log("WRITE TEMPLATE", template)
      resolve(template);
    });
  }
  async compileTemplate(inputs, args) {
    
   // createDirectory(inputs.options.context + '/' + inputs.json.basePath + '/' + 'dist');
   const pathFile = inputs.options.context + "/" + inputs.json.basePath + "/" + inputs.json.template;
    let template = fs.readFileSync(pathFile, "utf8").toString();
    const parser = new Parser(template, HTMLType, HTMLTemplateMethods);
    const compiler = new Compiler(parser.statements);
    let return_string = template;
    const compilerResult = await compiler
      .compile({ json: inputs.json, options: inputs.options, webpack: inputs.webpack })
      .catch(e => {
        console.log('ERROR EN CAT LOADER');
        return_string = `document.addEventListener("DOMContentLoaded", () =>{
        document.body.innerHTML += "${inputs.webpack.resourcePath}: ${e}";
      })`;
      });
    const compiledTemplate = await replaceCode(compilerResult, template);
    const splitedPath = inputs.json.template.split('/');
    const distPath = inputs.options.context + '/' + inputs.json.basePath + '/' + 'dist/' + splitedPath[0];
    const fileName = splitedPath[splitedPath.length-1];
    createDirectory(distPath);
    distPath + '/' + inputs.json.template
    fs.writeFileSync(distPath + '/' + fileName, compiledTemplate);
   // inputs.webpack.addDependency(distPath + '/' + fileName);
    // console.log("COMPILE TEMPLATE: ", compiledTemplate);
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
    return new Promise((resolve, reject) => {
      resolve(distPath + '/' + fileName);
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
