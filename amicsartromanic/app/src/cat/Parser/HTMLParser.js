const Parser = require('./Parser.js')
const HTMLDictionary = require('./dictionaries/html.js')

class HTMLParser extends Parser{
    constructor(htmlFile, webpack){
        super(htmlFile, webpack, new HTMLDictionary())
    }
}

module.exports = HTMLParser;