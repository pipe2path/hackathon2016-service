// require the restify library.
var restify = require('restify');
// sql server library
var sql = require('mssql');
// create an HTTP server.
server = restify.createServer();
// add a route that listens on http://localhost:5000/hello/world
server.get('/status', function (req, res, cb) {

	var config = {
		user: 'skatingclass',
		password: 'Skating1!',
		server: 'skatingclass.db.2259289.hostedresource.com',
		database:'skatingclass'
	};

  	sql.connect(config, function(err){
  		var query_str = "select c.Id, s.Name as Title, c.StartDateTime, c.EndDateTime, c.StudentId from Class c " +
  					 "inner join Student s on c.StudentId = s.StudentId";
  		var request = new sql.Request();

		request.query(query_str, function(err, recordset){

			if (err) console.log(err)

			res.send(recordset);
   		})
  	})
});


server.listen(process.env.PORT || 5000, function () { // bind server to port 5000.
  console.log('%s listening at %s', server.name, server.url);
});
