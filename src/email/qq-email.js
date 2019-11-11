var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')// 使用激活需引入的模块

var transporter = nodemailer.createTransport(smtpTransport({
  host: 'smtp.qq.com',
  secure: true, // 使用 SSL
  port: 465, // SMTP 端口
  auth: {
    user: 'xxxxxxxx@qq.com',
    pass: 'xxxxxxxx' // 授权码,通过QQ获取
  }
}))

var sendMail = function(recept, content) {
  var mailOptions = {
    from: '"_wuxi" <xxxxxxxx@qq.com>', // 发送者
    to: recept, // 接受者,可以同时发送多个,以逗号隔开
    subject: '监控异常', // 标题
    text: content, // 文本
    //html: '<b>监控异常</b>'
  }
  transporter.sendMail(mailOptions, function(err, response) {
    if (err) {
      console.log(err)
      return
    }
    console.log('发送成功')
  })
}

module.exports = sendMail
