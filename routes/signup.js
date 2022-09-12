var express = require('express');
var mysql = require('mysql2/promise');
const dbconfig = require('../config/database.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/signup',async function(req,res,next) {
    console.log(req.body);
    const params = [req.body.id, req.body.pwd, req.body.pwdCheck, req.body.name, req.body.email];
    console.log(params);
    if (params[1] == params[2]) {
      const connection = await mysql.createConnection(dbconfig);
      const queryChecker = "select count(*) AS cnt from user_info where uid=?";
      let [row, field] = await connection.query(queryChecker,[params[0]]);
      console.log(row);
      if (row[0].cnt == 1) {
        res.write("<script>alert('same ID');</script>");
        res.write("<script>window.location=\"/signup\"</script>");
      } else {
        const query = "insert into user_info (uid,pwd,email,name,date) values(?,?,?,?,now())";
        console.log(query);
        let result = await connection.query(query,[params[0],params[1],params[4],params[3]]);
        console.log(result);
        res.write("<script>alert('OK');</script>");
        res.write("<script>window.location=\"/main\"</script>");
      }
    } else {
      res.write("<script>alert('Check PWD');</script>");
      res.write("<script>window.location=\"/signup\"</script>");
    }
})

module.exports = router;
