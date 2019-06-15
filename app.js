let express = require('express');  //引入 express 框架
let bodyParser = require('body-parser'); // 引入 body-parser 中间件
var pg = require('pg');
//数据库配置
var conString = "postgres://postgres:123456@localhost/dxm"; //postgres://用户名：密码@localhost/数据库名
var client = new pg.Client(conString);

let axios = require('axios');
let app = express();  // 把 express 实例化

app.use(express.static('public')); // 使用静态文件
app.use(bodyParser.json()); // 使用中间件

client.connect(function (error, results) {
  if (error) {
    console.log('clientConnectionReady Error:' + error.message);
    client.end();
    return;
  }
  console.log('connection success...\n');

  app.get('/get', function (req, res) {
    selectSQLString = "SELECT * FROM job";
    //客户端连接，进行数据插入
    client.query(selectSQLString, function (error, results) {
      console.log(results.rows);
      res.json(results.rows)
    })
  })

  app.post('/article', function (req, res) {  // 新建的路由，以及此路由实现的功能

    var tem = req.body.text;
    //sql语句
    selectSQLString = 'insert into job(title) values (' + tem + ') ';

    client.query(selectSQLString, function (error, results) {
      console.log(results);
    })


  })

  app.post('/article1', function (req, res) {
    var tem = req.body.text1;
    //sql语句
    selectSQLString = 'insert into job(company) values (' + tem + ') ';
    client.query(selectSQLString, function (error, results) {
      console.log(results);
      res.json(results.rows)
    })
  })

});

app.listen(3008, function () { console.log('服务器正在监听 3008 端口') });

// client.connect(function (err) {
//   if (err) {
//     return console.error('could not connect to postgres', err);
//   }

  //删除存在表
  // console.log("Dropping table 'person'")
  // var query = client.query("drop table if exists person");
  // query.on('end', function () {
  //   console.log("Dropped!");
  // });

  //创建表
  // console.log("Creating table 'person'");
  // query = client.query("create table person(id serial, username varchar(10), password varchar(10), age integer)");
  // query.on('end', function () {
  //   console.log("Created!");
  // });

  //添加
  // client.query('INSERT INTO person(username, password, age) VALUES($1, $2, $3)', ["zhangsan", "123456", 20], function (err, result) {
  //   console.log("====================add========================");
  //   if (err) {
  //     console.log(err);
  //     return rollback(client);
  //   }
  //   console.log(result);
  // });


  //查询
  // client.query('select username, password, age from person where id = $1', [3], function (err, result) {
  //   console.log("===================query=========================");
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(result.rows[0]);
  // });

  //更新
  // client.query('update person set password=$1 where id = $2', ["11a", 1], function (err, result) {
  //   console.log("=====================update=======================");
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(result);
  // });

  //删除
  // client.query('delete from person where id = $1', [1], function (err, result) {
  //   console.log("====================remove=======================");
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(result);
  //   client.end();
  // });

// });

// var rollback = function (client) {
//   client.query('ROLLBACK', function () {
//     client.end();
//   });
// };
