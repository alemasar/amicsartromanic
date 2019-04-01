class HTMLDictionary{
    constructor(){
        this.parseable = false;
    }
    
    render(html, resolve){
        resolve(html)
    }
}

module.exports = HTMLDictionary;
