var express = require('express');
var mysql = require('mysql2/promise');
const dbconfig = require('../config/database.js');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/main');
    } else {
        const connection = await mysql.createConnection(dbconfig);
        const user_order_query = "select user_info.uid, o.price, o.order_id, m.name from user_info inner join `order` o on user_info.id = o.member_id inner join menu m on o.menu_id = m.menu_id where user_info.uid=?";
        const order_option_query = "select option_name from order_option inner join `option` on order_option.option_id = `option`.option_id where order_option.order_id=?";

        var [user_rows, field] = await connection.execute(user_order_query,[req.session.user.uid]);
        let order_result_arr = [];
        for (var i = 0; i < user_rows.length; i++) {
            let orderResult = {
                order_id: user_rows[i].order_id,
                name: user_rows[i].name,
                uid: user_rows[i].uid,
                price: Number(user_rows[i].price),
                options: []
            }
            var [order_rows, field] = await connection.execute(order_option_query,[user_rows[i].order_id]);
            for (var j = 0; j < order_rows.length; j++) {
                orderResult.options.push(order_rows[j].option_name);
            }
            order_result_arr.push(orderResult);
        }
        
        console.log(user_rows);
        console.log(order_rows);
        console.log(order_result_arr);

        res.render('mypage',{user: req.session.user, order_result_arr: order_result_arr});
    }
});

module.exports = router;
