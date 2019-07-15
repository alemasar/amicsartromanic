/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server-dev.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/server-dev.js":
/*!**********************************!*\
  !*** ./src/server/server-dev.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webpack */ \"webpack\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _webpack_config_babel_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../webpack.config.babel.js */ \"./webpack.config.babel.js\");\n/* harmony import */ var _webpack_config_babel_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_webpack_config_babel_js__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\nvar c = _webpack_config_babel_js__WEBPACK_IMPORTED_MODULE_6___default()();\nvar app = express__WEBPACK_IMPORTED_MODULE_1___default()(),\n    DIST_DIR = __dirname,\n    HTML_FILE = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(DIST_DIR, 'dist/index.html'),\n    compiler = webpack__WEBPACK_IMPORTED_MODULE_2___default()(c);\napp.use(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3___default()(compiler, {// publicPath: ''\n}));\napp.use(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_4___default()(compiler));\napp.get('*', function (req, res, next) {\n  console.log(HTML_FILE);\n  compiler.outputFileSystem.readFile(HTML_FILE, function (err, result) {\n    if (err) {\n      return next(err);\n    }\n\n    res.set('content-type', 'text/html');\n    res.send(result);\n    res.end();\n  });\n});\nvar PORT = process.env.PORT || 3000;\napp.listen(PORT, function () {\n  console.log(\"App listening to \".concat(PORT, \"....\"));\n  console.log('Press Ctrl+C to quit.');\n});\n\n//# sourceURL=webpack:///./src/server/server-dev.js?");

/***/ }),

/***/ "./webpack.config.babel.js":
/*!*********************************!*\
  !*** ./webpack.config.babel.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint-disable */\nvar merge = __webpack_require__(/*! webpack-merge */ \"webpack-merge\");\n\nvar HtmlWebpackPlugin = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar parts = __webpack_require__(/*! ./webpack.parts */ \"./webpack.parts.js\");\n\nvar HtmlWebpackExcludeAssetsPlugin = __webpack_require__(/*! html-webpack-exclude-assets-plugin */ \"html-webpack-exclude-assets-plugin\");\n\nvar HtmlWebpackHarddiskPlugin = __webpack_require__(/*! html-webpack-harddisk-plugin */ \"html-webpack-harddisk-plugin\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nfunction getFiles(dir, ext, files_) {\n  files_ = files_ || [];\n\n  if (fs.existsSync(dir)) {\n    var files = fs.readdirSync(dir);\n\n    for (var i in files) {\n      var name = dir + '/' + files[i];\n\n      if (fs.statSync(name).isDirectory()) {\n        getFiles(name, ext, files_);\n      } else {\n        if (name.indexOf('.' + ext) != -1) files_.push(name);\n      }\n    }\n  }\n\n  return files_;\n}\n\nvar p = {};\np['./js/main'] = [//    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',\n'./public/index.js'];\np['./css/main'] = ['./src/css/main.scss'];\nvar components_dir = getFiles('./src/components', 'cat');\n\nif (components_dir.length > 0) {\n  p['./components/components'] = components_dir;\n}\n\nvar template_dir = getFiles('./src/templates', 'template');\n\nif (template_dir.length > 0) {\n  p['./templates/templates'] = template_dir;\n}\n\nglobal.WEBComponentsTags = [];\nvar commonConfig = merge({\n  entry: p,\n  context: path.resolve(__dirname, ''),\n  mode: 'development',\n  devtool: 'source-map',\n  resolve: {\n    alias: {\n      TEMPLATE: path.resolve(__dirname, 'src/templates/'),\n      COMPONENTS: path.resolve(__dirname, 'src/components/')\n    }\n  },\n  plugins: [new HtmlWebpackPlugin({\n    title: 'Webpack demo',\n    excludeAssets: [/style.js/],\n    template: './public/index.html'\n  }), new HtmlWebpackExcludeAssetsPlugin(), new HtmlWebpackHarddiskPlugin()]\n});\nvar PATHS = {\n  /*  app: path.join(__dirname, 'src'),*/\n  build: path.join(__dirname, 'dist'),\n  compiledJs: path.join(__dirname, 'src/components/**/dist')\n};\nvar productionConfig = merge([parts.clean([PATHS.build, PATHS.compiledJs]), parts.loadTemplateFile({}), parts.loadCatFile(), parts.loadHTML({}), parts.extractCSS({\n  use: [{\n    loader: 'css-loader',\n    options: {\n      url: true\n    }\n  }, 'resolve-url-loader', {\n    loader: 'sass-loader',\n    options: {}\n  }]\n}, false), parts.loadCSS(), //    parts.attachRevision(),\nparts.loadImages({}),\n/*    parts.nodemon({\r\n      ext: 'js, template, cat'\r\n  }),*/\nparts.onFinished()]);\nvar developmentConfig = merge([parts.clean([PATHS.compiledJs]), parts.devServer({\n  // Customize host/port here if needed\n  host: process.env.HOST,\n  port: process.env.PORT\n}), parts.loadHTML({}), parts.extractCSS({\n  use: ['css-loader', 'sass-loader']\n}, true), parts.loadCSS(), parts.loadImages({}), parts.loadTemplateFile({}), parts.loadCatFile(), //    parts.nodemon(),\nparts.onFinished()]);\n\nmodule.exports = function (mode) {\n  if (mode === 'production') {\n    return merge(commonConfig, productionConfig, {\n      mode: mode\n    });\n  }\n\n  return merge(commonConfig, developmentConfig, {\n    mode: mode\n  });\n};\n\n//# sourceURL=webpack:///./webpack.config.babel.js?");

