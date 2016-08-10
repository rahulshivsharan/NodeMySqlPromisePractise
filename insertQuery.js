var mySql = require("mysql");
var WatchJS = require("watchjs");
var 
var watch = WatchJS.watch;
var track = {
	"queryCount" : 0
}

watch(track,"queryCount",function(){
	console.log("query no  "+track.queryCount);
	if(track.queryCount === 0){
		console.log("Closing connection "+track.queryCount);
		connection.end();	
	}	
});

var connection = mySql.createConnection({
	host : "localhost",
	user : "root",
	password : "rahul",
	database : "testDb" //schema
});

connection.connect();

function logError(errorObj){
	if(errorObj){
			console.log(errorObj.stack);
	}	
}

function printAllDepartments(){
	track.queryCount++;
	var queryString = "select * from departmentTbl";
	
	connection.query(queryString,function(err,rows,fields){
		track.queryCount--;
		logError(err);
		
		for(var i = 0; i < rows.length; i++){		
			console.log("DepartmentId : \'"+rows[i]["deptId"]+"\', DepartmentName \'"+rows[i]["deptName"]+"\'");
		}

		
	});	
}

function maxDepartment(){
	track.queryCount++;
	var queryString = "select max(deptId) as 'DeptId' from departmentTbl";
	connection.query(queryString,function(err,rows,fields){
		track.queryCount--;	
		logError(err);
		console.log(rows[0]["DeptId"]);
	});
}

function createDepartment(deptId,deptName){
	track.queryCount++;
	var queryString = "insert into departmentTbl values("+deptId+",'"+deptName+"')";	
	
	connection.query(queryString,function(err,rows,fields){
		track.queryCount--;	
		logError(err);
	});
}

connection.query("select * from departmentTbl",function(err,rows,fields){

	logError(err);
	
	var nextDeptId = rows.length;

	nextDeptId++;	
	createDepartment(nextDeptId,"Aeronautical Engineering");

	nextDeptId++;
	createDepartment(nextDeptId,"Biomedical Engineering");

	printAllDepartments();
	maxDepartment();
});



