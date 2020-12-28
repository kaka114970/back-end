//userApi.js
var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

//普通用户登录接口 done
router.post('/loginUser', (req, res) => {
  var sql = $sql.user.login;
  var params = req.body;
  var obj = {};
  conn.query(sql, [params.phone, params.password], function (err, result) {
    if (err) {
      res.json({
        status: 1,
        msg: "用户名或者密码错误"
      });
    }
    if (result.length) {
      obj = result[0];
      //console.log(result);
      //res.send(result);
      res.json({
        status: 0,
        msg: "登录成功",
        obj
      });
    } else {
      res.json({
        status: 1,
        msg: "登录失败"
      })
    }
  });
})
//手机号登录
router.post('/loginUserphone', (req, res) => {
  var sql = $sql.user.loginphone;
  var params = req.body;
  var obj = {};
  conn.query(sql, [params.phone], function (err, result) {
    if (err) {
      res.json({
        status: 1,
        msg: "手机号或者验证码错误"
      });
    }
    if (result.length) {
      obj = result[0];
      //console.log(result);
      //res.send(result);
      res.json({
        status: 0,
        msg: "登录成功",
        obj
      });
    } else {
      res.json({
        status: 1,
        msg: "登录失败"
      })
    }
  });
})
//管理员登录接口 done
router.post('/loginAdmin', (req, res) => {
  var sql = $sql.admin_user.login;
  var params = req.body;
  var obj = {};
  console.log(1, params);
  conn.query(sql, [params.loginname, params.password], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.length) {
      obj = result[0];
      console.log(result);
      res.json({
        status: 0,
        msg: "登录成功",
        obj
      });
    } else {
      res.json({
        status: 1,
        msg: "登录失败"
      });
    }
  });
})
// 增加用户接口 done
router.post('/addUser', (req, res) => {
  var sql = $sql.user.add;
  var params = req.body;
  var str = Math.random().toString(36).slice(-6);
  //console.log(1, params);
  var obj = {};
  conn.query(sql, [str, params.phone, params.password], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.insertId) {
      obj = result[0];
      console.log(result);
      res.json({
        status: 0,
        msg: "注册成功",
        obj
      });
    } else {
      res.json({
        status: 1,
        msg: "注册失败,用户账号已存在"
      });
    }
  })
})
//查看用户接口 done
router.get('/searchUser', (req, res) => {
  var sql = $sql.user.search
  var obj = {};
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result.length) {
      console.log(result)
      obj = result[0];
      //res.send(result)
      res.json({
        status: 0,
        msg: "查询成功",
        obj
      });
    } else {
      res.json({
        status: 1,
        msg: "没有用户"
      });
    }
  })
})
//特定id查看用户接口 done
router.post('/searchUserId', (req, res) => {
  var sql = $sql.user.searchId
  var params = req.body;
  var obj = {};
  conn.query(sql, [params.userId], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.length) {
      //console.log(result)
      obj = result[0];
      res.json({
        status: 0,
        msg: "查询成功",
        obj
      });
    } else {
      res.json({
        status: 1,
        msg: "用户ID不存在"
      });
    }
  })
})
// 增加评论接口 done
router.post('/addRemark', (req, res) => {
  var sql = $sql.Remark.add
  var params = req.body
  //console.log(params)
  var obj = {};
  conn.query(sql, [params.userId, params.datetime, params.remark, params.grade],
    function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result.insertId) {
        //console.log(res, result);
        obj = result[0];
        res.json({
          status: 0,
          msg: "评论成功",
          obj
        });
      } else {
        res.json({
          status: 1,
          msg: "评论失败"
        });
      }
    })
})

module.exports = router
