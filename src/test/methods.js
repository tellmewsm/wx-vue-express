var func1 = function(par) {
 console.log('func1：'+par)
}

function func2(par2){
    console.log('func2：'+par2)
}
module.exports = {func1,func2}

module.exports.user = {
    'name': 'wuxi',
    'password' :  "123456"
}
module.exports.other = 'test'

