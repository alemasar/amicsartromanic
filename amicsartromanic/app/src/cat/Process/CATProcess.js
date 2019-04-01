const HTMLParser = require('../Parser/HTMLParser.js')

const getContent = (compiled_file, imports, tag) => {
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

class CATProcess{
    constructor(json, options, webpack, events){
        console.log(json)
        events.on("compiled_inputs", (dependency)=>{
            //console.log(dependency.class.parse);
            dependency.parser.parse(dependency.results).then((compiled_file) => {
                console.log(compiled_file);
                const compiled_file = properties.js.replace('.js', '') + '_compiled.js'
                fs.writeFileSync(
                    options.context + '/' + properties.basePath + '/' + compiled_file,
                    class_file
                )
                events.emit("compiled_file", compiled_file);
            })
        })
        json.dependencies.forEach((dependency, key) => {
            const tag = Object.keys(dependency)[0]
            const properties = dependency[tag]
            const parsers = [];
            parsers.push({
                content: webpack.fs.readFileSync(
                    options.context + '/' + properties.basePath + '/' + properties.js,
                    'utf8'
                ).toString(),
                type: "js",
                class: new JSParser(options.context + '/' + properties.basePath + '/' + properties.js, webpack),
                childs: [{
                    type: "css",
                    class: new SCSSParser(options.context + '/' + properties.basePath + '/' + properties.scss, webpack),
                }]
            });
            /*parsers.push({
                type: "html",
                class: new HTMLParser(options.context + '/' + properties.basePath + '/' + properties.template, webpack)
            });*/
            parsers.forEach((parser) => {
                if (parser.hasOwnProperty("childs")) {
                    const inputs = {};
                    parser.childs.forEach((child)=>{
                        inputs.promises = [];
                        inputs.promises.push(child.class.getFile);
                        inputs.types = [];
                        inputs.types.push(child.type);
                    });
                    Promise.all(inputs.promises)
                    .then((raw_results) => {
                        raw_results.forEach((result, index) => {
                            inputs.results = [];
                            inputs.results[inputs.types[index]] = result;
                        });
                        events.emit("compiled_inputs", {
                            properties,
                            results: inputs.results,
                            parser: parser.class
                        });
                    });
                    
                }
            });
            /*Promise.all(process_promises)
            .then((src_dependencies) => {
                parsers.forEach((parser) => {

                    
                    console.log(src_dependency);
                    parsers[index].class.parse(src_dependency).then((file)=>{
                        //console.log(file)
                        if (file.hasOwnProperty("modified")) {
                            file.modified.forEach((modified_line) => {
                                if (file.lines[modified_line.index]){
                                    console.log(src_dependencies)
                                    functions.push(function () {file.lines[modified_line.index] = file.lines[modified_line.index](src_dependencies)});
                                }
                            })
                            this[parsers[index].type] = file.lines.join("\n");
                        } else {
                            this[parsers[index].type] = file;
                        }
                    })
                })
                console.log(this)
                functions.forEach((f)=>{
                    f();

                })
            })*/
            
        })
    }
}

module.exports = CATProcess;