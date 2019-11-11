// const test1=require('./methods')
// test1.func1("test1")
// test1.func2("test2")

// test1(JSON.stringify(test1.user))
// test1(test1.user.name)
// test1(test1.other)

//调用静态方法
// const test2=require('./user')
// test2.startUser('wx','123456')
// test2.closeUser()
// console.log(test2.Wxname) 

//new对象
// var playTest=new test2('wuxi')
// console.log('分割线_______________') 
// console.log(playTest.wxname) 
// playTest.run()
// playTest.proCloseUser()



const axios =require('axios')

//get path
axios.get('http://localhost:3000/testGet/demo1')
.then((response) => {
  console.log(response.data)
})
.catch(function(error) {
  console.log(error)
})
//输出：userid:demo1

//get path
axios.get('http://localhost:3000/testGet?userid=demo2')
.then((response) => {
  console.log(response.data)
})
.catch(function(error) {
  console.log(error)
})
//输出：userid:demo2
//demo2 demo3 实际一样
//get params
axios.get('http://localhost:3000/testGet', {
  params: {
    userid:"demo3"
  }
})
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
})
.then(function () {
  // always executed
});  
//输出：userid:demo3

//json post
axios.post('http://localhost:3000/testPost', {
  "username":"aaa",
  "password":"bbb" 
  })
  .then((response) => {
    console.log(response.data)
  })
  .catch(function(error) {
    console.log(error)
  })

//输出：{ myName: 'aaa', myPassword: 'bbb' }

//json header post
axios({
    url: 'http://localhost:3000/testPost',
    method: 'post',
    data: {
      "username":"aaa",
      "password":"bbb" 
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Content-Type':	'application/json',
      'Accept-Language':	'zh-cn'
    }
  })
  .then((response) => {
      console.log(response.data)
    })
    .catch(function(error) {
      console.log(error)
})
//输出：{ myName: 'aaa', myPassword: 'bbb' }
