var Promise = require("promise");
var mySql = require("mysql");
var _ = require("underscore");

var connection = mySql.createConnection({
	host : "localhost",
	user : "root",
	password : "rahul",
	database : "testDb" //schema
});

connection.connect();

function insertDept(name){
	return new Promise(fn);
		
	function fn(resolve,reject){		
		var sql = "insert into departmentTbl(deptName) values('"+name+"')";
		connection.query(sql,function(err,rows,fields){
			if(err){
				console.log(err);				
				return reject(err);
			}else{
				return resolve(rows);
			}
		});
			
	}//fn			
}//insertDept

function createDeptForAll(){
	var promiseObj = [];
	
	if(arguments.length > 0){
		_.each(arguments,callback);
	}else{
		throw "No departments passed";
	}

	function callback(deptName){
		promiseObj.push(insertDept(deptName))		
	}

	return Promise.all(promiseObj);
}//createDeptForAll


createDeptForAll("Archiology","Anthropology").then(function(createDepartment){
	createDepartment.then(function(rows){
		console.log("Rows inserted "+rows["affectedRows"]);
	}).catch(function(error){
		console.log(error);		
	}).done(function(){
		connection.end();
	});
});