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

function getDepartment(departmentId){
	return new Promise(fn);

	function fn(resolve,reject){
		var sql = "select * from departmentTbl where deptid = "+departmentId;
		connection.query(sql,function(err,rows,fields){
			if(err){								
				return reject(err);
			}else{				
				return resolve(rows);
			}
		});
	}
}

function getSelectedDept(){
	var promises = [];
	if(arguments.length > 0){
		promises = arguments;
	}else{
		throw new Error("Accepts Promise as arguments");
	}

	return Promise.all(promises);
}

getSelectedDept(getDepartment(16), // returns promise
				getDepartment(19), // returns promise
				getDepartment(17)  // returns promise
				).then(function(rows){
	_.each(rows,function(row){
		var department = row[0];
		console.log("Department Id \""+department.deptId+"\", DepartmentName \""+department.deptName+"\"");	
	});	
}).catch(function(err){
	console.log(err);
}).done(function(){
	connection.end();
});