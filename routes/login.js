const express = require('express');
const router = express.Router();
const  mysqlConn= require('../conn/conn');
var session = require('express-session');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.post('/login', function(req, res,error) {
	// let username = req.body.username;
	// let password = req.body.password;
    // var role = req.body.role;
    let username = "lindo";
	let password = "12345678";
	var role = 1;
	

	if (!username || !password ){
		res.send({ msg: 'Please enter all fields' });
	}
	if (password.length < 6) {
		res.send({ msg: 'Password must be at least 6 characters' });
	  }
	if ( username && password) 
	{
		if(role == 1)
		{				
           
		mysqlConn.query(" SELECT * FROM `users` WHERE username = '"+username+"' AND  password = '"+password+"'", function(err, results, fields){		
			if (results.length>0) { 
				jwt.sign({username}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
					res.json({
						token,
					 username:results
					});
                  });
			} 
			else {
				res.send('Incorrect  username and/or password..client.!');
				res.end();
			}			 	
		});
		}
		else if(role == 2 ){
			mysqlConn.query(" SELECT * FROM `users` WHERE username = '"+username+"' AND  password = '"+password+"'", function(error, results, fields) {
				if (results.length>0) {
					jwt.sign({username}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
						res.json({
							token,
						 username:results
						});
                      });
                      res.send('logged in as a admin');

				} else {
					res.send('Incorrect  username and/or password..admin.!');
					res.end();
				}	
            })
		}};
});
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/login');
  });

module.exports = router;