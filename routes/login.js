const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const app = express();


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
