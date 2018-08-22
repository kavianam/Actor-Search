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

router.get('/:id', function(req, res, next) {
    let w = new Date().getTime();
    while (w + 1000 > new Date().getTime()){
        //
    }
    // connection.query('select film_info from (select CONCAT(first_name,last_name) as fullName, film_info from actor_info) as t1 WHERE t1.fullName like ?',[req.params.id + '%'] , (error,result,fields) => {
    connection.query('select film_info from actor_info where actor_id = ?',[req.params.id] , (error,result,fields) => {
        if (error) throw error;
        // res.render('actor', {sql: JSON.stringify(result)});
        // res.json(result);
        res.json(result[0]);
    });
});

module.exports = router;