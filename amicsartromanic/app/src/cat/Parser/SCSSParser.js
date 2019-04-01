const SCSSDictionary = require('./dictionaries/scss.js')
const Parser = require('./Parser.js')

class SCSSParser extends Parser{
    constructor(scssFile, webpack){
        super(scssFile, webpack, new SCSSDictionary());
       
    }
}

module.exports = SCSSParser;