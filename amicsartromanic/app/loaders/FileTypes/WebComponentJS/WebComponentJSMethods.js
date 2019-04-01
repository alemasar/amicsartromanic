const loader_utils = require("loader-utils");
const sass = require("node-sass");
const fs = require("fs");
const path = require("path");

class WebComponentJSMethods {
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
          path.join(__dirname, "../../../src/" + basePath + "/" + pathImage),
          "utf8"
        );
        webpack.emitFile(pathImage, image);
      }
    });
  }

  compileScss(inputs, output) {
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
    return inputs.json;
  }

  writeCss(inputs, output) {
    const getCss = async () => {
      const css = await inputs.json[output];
      return (
        `const template = document.createElement("template");` +
        "template.innerHTML = `" +
        "<style>" +
        `${css}` +
        "</style>" +
        "`;"
      );
    };
    return getCss();
  }
}

module.exports = WebComponentJSMethods;
