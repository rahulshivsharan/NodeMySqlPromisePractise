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
	var promiseArray = []; // array of promise objects
	
	if(arguments.length > 0){
		_.each(arguments,callback);
	}else{
		throw "No departments passed";
	}

	function callback(deptName){
		promiseArray.push(insertDept(deptName))		
	}

	return Promise.all(promiseArray);
}//createDeptForAll


createDeptForAll("Human Resource","Bio Informatics","Advertisement","Mass Media").then(function(rows){	
	_.each(rows,function(row){
		console.log("Rows inserted "+row["affectedRows"]);
	});
}).done(function(){
		connection.end();
});