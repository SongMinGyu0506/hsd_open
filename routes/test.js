var express = require('express');
var mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user) {
    console.log("user 존재함");
    res.render('main',{user: req.session.user});
  } else {
    connection.query('select * from user_info',(error,rows) => {
      if (error) throw error;
      console.log(rows[0].id);
    })
    console.log("user 존재하지 않음");
    res.render('main',{user:null});
  }
});

module.exports = router;