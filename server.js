// require the restify library.
var restify = require('restify');
// sql server library
var mysql = require('mysql');
// create an HTTP server.
server = restify.createServer();
// add a route that listens on http://localhost:5000/hello/world
server.get('/status/:id', function (req, res, cb) {

	var connection = mysql.createConnection({
		host     : 'hackathon2016.db.2259289.hostedresource.com',
		user     : 'hackathon2016',
		password : 'SusDevKev1!',
		database : 'hackathon2016'
	});

	connection.connect();
	var sql_query = "select bathroomId, datetimestamp, status from BathroomStatus bs " +
					"where datetimestamp = (select max(datetimestamp) " +
					"from BathroomStatus bs2 " +
					"where bs.bathroomId = bs2.bathroomId) and bs.bathroomId = " + req.params.id ;
	connection.query(sql_query, function(err, rows, fields) {
		if (err) throw err;
		res.send(rows);
	});
});

server.listen(process.env.PORT || 5000, function () { // bind server to port 5000.
  console.log('%s listening at %s', server.name, server.url);
});
