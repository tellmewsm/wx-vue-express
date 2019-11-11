/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
// const readline = require('readline')
const mqtt = require('mqtt')
const fs = require('fs')
const path = require('path')
const setting1 = require('./iot-server')
const crypto = require('crypto')
const rp = require('request-promise')
const request = require('request')
const email = require('../email/qq-email')
var db = require('../server/mysql_query')
var fdata = require('../api/date')


var startTime= []
var error=0
var jsonObj={
  0:'无故障，或当前告警消除'
  };

const self = this
function subDevices() {
}

subDevices.playDevices = function(enviriment,user,controller, receiver, author, devices) {
  var mqttStr=''
  if(enviriment==='cn'){
    mqttStr=setting1.mqttConnectStrCN.cn
  }else{
    mqttStr=setting1.mqttConnectStrNa.na
  }
  self.mqttClient = mqtt.connect(mqttStr, {
    'rejectUnauthorized': false,
    'username': author.userId,
    'password': author.token,
    'clientId': `${author.userId}@ecouser/${author.resource}`,
    'keepalive': 120
  })
  
  self.mqttClient.on('error', function mqttErrFunc(err) {
    console.log('subscriber on error: ' + err)
  })

  self.mqttClient.on('reconnect', function() {
    console.log('subscriber on reconnect')
  })

  self.mqttClient.on('connect', function connectFunc() {
    console.log('subscriber on connect')
    for (i = 0; i < devices.length; i++) {
      startTime[i]=Date.now()
      self.mqttClient.subscribe(`iot/atr/+/${devices[i].did}/${devices[i].class}/${devices[i].resource}/+`, function(err, granted) {
        if (err) console.log('subscriber subscribe fail: ' + err)
        else console.log('subscriber subscribe success: ' + JSON.stringify(granted))
      })
    }
  })

  self.mqttClient.on('close', function mqttCloseFunc() {
    console.log('subscriber on close')
  })

  self.mqttClient.on('offline', function() {
    console.log('subscriber on offline')
  })

  self.mqttClient.on('message', function(topic, message) {
    var index=0
    console.log(Date.now()+':'+'[recv]: ' + topic + '   [' + message + ']')
    const topicAry = topic.split('/')

    console.log('message____'+message)
    var mess=JSON.parse(message)

    if (topicAry[2].indexOf(controller) >= 0) {
      for (var i = 0;i<devices.length;i++){
             if(topicAry[3]===devices[i].did){
                index = i
                startTime[i]= Date.now()
                console.log(i+'_________devices[i]'+devices[i].nick)
             }
      }       
      if(mess.body.data.code.length>0){
        console.log('message____'+mess.body.data.code[0])
        error=mess.body.data.code[0]
      }else{
        error=0
      }                                                                                      //(new Date()).Format("yyyy-MM-dd hh:mm:ss")
    db.query('INSERT into errorDetail (MTime,Nick,Mobile,Deebot,Message) VALUES (?,?,?,?,?)', [fdata.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),devices[index].nick,user,topicAry[3],jsonObj[error]], function(results, fields) {
         console.log(results)
    })
    email(receiver, '设备 ' +devices[index].nick+' || '+ topicAry[3] + '异常 :' + jsonObj[error])
    }else{
      for (var i = 0;i<devices.length;i++){
        if(topicAry[3]===devices[i].did){
           index = i
           startTime[i]= Date.now()
           console.log(i+'_________devices[i]'+devices[i].nick)
        }
     }
     if (topicAry[2].indexOf('onBattery') >= 0) {
      
      db.query('INSERT into batteryDetail (MTime,Mobile,DeebotName,DeebotId,Battery,IsLow) VALUES (?,?,?,?,?,?)', [fdata.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),user,devices[index].nick,topicAry[3],mess.body.data.value,mess.body.data.isLow], function(results, fields) {
        console.log(results)
      })
      
     }
    }
  })
  
  setInterval(tenemail,620000,receiver,devices,user);

}

subDevices.closeDevices = function() {
  self.mqttClient.end()
  self.mqttClient = null
}

var tenemail =function(receiver,deebot,user){

  for (var i = 0;i<startTime.length;i++){
  var timeNow = Date.now()
  console.log("第"+i+"上次时间"+startTime[i]);
 if(timeNow-startTime[i]>600000){
   console.log('当前时间'+timeNow+'|| 时差：'+(timeNow-startTime[i]));
   console.log('满足条件拉');
   email(receiver, deebot[i].nick+':   该设备已经10分钟未活动')
   db.query('INSERT into errorDetail (MTime,Nick,Mobile,Deebot,Message) VALUES (?,?,?,?,?)', [fdata.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),deebot[i].nick,user,deebot[i].did,'该设备已经10分钟未活动'], function(results, fields) {
    console.log('写入ok')
  })
  }
 }
}

Date.prototype.Format = function(fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

module.exports = subDevices

// export default subDevices
