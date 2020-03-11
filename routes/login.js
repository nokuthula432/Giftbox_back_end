const mysql = require('mysql');
const express = require('express');
var cors = require('cors');
const mysqlConn= require('../conn/conn');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');

// router.get('/api',(req,res)=>{

// 	res.json({message:'welcome to the api'});
//   });

//   router.post('/apip',(req,res)=>{
// 	res.json({message: 'post created...'});
//    });

//    router.post('/apiL',(req,res)=>{
// 	const user ={
// 	  fullName :'zamo', 
// 	  email: 'zamo@gmail.com'
  
// 	}
// 	jwt.sign({user},'secretkey',(err,token)=>{
// 		res.json({
// 		  token
// 		});
// 	  });

// 	});
	
// router.get('/login', function(request, response) {
// 	var username = request.body.username;
// 	var password = request.body.password;
	

// 	if (username && password) {
// 		mysqlConn.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
//             if (results.length > 0) {
// 				//request.session.loggedin = true;
// 				//request.session.username = username;
// 				//response.redirect('#');
// 				response.send('Login succesufully');
// 			} else {
// 				response.send('Incorrect Username and/or Password!');
// 			}			
// 			response.end();   
			
// 		});
// 	} else {
// 		response.send('Please enter Username and Password!');
// 		response.end();
//     }

// });

///////////////////////////////////////////////////
router.post('/login', function(req, res,error) {
	// let username = req.body.username;
	// let password = req.body.password;
    // var role = req.body.role;
    let username = "nokuthula";
	let password = "1234567891";

	const  role = "SELECT * FROM users WHERE  username = '"+username+"'";
	
	mysqlConn.query(role,function(err,results){
		console.log(results);
        if(results[0].role == 1){
				mysqlConn.query(" SELECT * FROM `users` WHERE username = '"+username+"' AND  password = '"+password+"'", function(err, results, fields){		
			if (results.length>0) { 
				jwt.sign({username}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
					res.json({
						token,
					 username:results
					});
				  });
				//   SELECT `id`, `username`, `email`, `contact`, `role`, `password` FROM `users` WHERE role =1
			} 
			else {
				res.send('Incorrect  username and/or password..client.!');
				res.end();
			}			 	
		});
		} 
		if(results[0].role== 2){

			mysqlConn.query(" SELECT * FROM `users` WHERE username = '"+username+"' AND  password = '"+password+"'", function(error, results, fields) {
				if (results.length>0) {
					jwt.sign({username}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
						res.json({
							token,
						 username:results
						});
					  });
					 
				} else {
					res.send('Incorrect  username and/or password..admin.!');
					res.end();
				}	
            })
			  
		} else {
			res.send('Invalid user');
			res.end();
		}	
	});
	/////

	// if (!username || !password ){
	// 	res.send('Please enter all fields');
	// }
	// if (password.length < 6) {
	// 	res.send('Password must be at least 6 characters');
	//   }
	// if ( username && password) 
	// {
	// 	if(role == 1)
	// 	{				
           
	// 	mysqlConn.query(" SELECT * FROM `users` WHERE username = '"+username+"' AND  password = '"+password+"'", function(err, results, fields){		
	// 		if (results.length>0) { 
	// 			jwt.sign({username}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
	// 				res.json({
	// 					token,
	// 				 username:results
	// 				});
	// 			  });
	// 			//   SELECT `id`, `username`, `email`, `contact`, `role`, `password` FROM `users` WHERE role =1
	// 		} 
	// 		else {
	// 			res.send('Incorrect  username and/or password..client.!');
	// 			res.end();
	// 		}			 	
	// 	});
	// 	}
	// 	else if(role == 2 ){
	// 		mysqlConn.query(" SELECT * FROM `users` WHERE username = '"+username+"' AND  password = '"+password+"'", function(error, results, fields) {
	// 			if (results.length>0) {
	// 				jwt.sign({username}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
	// 					res.json({
	// 						token,
	// 					 username:results
	// 					});
	// 				  });
	// 				  res.send('admin.!');
                  
	// 			} else {
	// 				res.send('Incorrect  username and/or password..admin.!');
	// 				res.end();
	// 			}	
    //         })
	// 	}};
});

router.get('/logout', (req, res) => {
	req.logout();
	req.flash('You are logged out');
	res.redirect('/login');
  });

module.exports = router;
