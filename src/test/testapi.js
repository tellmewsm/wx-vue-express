/* eslint-disable */
// eslint-disable-next-line
import service from '../test/requests'

export function testGet(userid) {
  return service({
    url: '/testGet',
    method: 'get',
    params: { userid }
  })
}

export function testPost(username,password) {
  return service({
    url: '/testPost',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

