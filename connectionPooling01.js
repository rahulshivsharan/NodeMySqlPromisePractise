var mySql = require("mysql");

var pool = mySql.createPool({
	host : "localhost",
	user : "root",
	password : "rahul",
	database : "testDb", //schema	
	connectionLimit : 13, // at a time 13 connection be created in pool
});

pool.getConnection(getDepartments);

function getDepartments(err,con){
	con.query("select * from departmentTbl",fn);

	function fn(err,rows){
		if(err){
			console.log(err);
		}else{
			console.log(rows);
		}

		con.release();
	}
}