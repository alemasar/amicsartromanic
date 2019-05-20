/* eslint-disable */
const loader_utils = require("loader-utils");
const sass = require("node-sass");
const fs = require("fs");
const path = require("path");

class WebComponentJSMethods {
  compileHTML(inputs, output) {

  }

  searchImages(css, basePath, webpack) {
    const lines = css.split("\n");
    lines.forEach(line => {
      let imagePos = 0;
      if ((imagePos = line.indexOf("url")) > -1) {
        const pathImage = line.substring(
          imagePos + 8,
          line.indexOf(")", imagePos + 8) - 1
        );
        const image = fs.readFileSync(
          path.join(__dirname, "../../../../src/" + basePath + "/" + pathImage),
          "utf8"
        );
       // webpack.emitFile("./"+pathImage, image);
      }
    });
  }

  compileScss(inputs, output) {
    if (Object.getPrototypeOf(inputs.json).hasOwnProperty(output)){
      const options = loader_utils.getOptions(inputs.webpack);
      const scssPath =
        options.context + "/" + inputs.json.basePath + "/" + inputs.json.scss;
      let scss = fs.readFileSync(scssPath, "utf8");
      inputs.webpack.addDependency(scssPath);
      const compileScssPromise = new Promise((resolve, reject) => {
        sass.render(
          {
            data: scss
          },
          (err, result) => {
            const css = result.css.toString();
            this.searchImages(css, inputs.json.basePath, inputs.webpack)
            resolve(css);
          }
        );
      });
      inputs.json.css = compileScssPromise;
    } else {
      console.log("NO SCSS PATH PROVIDED FOR ", inputs.json.tag);
      let errorMessage='';
      if (!Object.getPrototypeOf(inputs.json).hasOwnProperty(output)){
        errorMessage = "NO SCSS PATH PROVIDED FOR " + inputs.json.tag;
      }
      if (!Object.getPrototypeOf(inputs.json).hasOwnProperty("basePath")){
        errorMessage = "NO BASE PATH PROVIDED FOR " + inputs.json.tag;
      }
      inputs.json.css = new Promise((resolve, reject) =>{
        reject(errorMessage);
      });
    }

    return inputs.json;
  }

  writeCss(inputs, output) {
    const getCss = async () => {
      try{
        const css = await inputs.json[output];
        return (
          `const templateCss = document.createElement("template");` +
          "templateCss.innerHTML = `" +
          "<style>" +
          `${css}` +
          "</style>" +
          "`;"
        );
      } catch (error){
        // return new Error(error);
        return ('\/* ' + error + ' *\/');
      }
    };
    return getCss();
  }
}

module.exports = WebComponentJSMethods;
