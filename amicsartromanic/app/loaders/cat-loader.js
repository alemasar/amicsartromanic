const loader_utils = require('loader-utils');
const sass = require('node-sass');
const sass_loader = require('sass-loader');

const fs = require('fs');
const path = require('path');
var cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}

module.exports = function (input) {
	const webpack = this;
	const callback = this.async();
	const options = loader_utils.getOptions(this);
	const input_string = loader_utils.stringifyRequest(this, input);
	const input_json = JSON.parse(JSON.parse(input_string));

	/*const config = require('module.exports =' + input + '\n]');
	const jsonConfig = this.loadModule(config)*/
	// No callback -> return synchronous results
	// if (callback) { ... 
	/*console.log("this.rootContext");
	//console.log(sass_loader(options.context + '/' + input_json[0].config.scss));
	const css = require('style-loader');
	const file = path.resolve(options.context, input_json[0].config.scss);
	webpack.addDependency(file);
	let scss = require('fs').readFileSync(options.context + '/' + input_json[0].config.scss, 'utf8');
	let importList = parseDependencies(input_json[0].config.scss, options.context);
	console.log(importList)

	sass.render({
		data: scss
	}, function (err, result) { 
			console.log(result.css.toString())
	   });

	let template = 'const template = document.createElement("template");' +
	'template.innerHTML = `' +
	  '<style>' +
	  '</style>' +
	  '`;';
	//let return_file = 'module.exports = [\n' + 'input'.split(imageRE).join(',\n') + '\n].join()';*/
	importAll(require.context('/src/components/component/', true, /\.scss$/));
	callback(null,  input + input);
};
