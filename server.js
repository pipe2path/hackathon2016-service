// require the restify library.
var restify = require('restify');
// sql server library
var mysql = require('mysql');
// create an HTTP server.
server = restify.createServer();
// add a route that listens on http://localhost:5000/hello/world
server.get('/status/:floor', function (req, res, cb) {

	var connection = mysql.createConnection({
		host     : 'hackathon2016.db.2259289.hostedresource.com',
		user     : 'hackathon2016',
		password : 'SusDevKev1!',
		database : 'hackathon2016'
	});

	connection.connect();
	var sql_query = "select bs.status from BathroomStatus bs inner join Bathroom b on bs.bathroomId = b.bathroomId inner join Floor f " +
				"on b.floorId = f.floorId inner join Gender g on g.genderId = b.genderId where b.floorId = " + req.params.floor ;
	connection.query(sql_query, function(err, rows, fields) {
		if (err) throw err;
		res.send(rows);
	});
});

server.listen(process.env.PORT || 5000, function () { // bind server to port 5000.
  console.log('%s listening at %s', server.name, server.url);
});
