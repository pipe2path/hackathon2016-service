// require the restify library.
var restify = require('restify');
// sql server library
var mysql = require('mysql');
// create an HTTP server.
server = restify.createServer();
// add a route that listens on http://localhost:5000/hello/world
server.get('/status', function (req, res, cb) {

	//var config = {
	//	user: 'skatingclass',
	//	password: 'Skating1!',
	//	server: 'skatingclass.db.2259289.hostedresource.com',
	//	database:'skatingclass'
	//};
    //
  	//sql.connect(config, function(err){
  	//	var query_str = "select c.Id, s.Name as Title, c.StartDateTime, c.EndDateTime, c.StudentId from Class c " +
  	//				 "inner join Student s on c.StudentId = s.StudentId";
  	//	var request = new sql.Request();
    //
	//	request.query(query_str, function(err, recordset){
    //
	//		if (err) console.log(err)
    //
	//		res.send(recordset);
   	//	})
  	//})

	var connection = mysql.createConnection({
		host     : 'hackathon2016.db.2259289.hostedresource.com',
		user     : 'hackathon2016',
		password : 'SusDevKev1!',
		database : 'hackathon2016'
	});

	connection.connect();
	var sql_query = "select * from BathroomStatus bs inner join Bathroom b on bs.bathroomId = b.bathroomId inner join Floor f " +
				"on b.floorId = f.floorId inner join Gender g on g.genderId = b.genderId ";
	connection.query(sql_query, function(err, rows, fields) {
		if (err) throw err;

		res.send(rows);
	});
});


server.listen(process.env.PORT || 5000, function () { // bind server to port 5000.
  console.log('%s listening at %s', server.name, server.url);
});
