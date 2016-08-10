var Promise = require("promise");

var mySql = require("mysql");

var connection = mySql.createConnection({
	host : "localhost",
	user : "root",
	password : "rahul",
	database : "testDb" //schema
});

connection.connect();

var getDepartments = function(){
	return new Promise(function(resolve,reject){
		connection.query("select * from departmentTbl",function(err,rows,fields){

			if(err){				
				return reject(err);
			}else{				
				return resolve(rows);
			}
			
		});
	});
} // getDepartments

var getMaxDept = function(){
	return new Promise(fn);

	function fn(resolve,reject){
		var sql = "select max(deptId) + 1 as 'DeptId' from departmentTbl";
		
		connection.query(sql,function(err,rows,fields){
			if(err){
				console.log(err.stack);

				return reject(err);
			}else{
				return resolve(rows);
			}
		});
	}	
}
		
var insertDept = function(name){
	return new Promise(fn);
		
	function fn(resolve,reject){
		getMaxDept().then(function(rows){
			var deptId = rows[0]["DeptId"];
			var sql = "insert into departmentTbl values("+deptId+",'"+name+"')";
			console.log(sql);
			connection.query(sql,function(err,rows,fields){
				if(err){
					console.log(err);
					return reject(err);
				}else{
					return resolve(rows);
				}
			});

		}).catch(function(error){
			return reject(error);
		});	
	}			
}

insertDept("Automobile Engineering").then(function(rows){
	console.log("Rows inserted "+rows["affectedRows"]);
	console.log("Insertion of department \"Automobile Engineering\" is successfull");
}).catch(function(error){
	console.log(error);
}).finally(function(){
	connection.end();	
});


getDepartments().then(function(rows){	
	for(var i = 0; i < rows.length; i++){		
		console.log("DepartmentId : \'"+rows[i]["deptId"]+"\', DepartmentName \'"+rows[i]["deptName"]+"\'");
	}	
}).catch(function(e){
	console.log(e.stack);
});








