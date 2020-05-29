const webpack = require('webpack')
const path = require('path')
// Vue编译用
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 路径获取
const resolve = require('./utils').resolve

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  output: {
    filename: '[name].bundle.[hash].js',
    path: resolve('dist/frame')
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@core': resolve('src/core'),
      '@frames': resolve('src/frames'),
      '@puzzles': resolve('src/puzzles')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: path.resolve(__dirname, '../src/core/styles/var.less')
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // limit: 15000,
              outputPath: 'img'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: 'font' }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // dll
    new webpack.DllReferencePlugin({
      manifest: require('../static/dll/core.manifest.json')
    }),
    new webpack.DllReferencePlugin({
      manifest: require('../static/dll/puzzle.manifest.json')
    })
  ]
}
