const path = require('path');
const HWP = require('html-webpack-plugin');

module.exports = options => {
  return {
    entry: path.join(__dirname, '/src/index.js'), // entry point
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, '/dist')
      //where the output file would be created (requires absolute path)
    },
    module: {
      rules: [{ // rules for the webpack
        test: /\.js$/, // all javascript files
        exclude: /node_modules/, // excluding node modules
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [['@babel/preset-env', { useBuiltIns: 'entry', }]],
          }
        }
      }]
    },
    plugins: [
      new HWP(
        { template: path.join(__dirname, '/src/index.html') }
      )
    ]
  }
}