


// require the restify library.
var restify = require('restify');
// sql server library
var mysql = require('mysql');
// create an HTTP server.
server = restify.createServer();
// add a route that listens on http://localhost:5000/hello/world

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.get('/status/:id', function (req, res, cb) {

	var connection = getConnection();
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

server.get('/cleaningstatus/:id', function (req, res, cb) {

	var connection = getConnection();
	connection.connect();
	var sql_query = "select bathroomcleaningstatusid, bathroomId, crewid, status, cleaningTime " + 
			"from BathroomCleaningStatus bcs where bathroomId = " + req.params.id;
	connection.query(sql_query, function(err, rows, fields) {
		if (err) throw err;
		res.send(rows);
	});
});

// get bathroom info from floor and gender
server.get('/bathroom/', function (req, res, cb) {

	var connection = getConnection();
	connection.connect();
	var sql_query = "select bathroomId, floorId, genderId from Bathroom " +
		"where floorId = " + req.params.floorId + " and genderId = " + req.params.genderId;
	connection.query(sql_query, function(err, rows, fields) {
		if (err) throw err;
		res.send(rows);
	});
});

server.post('/update', function(req, res, cb){
	var connection = getConnection();
	connection.connect();

	var statusData = {};
	//statusData.id = req.body.id;
	//statusData.status = req.body.status;
	statusData.id = req.params.id;
	statusData.status = req.params.status;
	var datetimestamp = (new Date()).toISOString().substring(0, 19).replace('T', ' ').toLocaleString();

	res.setHeader('Access-Control-Allow-Origin','*');

	var sql_query = "insert into BathroomStatus (bathroomId, status, datetimestamp) values (" + statusData.id + ", " + statusData.status +  ", '" + datetimestamp + "')";
	connection.query(sql_query, function(err, rows, fields) {
		if (err) throw err;
		res.send("updated");
	});
})

server.post('/updatecleaning', function(req, res, cb){
	var connection = getConnection();
	connection.connect();

	var statusData = {};
	statusData.id = req.params.id;
	statusData.status = req.params.status;

	res.setHeader('Access-Control-Allow-Origin','*');

	var sql_query = "update BathroomCleaningStatus set bathroomId = " + statusData.id + ", status = " + statusData.status;
	connection.query(sql_query, function(err, rows, fields) {
		if (err) throw err;
		res.send("updated");
	});
})


function getConnection(){
	var connection = mysql.createConnection({
		host     : 'hackathon2016.db.2259289.hostedresource.com',
		user     : 'hackathon2016',
		password : 'SusDevKev1!',
		database : 'hackathon2016'
	});
	return connection;
}


server.listen(process.env.PORT || 5000, function () { // bind server to port 5000.
	console.log('%s listening at %s', server.name, server.url);
});
