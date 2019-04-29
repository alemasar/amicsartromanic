const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const parts = require("./webpack.parts");
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const fs = require("fs");

function getFiles (dir, files_){
    files_ = files_ || [];
    if (fs.existsSync(dir)){
        const files = fs.readdirSync(dir);
        for (const i in files){
            const name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()){
                getFiles(name, files_);
            } else {
                files_.push(name);
            }
        }
    }
    return files_;
}

let p = {}
p['./js/main'] = [
//    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './public/index.js',
    './src/sass/app.scss',
    './src/css/bootstrap-material-design.css'
];
const components_dir = getFiles('./src/components');
if (components_dir.length > 0) {
    p['./js/components'] = components_dir;
}
template_dir = getFiles('./src/app/templates');
if (template_dir.length > 0) {
    p['./js/templates'] = template_dir;
}
p['./css/style'] = './src/scss/main.scss';
global.WEBComponentsTags = [];
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
    parts.loadTemplateFile({}),
    parts.loadCatFile(),
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
    parts.loadCSS(),
    //    parts.attachRevision(),
    parts.loadImages({}),
    parts.onFinished()
]);

const developmentConfig = merge([
    parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT,
	}),
    parts.loadHTML({}),
    parts.extractCSS({
        use: ["css-loader", "sass-loader"]
    }, true),
    parts.loadCSS(),
    parts.loadImages({}),
    parts.loadTemplateFile({}),
	parts.loadCatFile(),
	parts.onFinished()
]);

module.exports = mode => {
    
console.log(require.context)
    if (mode === "production") {
        return merge(commonConfig, productionConfig, { mode });
    }
    return merge(commonConfig, developmentConfig, { mode });
};
