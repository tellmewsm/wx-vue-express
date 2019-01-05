//express模块
const express = require('express')
const bodyParser = require('body-parser')
_ = require('underscore')
//创建app对象
const app = express()
app.use(bodyParser.json())

//express 路由访问不同地址
var devicesRouter = require('./router/db');

app.use('/router', devicesRouter);
app.use(bodyParser.urlencoded({ extended: true }));

//跨域
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var devices = require('./models/device')
//定义服务启动端口
app.listen(3033, () => {
  console.log('app listening on port 3033')
})

app.post('/device', function (req, res) {

  const start = new Date(req.body.before).getTime()
  const end = new Date(req.body.after).getTime()

  devices.find({ ts: { $gte: start, $lt: end } },
    function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        })
      } else {
        res.json(
          doc
        )
      }
    }).sort({ ts: -1 })
})

app.post('/deviceID', function (req, res) {

  const start = new Date(req.body.before).getTime()
  const end = new Date(req.body.after).getTime()

  //时间范围
  //devices.find({ ts: { $gte: start, $lt: end }, id: req.body.id, username: req.body.username },
  devices.find({
    $or: [ //多条件或者
      { username: req.body.username },
      { id: req.body.id }
    ],
    //并
    ts: { $gte: start, $lt: end },
  },
    function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        })
      } else {
        res.json(
          doc
        )
      }
    }).sort({ ts: -1 })
  //sort 排序 倒序
})

app.get('/uniq', function (req, res) {

  var user = [
    { age: 20, name: "John" },
    { age: 31, name: "Mary" },
    { age: 20, name: "John" }
  ];

  var uniq_user = _.uniq(user, false, function (item) {
    return item.name && item.age;
  });
  console.log(uniq_user);
  // [{age: 20, name: "John"},{age: 31, name: "Mary"}]
  console.log(uniq_user.length);  // 2
})