const loader_utils = require("loader-utils");
const fs = require("fs");
const path = require("path");

class TemplateIndexMethods {
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
    console.log("writeEvents: ",template)
    global.WEBComponentsTags.filter(WEBComponentTag => template.indexOf(WEBComponentTag) > -1).map((WEBComponentTag, index) =>{
      events += `const event${index} = new Event("event-${WEBComponentTag}");
      document.dispatchEvent(event${index});`;
    });
    return events;
  }

  writeTemplate(inputs, output) {
    const options = loader_utils.getOptions(inputs.webpack);
    const pathFile =
      options.context + "/" + inputs.json.basePath + "/" + inputs.json.template;
    const template = fs.readFileSync(pathFile, "utf8").toString();
    return template;
  }
}

module.exports = TemplateIndexMethods;
