const express = require('express');
const router = express.Router();
const  mysqlConn= require('../conn/conn');
const { check, validationResult } = require('express-validator');


router.post('/register', function (req, res) {

    let post = ({   /*id:req.body.id,
                    username:req.body.username,
                    email:req.body.email,
                    contact:req.body.contact, 
                    role:req.body.role,
                    password:req.body.password*/
                    id:21,
                    username:"Bu",
                    email:"B3@gmail.com",
                    contact:"0987654324", 
                    role:"client",
                    password:"12345678"

                });

            //    var password =req.body.password;
            //    var  confPassword = req.body.confPassword;
               var password="12345678";
               var  confPassword =  "12345678";

               var email ="B3@gmail.com";
               mysqlConn.query("SELECT * FROM users WHERE email = ? ",[email], function (error, results, fields) {
                   if (results) 
                   return res.send({status:200,
                                    data: results,
                                    message: 'Sorry, user already exists' })
                    else{
                        if (!post){
                            res.send({ msg: 'Please enter all fields' });
                            res.end();
                        }
                        var user = post;
                          
                        if (confPassword == password) {
                
                            if (user.password.length > 7) {
                
                                bcrypt.hash(user.password, 10, function(err, hash){
                                    if(err) console.log(err);
                                    user.password = hash;

                                    mysqlConn.query("INSERT INTO users SET ? ",[user], function (error, results, fields) {
                                        if (error) throw error;
                                        return res.send({status:200, data: results, message: 'New user has been created successfully.' });
                                        });
                                    })
                           
                           
                            } else {
                                res.send("passowrd length too small")
                            }       
                        } else {
                            res.send("password doesn't match")
                        }
                    }
                   });
                   
});


module.exports = router;
