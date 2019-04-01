const Parser = require('./Parser.js')
const JSDictionary = require('./dictionaries/js.js')

class JSParser extends Parser{
    constructor(jsFile, webpack){
        super(jsFile, webpack, new JSDictionary())
    }
}

module.exports = JSParser;