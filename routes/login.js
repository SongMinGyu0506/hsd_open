var express = require('express');
var mysql = require('mysql2/promise');
const dbconfig = require('../config/database.js');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/login', async function(req,res,next) {
    const connection = await mysql.createConnection(dbconfig);
    const id = req.body.id;
    const pwd = req.body.pwd;
    let checker = 0;
    const query = 'select count(*) AS cnt from user_info where uid = ? and pwd = ?';
    const [rows,field] = await connection.execute(query,[id,pwd]);
    checker = rows[0].cnt;
    if (checker == 1) {
      req.session.user = {
        uid: id,
        isLogined: true
      };
      req.session.save(function(){   
        connection.end();                            (2)
        res.redirect('/main');
    });
    } else {
      res.write("<script>alert('Check ID and PWD');</script>");
      res.write("<script>window.location=\"/login\"</script>");
    }
});

router.get('/logout', async function(req, res) {
  var session = req.session;
  console.log(session.user);
    try {
        if (session.user) { //세션정보가 존재하는 경우
            await req.session.destroy(function (err) {
                if (err)
                    console.log(err)
                else {
                  res.write("<script>window.location=\"/main\"</script>");
                }
            })
        }
    }
    catch (e) {
      console.log(e)
    }
    res.write("<script>window.location=\"/main\"</script>");
});

router.post('/pwdChange', async function(req, res) {
  const user_query = "update user_info set pwd = ? where uid = ?";
  const connection = await mysql.createConnection(dbconfig);

  if (req.body.pwd == "") {
    res.write("<script>alert('Input PWD');</script>");
    res.status(202).json({status: 'error'});
  } else {
    var result = await connection.execute(user_query,[req.body.pwd,req.session.user.uid]);
    await req.session.destroy();
    res.json({status: 'success'});
  }
});

module.exports = router;
