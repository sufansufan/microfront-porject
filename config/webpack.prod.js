const inquirer = require('inquirer')
const { getAllDirs } = require('./utils')
const webpackPromise = require('./utils').webpackPromise

const _core = require('./webpack.build.core')
const _common = require('./webpack.build.common')

const promptList = [
  {
    type: 'checkbox',
    message: '请选择需要打包的架构:',
    name: 'frames',
    choices: getAllDirs('./src/frames'),
    validate: function(val) {
      var done = this.async()
      if (val.length == 0) {
        done('请至少选择一个！')
        return
      }
      done(null, true)
    }
  },
  {
    type: 'checkbox',
    message: '请选择需要打包的模块:',
    name: 'puzzles',
    choices: getAllDirs('./src/puzzles'),
    validate: function(val) {
      var done = this.async()
      if (val.length == 0) {
        done('请至少选择一个！')
        return
      }
      done(null, true)
    }
  }
];
