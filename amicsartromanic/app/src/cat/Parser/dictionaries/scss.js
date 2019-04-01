const sass = require('node-sass')
class SCSSDictionary{
    constructor(){
        this.parseable = false;
    }
    render(scss, resolve){
        sass.render({
            data: scss,
        },
        function(err, result) {
            if (!err) {
                resolve(result.css.toString());
            } else {
                reject(err);
            }
        })
    }
}

module.exports = SCSSDictionary;