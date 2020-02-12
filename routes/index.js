const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('../conn/conn');
const bodyParser = require('body-parser');
const router = express.Router();


app.use(bodyParser.json());
app.use(cors());





router.post('/add_to_cart', (req, res) => {

    // box id, name and price

    let product = {
        id: 0002, name: bestgiftbox,
        price: $21
    };

    //inserting cart to cart table
    
    mysqlConn.query('insert into cart set ?', [name], (err, results) => {
        if (err) { 
            throw err }

        else {
            return res.send({ data: results, message: 'holla holla'})
        }
    })

});

module.exports = router;
