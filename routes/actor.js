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

router.get('/:lastName&:page', function(req, res, next) {
    let w = new Date().getTime();
    while (w + 1000 > new Date().getTime()){
        //
    }
    connection.query('select * from actor where last_name like ? LIMIT ?, 5', [req.params.lastName + "%", Number(req.params.page)] , (error,result,fields) => {
        if (error) throw error;
        res.json(result);
    });
});

module.exports = router;