const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const parts = require("./webpack.parts");
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const fs = require("fs");

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

console.log()

let p = {}
p['./js/main'] = './public/index.js';
/*p['./js/components'] = getFiles('./src/components');
p['./js/templates'] = getFiles('./src/app/templates');*/
//p['./css/style'] = './src/scss/main.scss';
//global.WEBComponentsTags = [];
const commonConfig = merge({
    entry: p,
    context: path.resolve(__dirname, ''),
	mode:"development",
    devtool: 'source-map',
    resolve: {
        alias: {
          TEMPLATE: path.resolve(__dirname, 'src/app/templates/'),
          COMPONENTS: path.resolve(__dirname, 'src/components/'),
          APP: path.resolve(__dirname, 'src/app/')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack demo",
            excludeAssets: [/style.js/],
            template: './public/index.html'
        }),
        new HtmlWebpackExcludeAssetsPlugin(),
        new HtmlWebpackHarddiskPlugin()
	],
});

const PATHS = {
    app: path.join(__dirname, "src"),
    build: path.join(__dirname, "dist"),
};

const productionConfig = merge([
	parts.clean(PATHS.build),
   /* parts.loadTemplateFile({}),
    parts.loadCatFile(),*/
    parts.loadHTML({}),
    parts.extractCSS({
        use: [
            {
                loader: 'css-loader',
                options: {
                    url: true,
                }
            }, 'resolve-url-loader', {
                loader: 'sass-loader',
                options: {}
            }
        ]
    }, false),
    //    parts.attachRevision(),
    parts.loadImages({}),
    parts.onFinished()
]);

const developmentConfig = merge([
    parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: 3000,
	}),
    parts.loadHTML({}),
    parts.extractCSS({
        use: ["css-loader", "sass-loader"]
    }, true),
    parts.loadImages({}),
    /*parts.loadTemplateFile({}),
	parts.loadCatFile(),*/
	parts.onFinished()
]);

module.exports = mode => {
    
console.log(require.context)
    if (mode === "production") {
        return merge(commonConfig, productionConfig, { mode });
    }
    return merge(commonConfig, developmentConfig, { mode });
};
