const mysql = require('mysql');
const express = require('express');
const app = express();
var session = require('express-session');
const jwt = require('jsonwebtoken')
var cors = require('cors')
const mysqlConn= require('../conn/conn');
const bodyParser = require('body-parser');
const router = express.Router();


app.use(bodyParser.json());
app.use(cors());



router.post('/login', function(req, res, error) {

	
	  let username = "lethum";
      let password ="147258369";
      var role = "1";

	if (username && password) {
	
	if (password.length < 9) {
	 res.send('Password must be at least maximu of 9 characters')
	}
	
		if (role == 1) {
			mysqlConn.query('SELECT * FROM users WHERE username = "' + username +'" AND password = "' + password +'" ', function(error, results) {
				if (results.length > 0) { 
					jwt.sign({username}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
						res.json({
							token,
						 username:results
						})
					  });	
				} 
				else {
					res.send('Incorrect  username and/or password...!');
					console.log('incorrect pass or username.....');
					
				}  
				
			});
		} else {
			res.send('admin section');
		}
	

	
	} else {
		res.send('Please enter Username and Password!');
		res.end();
    }

});



module.exports = router ;
