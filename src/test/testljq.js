import { testGet,testPost } from './testapi'

testGet("userid").then(response => {
  console.log(response.data)
}).catch(error => {
  reject(error)
});

//const user={ myName: 'aaa', myPassword: 'bbb' }
testPost('aaa','bbb').then(response => {
  console.log(response.data)
}).catch(error => {
  reject(error)
})
