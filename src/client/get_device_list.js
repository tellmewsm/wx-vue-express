var crypto = require('crypto')
var setting = require('./iot-server')
var rp = require('request-promise')
function getDevices() {

}

getDevices.mydevices = function(enviriment,user, password, cb) {
  console.log('en+++'+enviriment)
  if(enviriment==='cn'){
    console.log('国内环境')
    var it_login_options = {
      method: 'POST',
      uri: setting.mqttConnectStrCN.login_url,
      body: {
        'todo': 'ITLogin',
        'me': user,
        'password': crypto.createHash('md5').update(password).digest('hex'),
        'resource': 'test',
        'last': '7200000',
        'country': setting.mqttConnectStrCN.country,
        'org': setting.mqttConnectStrCN.org,
        'edition': 'ECOGLOBLE',
        'platform': 'Test'
      },
      json: true,
      rejectUnauthorized: false
    }
    rp(it_login_options)
      .then(function(loginBody) {
        // eslint-disable-next-line camelcase
        var get_device_list_options = {
          method: 'POST',
          uri: setting.mqttConnectStrCN.get_list_url,
          body: {
            'todo': 'GetDeviceList',
            'userid': loginBody.userId,
            'auth': {
              'with': 'users',
              'userid': loginBody.userId,
              'resource': loginBody.resource,
              'token': loginBody.token,
              'realm': 'ecouser.net'
            }
          // eslint-disable-next-line no-trailing-spaces
          }, 
          json: true,
          rejectUnauthorized: false
        }
        rp(get_device_list_options)
          .then(function(listBody) {
            console.log(loginBody)
             console.log(listBody.devices)
            // return cb(listBody.devices, '2', '3', '4')
            return cb(loginBody, listBody.devices)
          })
      })
      .catch(function(err) {
        console.log(`[Error]: ${err}`)
        return null
      })
  }else{
  
  // eslint-disable-next-line camelcase
  var it_login_options = {
    method: 'POST',
    uri: setting.mqttConnectStrNa.login_url,
    body: {
      'todo': 'ITLogin',
      'me': user,
      'password': crypto.createHash('md5').update(password).digest('hex'),
      'resource': 'test',
      'last': '7200000',
      'country': setting.mqttConnectStrNa.country,
      'org': setting.mqttConnectStrNa.org,
      'edition': 'ECOGLOBLE',
      'platform': 'Test'
    },
    json: true,
    rejectUnauthorized: false
  }
  rp(it_login_options)
    .then(function(loginBody) {
      // eslint-disable-next-line camelcase
      var get_device_list_options = {
        method: 'POST',
        uri: setting.mqttConnectStrNa.get_list_url,
        body: {
          'todo': 'GetDeviceList',
          'userid': loginBody.userId,
          'auth': {
            'with': 'users',
            'userid': loginBody.userId,
            'resource': loginBody.resource,
            'token': loginBody.token,
            'realm': 'ecouser.net'
          }
        // eslint-disable-next-line no-trailing-spaces
        }, 
        json: true,
        rejectUnauthorized: false
      }
      rp(get_device_list_options)
        .then(function(listBody) {
          console.log(loginBody)
           console.log(listBody.devices)
          // return cb(listBody.devices, '2', '3', '4')
          return cb(loginBody, listBody.devices)
        })
    })
    .catch(function(err) {
      console.log(`[Error]: ${err}`)
      return null
    })

  }
}

module.exports = getDevices
