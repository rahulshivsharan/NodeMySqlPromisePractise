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
				var department = rows[0];
				console.log("Department Id \""+department.deptId+"\", DepartmentName \""+department.deptName+"\"");
				return resolve(rows);
			}
		});
	}
}

getDepartment(19)
.then(getDepartment(16))
.then(getDepartment(18))
.then(getDepartment(17))
.catch(function(err){
	console.log(err);
}).done(function(){
	connection.end();
});