function subTest(wxname) {
    this.wxname=wxname; //需new 构造方法传参使用
    this.run=function(){
        console.log('name：'+this.wxname);
    }
}
subTest.Wxname='Wxname' //静态变量

//静态
subTest.startUser = function(user,password) {
    console.log("user:"+user)
    console.log("password:"+password)
}
//静态
subTest.closeUser = function() {
    console.log('closeUser静态方法')
}

//需new 对象
subTest.prototype.proCloseUser = function() {
    console.log('proCloseUser非静态方法')
}

module.exports = subTest