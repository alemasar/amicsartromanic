class Parser{
    constructor(file, webpack, dictionary){
        this.original_file = webpack.fs.readFileSync(
			file,
			'utf8'
        ).toString();
        webpack.addDependency(file)
        this.getFile = new Promise((resolve, reject) => {
            resolve(this.original_file)
        })
        this.dictionary = dictionary;
    }

    parse(inputs){
        return new Promise((resolve, reject) => {
            this.dictionary.render(this.original_file, inputs, resolve)
        })
    }
}

module.exports = Parser;
