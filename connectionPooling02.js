var mySql = require("mysql");
var Promise = require("promise");

var pool = mySql.createPool({
	host : "localhost",
	user : "root",
	password : "rahul",
	database : "testDb", //schema	
	connectionLimit : 13, // at a time 13 connection be created in pool
});

function getDepartments(){
	return new Promise(fn);

	function fn(resolve,reject){
		pool.getConnection(function(err,con){
			if(err){
				return reject(err);
			}else{
				con.query("select * from departmentTbl",function(err,rows){
					if(err){
						return reject(err);
					}else{
						con.release(); // releasing connection to pool
						return resolve(rows);
					}
				});	
			}
		}); // getConnection
	}// fn
} // getDepartments

getDepartments().then(function(rows){
	console.log(rows);	
}).catch(function(err){
	console.log(err);
}).done(function(){
	pool.end();	// closing all connections in pool
});