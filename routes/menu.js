var express = require('express');
var mysql = require('mysql2/promise');
const dbconfig = require('../config/database.js');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    const connection = await mysql.createConnection(dbconfig);
    const query = "select title, url from category where level = ? and parent = ?";
    var [firstRows,field] = await connection.execute(query,[1,-1]);
    var [squareRows,field] = await connection.execute(query,[2,1]);
    var [bowlRows,field] = await connection.execute(query,[2,2]);
    var [premiumRows,field] = await connection.execute(query,[2,3]);

    firstRows[0].next = squareRows;
    firstRows[1].next = bowlRows;
    firstRows[2].next = premiumRows;
    // for (var i = 0; i < 3; i++) {
    //     console.log(firstRows[i]);
    // }

    var menuQuery = "select * from menu order by price"
    var [menuData, field] = await connection.execute(menuQuery);
    //console.log(menuData);
    res.render('menu',{user: req.session.user, firstRows: firstRows, menuData: menuData});
});

router.get('/:name', async function(req, res) {
    const connection = await mysql.createConnection(dbconfig);
    
    const query = "select * from menu where name=?";
    var [rows, field] = await connection.execute(query,[req.params.name]);
    var [optionRows,field] = await connection.query("select * from `option`");
    console.log(rows[0]);
    console.log(optionRows);
    if (req.session.user) {
        res.render('menu_inspect',{headerUser: req.session.user,user:req.session.user,foodData: rows[0],options:optionRows});
    } else {
        res.render('menu_inspect',{headerUser:null,user: {uid:null},foodData: rows[0],options:optionRows});
    }
    
});

router.get('/category/:category', async function(req, res) {
    console.log(req.params.category);
    const connection = await mysql.createConnection(dbconfig);
    const query = "select title, url from category where level = ? and parent = ?";
    var [firstRows,field] = await connection.execute(query,[1,-1]);
    var [squareRows,field] = await connection.execute(query,[2,1]);
    var [bowlRows,field] = await connection.execute(query,[2,2]);
    var [premiumRows,field] = await connection.execute(query,[2,3]);

    firstRows[0].next = squareRows;
    firstRows[1].next = bowlRows;
    firstRows[2].next = premiumRows;
    // for (var i = 0; i < 3; i++) {
    //     console.log(firstRows[i]);
    // }
    var menuQuery = "select * from menu where menu.category_id=(select category_id from category where url='"+req.params.category+"')";
    var [menuData, field] = await connection.execute(menuQuery);
    console.log(menuData);
    res.render('menu',{user: req.session.user, firstRows: firstRows, menuData: menuData});
})

router.post('/order', async function(req,res) {
    const connection = await mysql.createConnection(dbconfig);
    console.dir(req.body.options);

    const user_query = "select * from user_info where uid = ?";
    const order_query = "insert into `order`(member_id, menu_id,price) values(?,?,?)";
    const order_option_query = "insert into order_option(order_id, option_id) values(?,?)";

    var [rows, field] = await connection.query(user_query,[req.body.user]);
    const menu_id = req.body.menu_id;
    const user_id = rows[0].id;
    const price = req.body.price;
    var result = await connection.query(order_query,[user_id,Number(menu_id),price]);

    var [id,field] = await connection.query("select last_insert_id() as id");
    const order_id = id[0].id;
    const options = req.body.options;

    if (options) {
        for(var i = 0; i < options.length; i++) {
            var result = await connection.query(order_option_query,[order_id,options[i].option_id]);
        }
    }
    res.json(req.body);
});

module.exports = router;
