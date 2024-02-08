var https = require('https');
var fs = require('fs');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
const cors = require("cors");
//s
var express = require('express');
var mysql = require("mysql")
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
const http = require('http');

var app = express();

app.use(require('body-parser').json());

app.use(require('body-parser').urlencoded({ extended: false }));

app.use(cookieParser('secret'));


var userLogged = null

const allowedOrigins = ['https://lseo.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//app.use(cors(corsOptions));
//old connection
var connection = mysql.createConnection({
		host: '162.240.147.30',
		user: 'knowtheada_kaseem',
		password: 'Ae71237!Ae71237!',
		database: 'knowtheada_lseompusers'
	})
	
	/*
var connection = mysql.createConnection({
		host: '82.197.92.124',
		user: 'minesrv475151hst_kaseem',
		password: 'Ae71237!Ae71237!',
		database: 'minesrv475151hst_lseompusers'
	})
	
	*/
	
	
app.get('/', function (req, res) {
	

  res.send('Hello World!');
});
//start herre today kaseem


app.post('/login', function (req, res) {
	var username = req.body.username
	var password = req.body.password
	redirectUrl ='https://lseo.com/?page_id=82143&preview=true&user='+username
    res.redirect(redirectUrl)
});
function insertAccessToken(tt,uu){
    query = "INSERT INTO tokens (token, username) VALUES ('"+tt+"', "+"'"+uu+"')"

	return connection.query(query, (err, rows) => { 
		if (err) throw err; 
	  console.log('The user is: ', rows[0]);


	 // return rows[0]

	}); 

}

app.get('/login/:username/:password/', function (req, res) {
	console.log("Logging in")
	var username = req.params.username
	var password = req.params.password
	query = "SELECT * FROM totallynotusersinfo WHERE username" + " = '"+username+"' AND password"+" = '"+password+"'"

	return connection.query(query, (err, rows) => { 
		if (err) throw err; 
	  console.log('The user is: ', rows[0]);
	  if(rows[0] ===  undefined){
	      res.send("invalid")
	  }else{
	      token = "access"
	      token = "valid"+token
	      insertAccessToken(token,username)
	      res.send(token);
	  }
	    

	 // return rows[0]

	}); 
//redirectUrl ='https://lseo.com/lseompapimdi/?user='+username

   // res.redirect(redirectUrl)

	/*  let options = {
        maxAge: 1000 * 60 * .45, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: true // Indicates if the cookie should be signed
    }

    // Set cookie
    res.cookie('user', 'kkkk', options) 
*/
	  //res.json(req.body);
});

app.get('/logout', function (req, res) {
  res.send('Logged Out');
});
app.get('/getToken/:usernamee', function (req, res) {
    console.log("getting token")
			var username = req.params.usernamee


	query = "SELECT * FROM tokens WHERE token" + " = '"+username+"'"

	return connection.query(query, (err, rows) => { 
		if (err) throw err; 
	  console.log('The user is: ', rows[0]);

	    res.send(rows[0]);

	 // return rows[0]

	}); 

	//var user = getUserDirectFromUserTable(username)
 // res.send(user);
});

app.get('/delToken/:usernamee', function (req, res) {
			var username = req.params.usernamee


	query = "DELETE FROM tokens WHERE token" + " = '"+username+"'"

	return connection.query(query, (err, rows) => { 
		if (err) throw err; 
	  console.log('The user is: ', rows[0]);

	    res.send(rows[0]);

	 // return rows[0]

	}); 

	//var user = getUserDirectFromUserTable(username)
 // res.send(user);
});
app.get('/username/:usernamee', function (req, res) {
			var username = req.params.usernamee


	query = "SELECT * FROM totallynotusersinfo WHERE username" + " = '"+username+"'"

	return connection.query(query, (err, rows) => { 
		if (err) throw err; 
	  console.log('The user is: ', rows[0]);

	    res.send(rows[0]);

	 // return rows[0]

	}); 

	//var user = getUserDirectFromUserTable(username)
 // res.send(user);
});
app.get('/orders/:usernamee/', function (req, res) {
		var username = req.params.usernamee
;
	query = "SELECT * FROM registeredUserOrders WHERE username" + " = '"+username+"'"

	return connection.query(query, (err, rows) => { 
		if (err) throw err; 
	  console.log('The user is: ', rows);

	    res.json(rows);

	 // return rows[0]

	}); 

	//var user = getUserDirectFromUserTable(username)
 // res.send(user);
});
app.get('/tickets/:usernamee/', function (req, res) {
		var username = req.params.usernamee
;
	query = "SELECT * FROM registeredUserTickets WHERE username" + " = '"+username+"'"

	return connection.query(query, (err, rows) => { 
		if (err) throw err; 
	  console.log('The user is: ', rows);

	    res.json(rows);

	 // return rows[0]

	}); 

	//var user = getUserDirectFromUserTable(username)
 // res.send(user);
});
app.get('/updateName/:idd/:fn/:ln', function (req, res) {
		var username = req.params.usernamee
;
	//query = "SELECT * FROM totallynotusersinfo WHERE " + " = '"+idd+"'"
query = "UPDATE totallynotusersinfo SET firstname" + " = '"+req.params.fn+"'"+", lastname" + " = '"+req.params.ln+"'"+" WHERE id"+ " = '"+req.params.idd+"'"

	return connection.query(query, (err, rows) => { 
		if (err) throw err; 
	  //console.log('The user is: ', rows[0]);

	    res.send(rows[0]);

	 // return rows[0]

	}); 


});
app.get('/updateEmail/:idd/:emaill', function (req, res) {
		var username = req.params.usernamee

query = "UPDATE totallynotusersinfo SET email" + " = '"+req.params.emaill+"' WHERE id" + " = '"+req.params.idd+"'";


	return connection.query(query, (err, rows) => { 
		if (err) throw err; 
	  //console.log('The user is: ', rows[0]);

	    res.send(rows[0]);

	 // return rows[0]

	}); 


});
app.get('/updatePhoneNumber/:idd/:pn', function (req, res) {
		var username = req.params.usernamee

query = "UPDATE totallynotusersinfo SET phonenumber" + " = '"+req.params.pn+"' WHERE id" + " = '"+req.params.idd+"'";


	return connection.query(query, (err, rows) => { 
		if (err) throw err; 
	  //console.log('The user is: ', rows[0]);

	    res.send(rows[0]);

	 // return rows[0]

	}); 


});


app.get('/createTicket/:subjectt/:descriptionn/:usernamee', function (req, res) {
		var username = req.params.usernamee
		var subject = req.params.subjectt
		var description = req.params.descriptionn
		var stat = "OPEN"
var query = "INSERT INTO registeredUserTickets (username, subject, description, status) VALUES (" + "'" +username+"', "+"'" +subject+"', "+"'" +description+"', "+"'" +stat+"')";



	return connection.query(query, (err, rows) => { 
		if (err) throw err; 
	  //console.log('The user is: ', rows[0]);

	    res.send(rows[0]);

	 // return rows[0]

	}); 


});



app.post('/createAccountFromSubscriptionPurchase', function (req, res) {
	//console.log(req.param("usermame"))

	var date = new Date(); // Now
    date.setDate(date.getDate() + 30);
    date = date.toString() // Set now + 30 days as the new date
    date = date.split(" ")



    var username = req.body.username
	var email = req.body.email
	var password = req.body.password



	var awSubscription = req.body.subscription
	var subscrExpr = date[2] + ","+date[1]+" "+date[3]
	var subscription = ""
	var subscrDes
	if(awSubscription.indexOf("999.99") >= 0) { subscription = "Content Pro"}
	if(awSubscription.indexOf("999.99") >= 0) { subscrDes = "5 articles; 750 words each. Comes with... Recommended meta title and meta description. Up to 3 target words per article. Up to 3 internal links per article.Up to 2 edits per article. Delivered within 3 business days or less"}


	
	


	createAccountFromSubscriptionPurchase(username,email,password,subscrExpr,subscription,subscrDes)



  res.json(req.body);
});
app.post('/cAFS',function(req,res){
    console.log("CAFS")
    
    
      res.json(req.body);

})











function createAccountFromSubscriptionPurchase(username,email,password,subscrExpr,subscription,subscrDes){
	console.log("Function called")
	var fillerInfoForNow = "Not Sure About This Yet"
	var fillerInfoForNowInJson = '{"value":"Not Sure About This Yet"}'
	
	connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  // Function to insert single row values in 
// the database 
 console.log('Connected to the MySQL server.');

let singleRowInsert = () => { 
	console.log("Adding New User To Database")

	let query = "INSERT INTO totallynotusersinfo (username, email, password, subscr, subscrType, subscrStart, subscrExpr,orders,tickets,invoices,perks,subscrDes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"; 

	// Value to be inserted 
	
	// Creating queries 
	connection.query(query, [username,email,password,subscription,subscription,fillerInfoForNow,subscrExpr,fillerInfoForNowInJson,fillerInfoForNowInJson,fillerInfoForNowInJson,fillerInfoForNow,subscrDes], (err, rows) => { 
		if (err) throw err; 
		console.log("Row inserted with id = "
			+ rows.insertId); 
	}); 
};
singleRowInsert()
});
}


/*var httpsServer = https.createServer(credentials, app);
httpsServer.listen(4200, () => {
  console.log("server starting on port :4200 ")
});*/
app.listen(4200, function () {
  console.log('Example app listening on port 4200!');
});


