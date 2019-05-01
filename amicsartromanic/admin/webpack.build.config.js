const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding
const path = require('path');
module.exports = {
  entry: './server.js',
  output: {
    path: path.resolve('.'),
    filename: 'server.js'
  },
  plugins: [
    new NodemonPlugin() // Dong
  ]
};
