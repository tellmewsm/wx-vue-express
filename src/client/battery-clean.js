const axios =require('axios')

var playClean=function(didclass,didresource,diddid,token,resources,userId){
console.log("开始清扫～～～～～～～～～～～～")
axios({
    url: 'https://portal.ecouser.net/api/iot/devmanager.do',
    method: 'post',
    // 发送格式为json
    data: JSON.stringify({
      'toType': didclass, //class
      'payloadType': 'j',
      'toRes': didresource, //resource
      'payload': {
        'header': {
          'pri': 1,
          'tzm': 480,
          'ts': '1568883867056',
          'ver': '0.0.50'
        },
        'body': {
          'data': {
            'donotClean': 0,
            'count': 1,
            'router': 'plan',
            'act': 'start',
            'type': 'auto'
          }
        }
      },
      'td': 'q',
      'toId': diddid, // device.did
      'cmdName': 'clean',
      'auth': {
        'token': token, // author.token
        'resource': resources,                  // author.resource
        'userid': userId,                // author.userId
        'with': 'users',
        'realm': 'ecouser.net'
      }
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Content-Type':	'application/json',
      'Accept-Language':	'zh-cn'
    }
  }
  )
    .then((response) => {
      console.log("清扫结果～～～～～～～～"+JSON.stringify(response.data))
    })
    .catch(function(error) {
      console.log(error)
    })
}

var stopClean=function(didclass,didresource,diddid,token,resources,userId){

  axios({
      url: 'https://portal.ecouser.net/api/iot/devmanager.do',
      method: 'post',
      // 发送格式为json
      data: JSON.stringify({
        'toType': didclass, //class
        'payloadType': 'j',
        'toRes': didresource,   //resource
        'payload': {
          'header': {
            'pri': 1,
            'tzm': 480,
            'ts': '1568883867056',
            'ver': '0.0.50'
          },
        'body': {
          'data': {
            'count': 1,
            'act': 'pause',
            'type': 'auto',
            'donotClean': 0
            }
          }
        },
        'td': 'q',
        'toId': diddid, // device.did
        'cmdName': 'clean',
        'auth': {
          'token': token, // author.token
          'resource': resources,                  // author.resource
          'userid': userId,                // author.userId
          'with': 'users',
          'realm': 'ecouser.net'
        }
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type':	'application/json',
        'Accept-Language':	'zh-cn'
      }
    }
    )
      .then((response) => {
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  var startCharge=function(didclass,didresource,diddid,token,resources,userId){

    axios({
        url: 'https://portal.ecouser.net/api/iot/devmanager.do',
        method: 'post',
        // 发送格式为json
        data: JSON.stringify({
          'toType': didclass, //class
          'payloadType': 'j',
          'toRes': didresource,   //resource
          'payload': {
            'header': {
              'pri': 1,
              'tzm': 480,
              'ts': '1568883867056',
              'ver': '0.0.50'
            },
            'body': {
              'data': {
                'act': 'go'
              }
            }
          },
          'td': 'q',
          'toId': diddid, // device.did
          'cmdName': 'charge',
          'auth': {
            'token': token, // author.token
            'resource': resources,                  // author.resource
            'userid': userId,                // author.userId
            'with': 'users',
            'realm': 'ecouser.net'
          }
        }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Content-Type':	'application/json',
          'Accept-Language':	'zh-cn'
        }
      }
      )
        .then((response) => {
        })
        .catch(function(error) {
          console.log(error)
        })
    }

module.exports={playClean,stopClean,startCharge}