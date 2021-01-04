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
  var sql2 = $sql.user.loginend;
  var sql3 = $sql.user.searchphone;
  var params = req.body;
  var obj = {};
  conn.query(sql3, [params.phone], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.length) {
      setTimeout(() => {
        conn.query(sql, [params.phone, params.password], function (err, result) {
          if (err) {
            console.log(err);
          }
          if (result.length) {
            obj = result[0];
            conn.query(sql2, [params.phone], function (err, result) {
              if (err) { console.log(err) }
              if (result) { console.log(result) }
            })
            res.json({
              status: 0,
              msg: "登录成功",
              obj
            });
          } else {
            res.json({
              status: 1,
              msg: "密码错误"
            })
          }
        });
      }, 100);
    }else{
      res.json({
        status:1,
        msg:"账号已登录或者电话号码错误"
      })
    }
  })

})
//手机号登录
router.post('/loginUserphone', (req, res) => {
  var sql = $sql.user.searchphone;
  var params = req.body;
  var obj = {};
  conn.query(sql, [params.phone], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.length) {
      obj = result[0];
      res.json({
        status: 0,
        msg: "登录成功",
        obj
      });
    } else {
      res.json({
        status: 1,
        msg: "账号已登录或者手机账号不存在"
      })
    }
  });
})
//修改密码
router.post('/updataUser', (req, res) => {
  var sql = $sql.user.updatapassword;
  var params = req.body;
  var obj = {};
  conn.query(sql, [params.password, params.phone], function (err, result) {
    if (err) {
      res.json({
        status: 1,
        msg: "用户名或者密码错误"
      });
    }
    if (result.changedRows) {
      obj = result[0];
      //console.log(result);
      //res.send(result);
      res.json({
        status: 0,
        msg: "修改成功",
        obj,
        result
      });
    } else {
      res.json({
        status: 1,
        msg: "电话号码不存在，或密码不能与原密码相同"
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
  var sql2 = $sql.user.searchphone
  var params = req.body;
  var str = Math.random().toString(36).slice(-6);
  conn.query(sql2, [params.phone], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.length) {
      res.json({
        status: 1,
        msg: "手机号码已被注册"
      })
    } else {
      setTimeout(function () {
        conn.query(sql, [str, params.phone, params.password], function (err, result) {
          if (err) {
            console.log(err);
          }
          if (result.insertId) {
            console.log(result);
            res.json({
              status: 0,
              msg: "注册成功"
            });
          }
        })
      }, 100)
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
  conn.query(sql, [params.phone], function (err, result) {
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
//退出登录
router.post('/outlogin', (req, res) => {
  var sql = $sql.user.outlogin
  var params = req.body;
  var obj = {};
  conn.query(sql, [params.phone], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.changedRows) {
      //console.log(result)
      obj = result[0];
      res.json({
        status: 0,
        msg: "退出成功",
        obj,
        result
      });
    } else {
      res.json({
        status: 1,
        msg: "该账号未登录",
        result
      });
    }
  })
})
module.exports = router