/***/ }),

/***/ "./webpack.parts.js":
/*!**************************!*\
  !*** ./webpack.parts.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError(\"Cannot destructure undefined\"); }\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nvar MiniCssExtractPlugin = __webpack_require__(/*! extract-css-chunks-webpack-plugin */ \"extract-css-chunks-webpack-plugin\");\n\nvar CleanWebpackPlugin = __webpack_require__(/*! clean-webpack-plugin */ \"clean-webpack-plugin\");\n\nvar GitRevisionPlugin = __webpack_require__(/*! git-revision-webpack-plugin */ \"git-revision-webpack-plugin\");\n\nvar EventHooksPlugin = __webpack_require__(/*! event-hooks-webpack-plugin */ \"event-hooks-webpack-plugin\");\n\nvar CopyWebpackPlugin = __webpack_require__(/*! copy-webpack-plugin */ \"copy-webpack-plugin\");\n\nvar ExtractCssChunks = __webpack_require__(/*! extract-css-chunks-webpack-plugin */ \"extract-css-chunks-webpack-plugin\");\n\nvar NodemonPlugin = __webpack_require__(/*! nodemon-webpack-plugin */ \"nodemon-webpack-plugin\");\n\nexports.devServer = function () {\n  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},\n      host = _ref.host,\n      port = _ref.port;\n\n  return {\n    devServer: {\n      contentBase: path.join(__dirname, 'dist'),\n      host: host,\n      // Defaults to `localhost`\n      port: 3000,\n      // Defaults to 8080\n      open: false,\n      overlay: true,\n      watchOptions: {\n        // Delay the rebuild after the first change\n        aggregateTimeout: 300,\n        // Poll using interval (in ms, accepts boolean too)\n        poll: 300\n      },\n      historyApiFallback: true\n    },\n    plugins: [// Ignore node_modules so CPU usage with poll\n    // watching drops significantly.\n    new webpack.WatchIgnorePlugin([path.join(__dirname, 'node_modules')])]\n  };\n};\n\nexports.extractCSS = function (_ref2) {\n  var include = _ref2.include,\n      exclude = _ref2.exclude,\n      use = _ref2.use,\n      _ref2$hot = _ref2.hot,\n      hot = _ref2$hot === void 0 ? [] : _ref2$hot;\n  // Output extracted CSS to a file\n  var plugin = new MiniCssExtractPlugin({\n    // Options similar to the same options in webpackOptions.output\n    // both options are optional\n    filename: '[name].css',\n    chunkFilename: '[id].css',\n    hot: hot,\n    // optional as the plugin cannot automatically detect if you are using HOT, not for production use\n    allChunks: true\n  });\n  return {\n    module: {\n      rules: [{\n        test: /\\.scss$/,\n        include: include,\n        exclude: exclude,\n        use: [MiniCssExtractPlugin.loader].concat(use)\n      }]\n    },\n    plugins: [plugin]\n  };\n};\n\nexports.clean = function (path) {\n  return {\n    plugins: [new CleanWebpackPlugin(path)]\n  };\n};\n\nexports.nodemon = function () {\n  return {\n    plugins: [new NodemonPlugin()]\n  };\n};\n\nexports.attachRevision = function () {\n  return {\n    plugins: [new webpack.BannerPlugin({\n      banner: new GitRevisionPlugin().version()\n    })]\n  };\n};\n\nexports.onFinished = function () {\n  return {\n    plugins: [new EventHooksPlugin({\n      done: function done() {\n        console.log('As you can see the compiling is finished', global.catFiles);\n      }\n    })]\n  };\n};\n\nexports.loadTemplateFile = function () {\n  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},\n      include = _ref3.include,\n      exclude = _ref3.exclude;\n\n  return {\n    module: {\n      rules: [{\n        test: /\\.(template)$/,\n        include: include,\n        exclude: exclude,\n        use: {\n          loader: path.resolve('./loaders/template-loader/template-loader.js'),\n          options: {\n            context: path.join(__dirname, 'src'),\n            \"public\": path.join(__dirname, 'public'),\n            dist: path.join(__dirname, 'dist') //\t\t\t  name: '[name].[ext]',\n            //\t\t\t  useRelativePath: true,\n            //\t\t\t  outputPath: '../dist/',\n            //\t\t\t  publicPath: '../images/'\n\n          }\n        }\n      }]\n    }\n  };\n};\n\nexports.loadCatFile = function () {\n  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},\n      include = _ref4.include,\n      exclude = _ref4.exclude;\n\n  return {\n    module: {\n      rules: [{\n        test: /\\.(cat)$/,\n        include: include,\n        exclude: exclude,\n        use: {\n          loader: path.resolve('./loaders/cat-loader/cat-loader.js'),\n          options: {\n            context: path.join(__dirname, 'src'),\n            \"public\": path.join(__dirname, 'public') //\t\t\t  name: '[name].[ext]',\n            //\t\t\t  useRelativePath: true,\n            //\t\t\t  outputPath: '../dist/',\n            //\t\t\t  publicPath: '../images/'\n\n          }\n        }\n      }]\n    }\n  };\n};\n\nexports.loadImages = function () {\n  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},\n      include = _ref5.include,\n      exclude = _ref5.exclude;\n\n  return {\n    module: {\n      rules: [{\n        test: /\\.(png|jpe?g|svg)$/,\n        include: include,\n        exclude: exclude,\n        use: {\n          loader: 'file-loader',\n          options: {\n            name: '[name].[ext]',\n            useRelativePath: false,\n            outputPath: './images',\n            publicPath: '../images'\n          }\n        }\n      }]\n    }\n  };\n};\n\nexports.loadHTML = function () {\n  var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n  _objectDestructuringEmpty(_ref6);\n\n  return {\n    module: {\n      rules: [{\n        test: /\\.html$/,\n        use: {\n          loader: 'html-loader'\n        }\n      }]\n    }\n  };\n};\n\nexports.loadCSS = function () {\n  var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n  _objectDestructuringEmpty(_ref7);\n\n  return {\n    module: {\n      rules: [{\n        test: /\\.css$/,\n        use: [{\n          loader: ExtractCssChunks.loader,\n          options: {\n            hot: true,\n            // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config\n            reloadAll: true // when desperation kicks in - this is a brute force HMR flag\n\n          }\n        }, {\n          loader: 'css-loader',\n          options: {\n            url: true\n          }\n        }, 'resolve-url-loader']\n      }]\n    }\n  };\n};\n\n//# sourceURL=webpack:///./webpack.parts.js?");

