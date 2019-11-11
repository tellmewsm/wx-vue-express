//数据库配置
//连接数据库
var mysql = require('mysql');
	
var connection = mysql.createConnection({
    host: 'localhost',
    port: 13306,
    database: 'centrallab',
    user: 'root',
    password: 'root'
});
 
connection.connect();
 
function selectfun(username,password,callback){
 
	connection.query('select password from user_info where username="'+username+'"',function(err,results){
		if(err) throw err;
		callback(results);		
	});	
 
}
 
function getSql(sql,callback){	
 
	connection.query(sql,function(err,results){
		if(err) throw err;
		console.log('从数据库中提取数据');		
		callback(results);		
	});
 
	
}