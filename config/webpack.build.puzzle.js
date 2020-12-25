const _common = require('./webpack.build.common')
// 获取参数
const puzzle = process.env.npm_config_name

// 构建单个
if (puzzle) module.exports = _common('puzzles', puzzle)

// 构建所有
// TODO