/***/ }),

/***/ "clean-webpack-plugin":
/*!***************************************!*\
  !*** external "clean-webpack-plugin" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"clean-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22clean-webpack-plugin%22?");

/***/ }),

/***/ "copy-webpack-plugin":
/*!**************************************!*\
  !*** external "copy-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"copy-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22copy-webpack-plugin%22?");

/***/ }),

/***/ "event-hooks-webpack-plugin":
/*!*********************************************!*\
  !*** external "event-hooks-webpack-plugin" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"event-hooks-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22event-hooks-webpack-plugin%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "extract-css-chunks-webpack-plugin":
/*!****************************************************!*\
  !*** external "extract-css-chunks-webpack-plugin" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"extract-css-chunks-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22extract-css-chunks-webpack-plugin%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "git-revision-webpack-plugin":
/*!**********************************************!*\
  !*** external "git-revision-webpack-plugin" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"git-revision-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22git-revision-webpack-plugin%22?");

/***/ }),

/***/ "html-webpack-exclude-assets-plugin":
/*!*****************************************************!*\
  !*** external "html-webpack-exclude-assets-plugin" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"html-webpack-exclude-assets-plugin\");\n\n//# sourceURL=webpack:///external_%22html-webpack-exclude-assets-plugin%22?");

/***/ }),

/***/ "html-webpack-harddisk-plugin":
/*!***********************************************!*\
  !*** external "html-webpack-harddisk-plugin" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"html-webpack-harddisk-plugin\");\n\n//# sourceURL=webpack:///external_%22html-webpack-harddisk-plugin%22?");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"html-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22html-webpack-plugin%22?");

/***/ }),

/***/ "nodemon-webpack-plugin":
/*!*****************************************!*\
  !*** external "nodemon-webpack-plugin" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"nodemon-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22nodemon-webpack-plugin%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-dev-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-hot-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-hot-middleware%22?");

/***/ }),

/***/ "webpack-merge":
/*!********************************!*\
  !*** external "webpack-merge" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-merge\");\n\n//# sourceURL=webpack:///external_%22webpack-merge%22?");

/***/ })

/******/ });