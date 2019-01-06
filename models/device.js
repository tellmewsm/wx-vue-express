// 加载mongoose模块
var mongoose = require('mongoose')
// Schema表模型获取mongoose的Schema
var Schema = mongoose.Schema
// 定义商品模型
var produtSchema = new Schema({
  '_id': Object,
  'id': String,
  'name': String,
  'username': String,
  'authOk': String,
  'ts': Number,
  'pid': String,
  'evt': String,
  'td': String
})
// 3.连接数据库
mongoose.connect('mongodb://admin/admin', {
  useNewUrlParser: true,
  auth: { 'authSource': 'admin' },
  user: 'admin',
  pass: 'admin',
  poolSize: 10
})

mongoose.connection.on('connected', () => {
  console.log('数据库连接成功！')
})

mongoose.connection.on('error', () => {
  console.log('数据库连接失败！')
})

mongoose.connection.on('disconnected', () => {
  console.log('数据库连接断开！')
})

// xxxx映射的表
module.exports = mongoose.model('device', produtSchema, 'xxxx')
