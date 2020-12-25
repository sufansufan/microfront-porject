const path = require('path')
const fs = require('fs')
const os = require('os')

const webpack = require('webpack')

exports.resolve = dir => path.join(__dirname, '..', dir)

// 获取文件夹目录
const getAllDirs = function(mypath = '.') {
  const items = fs.readdirSync(mypath)
  const result = []
  // 遍历当前目录中所有的文件和文件夹
  items.map(item => {
    const temp = path.join(mypath, item)
    // 若当前的为文件夹
    if (fs.statSync(temp).isDirectory()) {
      // 存储当前文件夹的名字
      result.push(item)
      // 进入下一级文件夹访问
      // result = result.concat(getAllDirs(temp));
    }
  })
  return result
}
exports.getAllDirs = getAllDirs

// 获取文件目录
const getAllFiles = function(mypath = '.') {
  const items = fs.readdirSync(mypath)
  const result = []
  items.map(item => {
    const temp = path.join(mypath, item)
    if (fs.statSync(temp).isFile()) result.push(item)
  })
  return result
}
exports.getAllFiles = getAllFiles

// 将 Webpack 打包封装成 Promise
exports.webpackPromise = config =>
  new Promise((resolve, reject) => {
    webpack(config, function(err, stats) {
      if (err) throw err
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false
        }) + '\n'
      )
      resolve()
    })
  })

// 获取 dll
exports.getDlls = function() {
  const dlls = ['core', 'puzzle']
  const dllNames = []
  for (const item of dlls) {
    const dllName = require(`../static/dll/${item}.manifest.json`).name.split(
      '_'
    )
    dllNames.push(`./static/dll/${dllName[0]}.${dllName[1]}.dll.js`)
  }
  return dllNames
}

// 全局引入less
// exports.cssLoaders = function (options) {
//   function generateSassResourceLoader () {
//       var loaders = [
//           'css-loader',
//           'less-loader',
//           {
//               loader: 'sass-resources-loader',
//               options: {
//                   resources: [
//                       path.resolve(__dirname, '../src/core/styles/var.less'),
//                   ]
//               }
//           }
//       ]
//       if (options.extract) {
//           return ExtractTextPlugin.extract({
//               use: loaders,
//               fallback: 'vue-style-loader'
//           })
//       } else {
//           return ['vue-style-loader'].concat(loaders)
//       }
//   }
//   return {
//       less: generateSassResourceLoader(),
//   }
// }

exports.getNetworkIp = function() {
  let needHost = '' // 打开的host
  try {
    // 获得网络接口列表
    const network = os.networkInterfaces()
    for (const dev in network) {
      const iface = network[dev]
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          needHost = alias.address
        }
      }
    }
  } catch (e) {
    needHost = 'localhost'
  }
  return needHost
}
