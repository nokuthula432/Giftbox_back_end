const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('../conn/conn');
const bodyParser = require('body-parser');
const router = express.Router();


app.use(bodyParser.json());
app.use(cors());



router.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		mysql.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length() > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();   
			
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
    }

});


module.exports = router ;
