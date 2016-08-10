/*
	DEMONSTRATION OF USING NODE JS WITH DATABASE MYSQL.
*/


var mySql = require("mysql");

var connection = mySql.createConnection({
	host : "localhost",
	user : "root",
	password : "rahul",
	database : "testDb" //schema
});


// Testing Connection
 
connection.connect(function(err){
	if(err){
		console.log("Error while connecting "+err.stack);
	}

	console.log("Connected as id "+connection.threadId);
});

connection.end();


