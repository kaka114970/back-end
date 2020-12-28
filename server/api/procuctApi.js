//userApi.js
var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')
const { start } = require('chromedriver')

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
//获取商品详情
router.get('/searchProductdetail', (req, res) => {
  var sql = $sql.productdetail.search
  var obj = {};
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result.length) {
      //console.log(result)
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
        msg: "没有商品"
      });
    }
  })
})
//特定id获取商品详情
router.post('/searchProductdetailId', (req, res) => {
  var sql = $sql.productdetail.searchId
  var params = req.body;
  var obj = {};
  var com = [];
  //var a="";
  //console.log(params);
  //var str=number
  conn.query(sql, [params.productId], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.length) {
      //console.log(result)
      //console.log(result[0].productimgurl);
      //imgurl = result[0].productimgurl;
      obj = result[0]
      com = JSON.parse(obj.comment).slice(0, 2);
      //a=typeof(com);
      //console.log(com);
      res.json({
        status: 0,
        msg: "查询成功",
        //result
        obj,
        com
      });
    } else {
      res.json({
        status: 1,
        msg: "商品ID不存在"
      });
    }
  })
})
//获取商品
router.post('/searchProduct', (req, res) => {
  var sql = $sql.product.search;
  var params = req.body;
  var count = Number(params.count);
  var start = Number(params.start);
  conn.query(sql, [start, count], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result.length) {
      console.log(result)
      res.json({
        status: 0,
        msg: "查询成功",
        result
      });
    } else {
      res.json({
        status: 1,
        msg: "没有商品"
      });
    }
  })
})

//输入查询商品
router.post('/searchProductinput', (req, res) => {
  var sql = $sql.product.serchinput;
  var sql3 = $sql.product.serchitem;
  var params = req.body;
  var str = `%${params.str}%`;
  var arr = [];
  var final = [];
  conn.query(sql, [str], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.length) {
      arr = result;
      for (i = 0; i < arr.length; i++) {
        !function (i) {
          conn.query(sql3, [arr[i].item], function (err, resultll) {
            if (err) { console.log(err) }
            if (resultll) {
              console.log(1);
              final[i] = resultll;
            }
          })
        }(i);
      }
      setInterval(function () {
        console.log(2);
        res.json({
          status: 0,
          msg: "查询成功",
          arr,
          final
        });
      }, 100)
    } else {
      res.json({
        status: 1,
        msg: "没有商品"
      });
    }
  })
})

//获取商品分类
router.get('/serchclass', (req, res) => {
  var sql = $sql.product.serchclass;
  //var params = req.body;
  //var str = `%${params.str}%`
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result.length) {
      console.log(result)
      res.json({
        status: 0,
        msg: "查询成功",
        result
      });
    } else {
      res.json({
        status: 1,
        msg: "没有商品"
      });
    }
  })
})

//按类查询商品
router.post('/searchProductbyclass', (req, res) => {
  var sql = $sql.product.serchbyclass;
  var params = req.body;
  var str = `${params.str}`
  conn.query(sql, [str], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result.length) {
      console.log(result)
      res.json({
        status: 0,
        msg: "查询成功",
        result
      });
    } else {
      res.json({
        status: 1,
        msg: "没有商品"
      });
    }
  })
})

//获取轮播图
router.get('/searchSwipe', (req, res) => {
  var sql = $sql.swipe.search
  //var obj = {};
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result.length) {
      //obj = result[0];
      //console.log(result)
      //res.send(result)
      res.json({
        status: 0,
        msg: "查询成功",
        result
      });
    } else {
      res.json({
        status: 1,
        msg: "没有商品"
      });
    }
  })
})

//获取logo图
router.get('/searchLogo', (req, res) => {
  var sql = $sql.logo.search
  //var obj = {};
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result.length) {
      //console.log(result)
      //res.send(result)
      //obj = result[0];
      res.json({
        status: 0,
        msg: "查询成功",
        result
      });
    } else {
      res.json({
        status: 1,
        msg: "没有商品"
      });
    }
  })
})

module.exports = router
