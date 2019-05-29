const path = require('path')
const nodeExternals = require('webpack-node-externals')

const { NODE_ENV = 'production' } = process.env

module.exports = {
  entry: './index.js',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  externals: [nodeExternals({ whitelist: ['axios', 'follow-redirects'] })]
}
