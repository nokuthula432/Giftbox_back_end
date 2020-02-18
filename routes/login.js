const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('../conn/conn');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/api',(req,res)=>{

	res.json({message:'welcome to the api'});
  });

  router.post('/apip',(req,res)=>{
	res.json({message: 'post created...'});
   });

   router.post('/apiL',(req,res)=>{
	const user ={
	  fullName :'zamo', 
	  email: 'zamo@gmail.com'
  
	}
	jwt.sign({user},'secretkey',(err,token)=>{
		res.json({
		  token
		});
	  });

	});
	
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
