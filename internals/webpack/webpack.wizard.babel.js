const path = require('path');

const config = {
  mode: 'production',
  // In production, we skip all hot-reloading stuff
  entry: path.join(process.cwd(), 'app/wizard/index.js'),
  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    path: path.resolve(process.cwd(), 'app/wizard/build'),
    filename: 'index.js',
    library: 'redux-saga-wizard',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

module.exports = config;
