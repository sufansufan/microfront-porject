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
      '@framesDash': resolve('src/frames/dashboard'),
      '@puzzles': resolve('src/puzzles'),
      '@puzzlesDash': resolve('src/frames/dashboard/views/puzzles')
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
              resources: [
                path.resolve(__dirname, '../src/core/styles/var.less'),
                path.resolve(__dirname, '../src/core/styles/mixins.less')
              ]
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
      },
      {
        test: /Dockerfile/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader'
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
    // new BundleAnalyzerPlugin()
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   analyzerHost: 'localhost',
    //   analyzerPort: 8888, // 运行后的端口号
    //   reportFilename: 'report.html',
    //   defaultSizes: 'parsed',
    //   openAnalyzer: true,
    //   generateStatsFile: false,
    //   statsFilename: 'stats.json',
    //   statsOptions: null,
    //   logLevel: 'info'
    // })
  ]
}
