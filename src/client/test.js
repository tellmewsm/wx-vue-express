/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

// const mqtt = require('mqtt')
// const readline = require('readline')
// const fs = require('fs')
// const path = require('path')
// const setting = require('./iot-server')
// const crypto = require('crypto')
// const rp = require('request-promise')
// const request = require('request')
// var email = require('../email/qq-email')
// var devices = require('./get_device_list')
// var sub = require('./get_device_sub')
// var db = require('../server/mysql_query')
// var db2 = require('../server/mysql_action')

var test = require('./get_device_list_copy')

test.mydevices('xxxxxxxx','xxxxxxxx', (response,result) => {
   console.log(response)
   console.log(result)
})

// test.mydevices('xxxxxxxx', 'xxxxxxxx', (err, res) => {
//   console.log(err)
// })

// test.mydevices('xxxxxxxx', 'xxxxxxxx', function (err, res, req, ds) {
//   console.log(err)
// })

// email('xxxxxx@qq.com', 'error')

// devices.mydevices('xxxxxxxx', 'xxxxxxxx', (myauthor, mydevice) => {
//   sub.playDevices(myauthor, mydevice)
// })

// function printHello() {
//  console.log('Hello, World!')
// }

// 两秒后执行以上函数
// setInterval(printHello, 2000)

// db.query('select * from errorDetail', [], function(results, fields) {
//   console.log(results)
//   console.log(fields)
// })

//db2.getSql('select * from errorDetail',callback)

// var schedule = require('node-schedule');

// var rule = new schedule.RecurrenceRule();  
// rule.minute = 1;
// var j = schedule.scheduleJob(rule, function(){  
//     console.log('The answer to life, the universe, and everything!');
// });

// let startTime = new Date(Date.now() + 5000);
// let endTime = new Date(startTime.getTime() + 5000);
// var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
//   console.log('Time for tea!');
// });

/**
 * Created by Administrator on 2016/3/11.
 */
// var aa= Date.now()
// function  myfunc(a,b){
//     console.log(Date.now()-aa);
//     console.log("myfunc  "+a+b);
//     console.log("myfunc  "+a+b);
// }
// var myInterval=setInterval(myfunc,5000,Date.now(),aa);
// function  stopInterval(){
//     clearTimeout(myInterval);
//  //myInterval.unref();
// }
// setTimeout(stopInterval,25000);

// var startTime = Date.now()
// var myfunction =function(startTime){
//    var timeNow = Date.now()
//    console.log('当前时间'+timeNow+'|| 时差：'+(timeNow-startTime));
// }
// var myInterval=setInterval(myfunction,5000,startTime);

// function  stopInterval(){
//     //clearTimeout(myInterval);
//     //clearImmediate(myInterval);
//     clearInterval(myInterval);
// }

// setTimeout(stopInterval,26000);

// var timer1 = setTimeout(function(){
//   console.log(new Date, 1);
// }, 1000);
// // setTimeout=>uv_timer_start(timer1)  active_handles = 1

// var timer2 = setInterval(function(){
//   console.log(new Date, 2);
// }, 1000);
// // setInterval=>uv_timer_start(timer2) active_handles = 2

// timer2.unref();

// var timer1 = setInterval(function(){
//   console.log(new Date, 1);
// }, 1000);
// // setInterval=>uv_timer_start(timer1)  active_handles = 1

// var timer2 = setInterval(function(){
//   console.log(new Date, 2);
// }, 1000);
// // setInterval=>uv_timer_start(timer2) active_handles = 2

// timer2.unref()
