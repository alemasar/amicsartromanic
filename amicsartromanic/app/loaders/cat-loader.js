const loader_utils = require('loader-utils')
const sass = require('node-sass')
const sass_loader = require('sass-loader')
const cp = require('cp')

const fs = require('fs')
const path = require('path')
var cache = {}
class ReservedWords {
	constructor() {
		this.reservedWords = [
			{
				"template": {
					function: 'getTemplate',
					arguments: 1,
				},
				"class": {
					function: 'getClass',
					arguments: 1,
				},
			},
		]
	}
	searchReservedWord(word) {
		const keys = Object.keys(this.reservedWords)
		let return_value = ''
		this.reservedWords.forEach(reserved => {
			if (Object.keys(reserved)[0] === word) {
				return_value = this[reserved[word].function](
					arguments[reserved[word].arguments]
				)
			}
		})
		return return_value
	}
	getTemplate(cssFile) {
		return (
			`const template = document.createElement("template");` +
			'template.innerHTML = `' +
			'<style>' +
			`${cssFile}` +
			'</style>' +
			'`;'
		)
	}
	getClass(path) {

	}
}
function searchImages(css, basePath, webpack) {
	const lines = css.split('\n')
	lines.forEach(line => {
		let imagePos = 0
		if ((imagePos = line.indexOf('url')) > -1) {
			const pathImage = line.substring(
				imagePos + 8,
				line.indexOf(')', imagePos + 8) - 1
			)
			console.log(
				path.join(__dirname, '../src/' + basePath + '/' + pathImage)
			)
			// cp.sync(path.join(__dirname, "../src/" + basePath + '/' + pathImage) , path.join(__dirname, "../dist" + '/' + pathImage))
			let image = fs.readFileSync(
				path.join(__dirname, '../src/' + basePath + '/' + pathImage),
				'utf8'
			)
			webpack.emitFile(pathImage, image)
		}
	})
	console.log(css.split('\n'))
}

function getImports() {
	return (
		`const polyfills = [];
	polyfills.push(import(
		/* webpackChunkName: "webcomponents-bundle" */
		/* webpackMode: "lazy" */
		/* webpackPrefetch: true */ 
		/* webpackPreload: true */` +
		'`' +
		'@webcomponents/webcomponentsjs/webcomponents-bundle.js' +
		'`' +
		`));
	polyfills.push(import(
		/* webpackChunkName: "webcomponents-loader" */
		/* webpackMode: "lazy" */
		/* webpackPrefetch: true */ 
		/* webpackPreload: true */` +
		'`' +
		'@webcomponents/webcomponentsjs/webcomponents-loader.js' +
		'`' +
		`));
	polyfills.push(import(
		/* webpackChunkName: "custom-elements-es5-adapter" */
		/* webpackMode: "lazy" */
		/* webpackPrefetch: true */ 
		/* webpackPreload: true */` +
		'`' +
		'@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js' +
		'`' +
		`));`
	)
}

function getClass(properties, tag, args, webpack, options) {
	const js = fs.readFileSync(
		options.context + '/' + properties.basePath + '/' + properties.js,
		'utf8'
	)
	const reserved = new ReservedWords()
	const js_lines = js.split('\n')
	let class_file = ''
	js_lines.forEach(line => {
		if (line.indexOf('/* import') > -1) {
			const line_splitted = line
				.replace('/* import ', '')
				.replace('*/', '')
				.split(' ')

				//.replace(' ', '')
			let reserved_word_param = line_splitted[line_splitted.length - 1];
			if (line_splitted === 1) {
				args.forEach(arg => {
					if (Object.keys(arg)[0] === line_splitted[0]) {
						reserved_word_param = arg[line_splitted[0]];
					}
				})
			}

			line = reserved.searchReservedWord(line_splitted[0], reserved_word_param)
		}
		class_file += line + '\n'
	})
	const compiled_file = properties.js.replace('.js', '') + '_compiled.js'
	fs.writeFileSync(
		options.context + '/' + properties.basePath + '/' + compiled_file,
		class_file
	)
	return (
		`class Prova{
			constructor() {
			this.component = {};
			import(
			/* webpackMode: "eager" */` +
		'`./' +
		compiled_file +
		'`' +
		`).then(component => {
			console.log(component);
			this.component = component.default;
			});
			}
			}
			const i = new Prova();
			export default i;
			document.addEventListener("DOMContentLoaded", (e) => {
				console.log(i.component);
				` +
		getImports() +
		`
				Promise.all(polyfills)
				.then((code)=>{
					WebComponents.waitFor(() => {
						console.log(i.component);
						window.customElements.define("${tag}", i.component);
						// At this point we are guaranteed that all required polyfills have
						// loaded, and can use web components API's.
						// The standard pattern is to load element definitions that call
						// 'customElements.define' here.
						// Note: returning the import's promise causes the custom elements
						// polyfill to wait until all definitions are loaded and then upgrade
						// the document in one batch, for better performance.
						// return import('');
					});
				})
				.catch((error) => {
					console.error('Failed fetching polyfills', error)
				});
			});`
	)

}
function modifyIndex(index, dependency, view, tag, options) {
	const indexFile = fs.readFileSync(index, 'utf8')
	const indexLines = indexFile.split('\r')
	let indexTemplate = ''
	console.log(indexLines)
	indexLines.forEach(line => {
		if (line.indexOf('</body>') > -1) {
			const templateFile = fs.readFileSync(
				options.context +
					'/' +
					dependency.basePath +
					'/' +
					dependency.template,
				'utf8'
			)
			let template = ''
			Object.keys(view).forEach(key => {
				template = templateFile.replace(
					'<' + tag + '-' + key + '>',
					view[key]
				)
			})
			console.log(template)
			line = line.replace(template.replace('\n', ''), '')
			line = line.replace(
				'</body>',
				template.replace('\n', '') + '</body>'
			)
		}
		indexTemplate += line
	})

	fs.writeFileSync(index, indexTemplate);
}
module.exports = function(input) {
	const webpack = this
	const callback = this.async()
	const options = loader_utils.getOptions(this)
	const input_string = loader_utils.stringifyRequest(this, input)
	const input_json = JSON.parse(JSON.parse(input_string))

	let return_string = getImports()
	this.clearDependencies()
	input_json.dependencies.forEach((dependency, key) => {
		console.log(dependency)
		const tag = Object.keys(dependency)[0]
		const properties = dependency[tag]
		let scss = fs.readFileSync(
			options.context + '/' + properties.basePath + '/' + properties.scss,
			'utf8'
		)
		this.addDependency(
			options.context + '/' + properties.basePath + '/' + properties.scss
		)
		sass.render(
			{
				data: scss,
			},
			function(err, result) {
				const css = result.css.toString()
				searchImages(css, properties.basePath, webpack)
				modifyIndex(
					options.public + '/index.html',
					properties,
					input_json.view[tag],
					tag,
					options
				)
				//return_string += getTemplate(css)
				return_string += getClass(
					properties,
					tag,
					[{
						"template": css
					}],
					webpack,
					options
				)
				console.log(return_string)
				callback(null, return_string)
			}
		)
	})
}
