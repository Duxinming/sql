let express = require('express');  //引入 express 框架
let bodyParser = require('body-parser'); // 引入 body-parser 中间件
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
let XLSX = require('xlsx'); // 引入解析模块
// const workbook = XLSX.readFile('工作簿1.xlsx');
var pg = require('pg');
//数据库配置
var conString = "postgres://postgres:123456@localhost/dxm"; //postgres://用户名：密码@localhost/数据库名
var client = new pg.Client(conString);

let axios = require('axios');
let app = express();  // 把 express 实例化

app.use(express.static('public')); // 使用静态文件
app.use(bodyParser.json()); // 使用中间件

var storage = multer.diskStorage({
  //设置上传后文件路径
  destination: function (req, file, cb) {
    cb(null, './')
  },
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});
//添加配置文件到multer对象。
var upload = multer({
  storage: storage
});
app.post('/upfile', function (req, res) {
  console.log(req)
})

//链接数据库
// client.connect(function (error, results) {

//   console.log('connection success...\n');

//   app.get('/get', function (req, res) {
//     // 获取 Excel 中所有表名
//     const sheetNames = workbook.Sheets; // 返回 ['sheet1', 'sheet2']
//     // 根据表名获取对应某张表
//     const worksheet = workbook.Sheets.sheets;
//     const headers = {};
//     const data = [];
//     const keys = Object.keys(worksheet);



//     if (req.query.type !== '1') {
//       selectSQLString = "SELECT * FROM work";
//       //客户端连接，进行数据查询
//       client.query(selectSQLString, function (error, results) {
//         res.json(results.rows)
//       })
//     }
//     if (req.query.type === '1') {
//       keys
//         // 过滤以 ! 开头的 key
//         .filter(k => k[0] !== '!')
//         // 遍历所有单元格
//         .forEach(k => {
//           // 如 A11 中的 A
//           let col = k.substring(0, 1);
//           // 如 A11 中的 11
//           let row = parseInt(k.substring(1));
//           // 当前单元格的值
//           let value = worksheet[k].v;

//           // 保存字段名
//           if (row === 1) {
//             headers[col] = value;
//             return;
//           }

//           // 解析成 JSON
//           if (!data[row]) {
//             data[row] = {};
//           }
//           data[row][headers[col]] = value;
//         });
//       if (error) {
//         console.log('clientConnectionReady Error:' + error.message);
//         client.end();
//         return;
//       }
//       selectSQLString = "SELECT * FROM work";
//       client.query(selectSQLString, function (error, results) {
//         data.shift()
//         data.shift()
//         res.json(data)
//       })
//     }
//   })

//   app.post('/article', function (req, res) {  // 新建的路由，以及此路由实现的功能

//     var tem = req.body.arr;
//     let name = tem.name
//     let college = tem.college
//     let gender = tem.gender
//     let clas = tem.class
//     let age = tem.age
//     let studentid = tem.studentid
//     let _id = tem._id
//     selectSQLString = "INSERT INTO work(_id, name, college, gender, studentid, age, class) VALUES (" + _id + ",'" + name + "','" + college + "','" + gender + "','" + studentid + "','" + age + "','" + clas + "')";

//     client.query(selectSQLString, function (error, results) {
//       if (error) {
//         console.log(error)
//       } else {
//         console.log('成功了');
//       }
//     })
//     //sql语句

//   })

//   app.post('/delete', function (req, res) {
//     var tem = req.body.arr;
//     //sql语句
//     tem.forEach(element => {
//       let _id = element._id
//       selectSQLString = "DELETE FROM work WHERE _id =" + "'" + _id + "'";
//       client.query(selectSQLString, function (error, results) {
//         if (error) {
//           console.log('失败了')
//         } else {

//           console.log('成功了');
//         }

//       })
//     });

//   })

//   app.post('/update', function (req, res) {
//     var tem = req.body.arr;

//     tem.forEach(element => {
//       let name = element.name
//       let college = element.college
//       let gender = element.gender
//       let clas = element.class
//       let age = element.age
//       let studentid = element.studentid
//       var _id = element._id;
//       //sql语句
//       selectSQLString = "UPDATE work SET name = " + "'" + name + "'" + ", college = " + "'" + college + "'" + ", gender = " + "'" + gender + "'" + ", studentid=" + "'" + studentid + "'" + ", age=" + "'" + age + "'" + ", class=" + "'" + clas + "'" + " WHERE _id =" + "'" + _id + "'";
//       client.query(selectSQLString, function (error, results) {
//         if (error) {
//           console.log(error)
//         } else {

//           console.log('成功了');
//         }

//       })
//     });

//   })

// });

app.listen(3008, function () { console.log('服务器正在监听 3008 端口') });