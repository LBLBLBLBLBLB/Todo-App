const path = require('path');

module.exports = {
  entry: './src/script.js',
  // Rest of the webpack configuration...
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development'
};