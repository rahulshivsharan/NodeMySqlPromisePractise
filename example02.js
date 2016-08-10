var mySql = require("mysql");

var connection = mySql.createConnection({
	host : "localhost",
	user : "root",
	password : "rahul",
	database : "testDb" //schema
});

connection.connect();

connection.query("select * from departmentTbl",function(err,rows,fields){

	if(err){
		console.log(err.stack);
	}
	
	for(var i = 0; i < rows.length; i++){		
		console.log("DepartmentId : \'"+rows[i]["deptId"]+"\', DepartmentName \'"+rows[i]["deptName"]+"\'");
	}
});

connection.end();