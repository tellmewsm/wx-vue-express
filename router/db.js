// 引入router
var express = require('express')
// express 路由
var router = express.Router()
// 引入mongoose的数据模块
var devices = require('../models/device')

router.get('/', function (req, res, next) {
  devices.find({ name: 'name' }, function (doc) {
    res.json(
      doc
    )
  })
})
module.exports = router
