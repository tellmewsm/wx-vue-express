const express = require('express')
const bodyParser = require('body-parser')
var devices = require('../client/get_device_list')

var client = require('../client/get_device_sub')
var battery_client = require('../client/battery_device_sub')

const setting = require('../client/iot-server')

var app = express()
app.use(bodyParser.json())

var db = require('../server/mysql_query')

var clean=require('../client/battery-clean')

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.get('/hello', function(req, res) {
  res.send('hello world')
})

app.post('/playDevices', function(req, res) {
  devices.mydevices(req.body.enviriment,req.body.username, req.body.password, (myauthor, mydevice) => {
    client.playDevices(req.body.enviriment,req.body.username,req.body.controller, req.body.receiver, myauthor, mydevice)
    return res.send({ 'myauthor': myauthor, 'mydevice': mydevice })
  })
})

app.post('/batteryPlayClean', function(req, res) {
  console.log("开始清扫")
  clearInterval(setting.cleanTime)
  clean.playClean(req.body.didclass,req.body.didresource,req.body.diddid,req.body.token,req.body.resources,req.body.userId);
  setting.cleanTime= setInterval(clean.playClean,20000,req.body.didclass,req.body.didresource,req.body.diddid,req.body.token,req.body.resources,req.body.userId);
  return res.send('ok')
})

app.post('/batteryStopClean', function(req, res) {
  console.log("停止清扫")
  clearInterval(setting.cleanTime)
  clean.stopClean(req.body.didclass,req.body.didresource,req.body.diddid,req.body.token,req.body.resources,req.body.userId);
  return res.send('ok')
})

app.post('/batteryStartCharge', function(req, res) {
  console.log("开始充电")
  clearInterval(setting.cleanTime)
  clean.startCharge(req.body.didclass,req.body.didresource,req.body.diddid,req.body.token,req.body.resources,req.body.userId);
  return res.send('ok')
})

app.post('/batterySub', function(req, res) {
  devices.mydevices(req.body.enviriment,req.body.username, req.body.password, (myauthor, mydevice) => {
    battery_client.playDevices(req.body.enviriment,req.body.username,req.body.controller, req.body.receiver, myauthor, mydevice)
    return res.send({ 'myauthor': myauthor, 'mydevice': mydevice })
  })
})


app.get('/closeDevices', function(req, res) {
  client.closeDevices()
  res.status(200)
  res.send('OK')
})

app.get('/closeBatteryDevices', function(req, res) {
  battery_client.closeDevices()
  res.status(200)
  res.send('OK')
})

app.get('/getErrorDetails', function(req, res) {
  db.query("select *  from errorDetail", [], function(results, fields) {
    res.send(results)
  })
})

app.get('/getbatteryRange', function(req, res) {
  db.query("select *  from batteryRange", [], function(results, fields) {
    console.log(results[0].battery_min)
    console.log(results[0].battery_max)
    res.send(results)
  })
})

app.post('/getSetRange', function(req, res) {
  db.query('update batteryRange set battery_min= ' + req.body.battery_min + ', battery_max=' + req.body.battery_max + ' where battery_id = 1 ;', [], function(results, fields) {
    res.send(results)
  })
})

//,CONVERT_TZ(`MTime`,'+00:00','+08:00') AS MTime 
app.get('/getBatteryDetails', function(req, res) {
  db.query("select * from batteryDetail order by MTime desc", [], function(results, fields) {
    res.send(results)
  })
})

var server = app.listen(3000, function() {
  console.log('listening on port %d', server.address().port)
})
