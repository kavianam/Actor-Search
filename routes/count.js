const express    = require('express');
const router     = express.Router();
const mysql      = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '33332526',
    database : 'sakila'
});
connection.connect();

router.get('/:lastName', function(req, res, next) {
    connection.query('select COUNT(*) as tedad from actor where last_name like ?', [req.params.lastName + "%"] , (error,result,fields) => {
        if (error) throw error;
        res.json(result[0]);
    });
});

module.exports = router;