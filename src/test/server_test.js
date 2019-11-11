const express = require('express')
const bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())

//解决跨域问题
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

//demo:http://localhost:3000/hello
app.get('/hello', function(req, res) {
  res.send('hello world')
  res.status(200)
})

//请求参数为 {"username":"aaa","password":"bbb" }
//demo:http://localhost:3000/testPost
app.post('/testPost', function(req, res) {
 var resname= req.body.username
 var respassword=  req.body.password
 setTimeout(() => {
  return res.send({'code':20002, 'myName': resname, 'myPassword': respassword })
  }, 5000);
    //return res.send({'code':20002, 'myName': resname, 'myPassword': respassword })
})

//demo:http://localhost:3000/testGet/:1111
//输出 userid:1111
app.get('/testGet/:userid', function(req, res) {
  var userid =req.params.userid;
  res.status(200)
  res.send('userid:'+userid)
})

//demo:http://localhost:3000/testGet?userid=22222
//输出 userid:22222
app.get('/testGet', function(req, res) {
  var userid =req.query.userid;
  res.status(200)
  res.send('userid='+userid)
})

var server = app.listen(4000, function() {
  console.log('listening on port %d', server.address().port)
})

