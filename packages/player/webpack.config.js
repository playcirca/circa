const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
module.exports = {
  entry: {
    main: ['./src/entry.tsx'],
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Cue',
      template: 'src/app.html'
    }),
    new HtmlWebpackHarddiskPlugin(),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
        },
        {
          loader: 'ts-loader'
        }
      ]
    },
      {
        test: /\.svg$/,
        use: {
          loader: '@svgr/webpack',
        },
        include: path.resolve(__dirname, "src/vectors"),
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
        exclude: path.resolve(__dirname, "src/vectors")
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.svg'],
    alias: {
      react: require.resolve('react'),
    }
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 8008,
    historyApiFallback: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:8000'
      },
    }
  }
};
