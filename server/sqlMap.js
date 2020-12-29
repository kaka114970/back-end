//sqlMap.js
var sqlMap = {
  // 用户
  admin_user: {
    add: 'insert into admin_user(loginname,password) values(?, ?)',
    select: "select * in admin_user",
    login: "select * from admin_user where loginname = ? and password = ?",
  },
  user: {
    add: 'insert into user(username,phone,password) values(?, ?, ?)',
    searchphone: "select * from user where phone = ? and islogin = 0",
    search: "select * from user",
    searchId: "select * from user where userId = ?",
    login: "select * from user where phone = ? and password = ? and islogin = 0",
    loginend:"UPDATE `test`.`user` SET `islogin` = 1 WHERE phone = ?",
    outlogin:"UPDATE `test`.`user` SET `islogin` = 0 WHERE phone = ?",
    searchUsername: "select * from user where username = ?",
    loginphone: "select * from user where phone = ?",
    updatapassword: "UPDATE `test`.`user` SET password = ? WHERE phone = ?"
  },
  Remark: {
    add: 'insert into remark(userId,datetime,remark,grade) values(?, ?, ?, ?)'
  },
  productdetail: {
    search: "select * from productdetail",
    searchId: "select * from productdetail where productId = ?",
  },
  product: {
    search: "select * from product limit ? , ?",
    serchinput: "select  DISTINCT item from product where item like ?",
    serchitem: "select * from product where item = ?",
    serchclass: "SELECT DISTINCT class FROM product",
    serchbyclass: "select * from product where class = ?"
  },
  logo: {
    search: "select * from logo",
    searchId: "select * from logo where logoid = ?"
  },
  swipe: {
    search: "select * from swipe"
  },
  order: {
    addorder:"INSERT INTO `test`.`order`(`productid`, `state`, `color`, `size`, `price`, `img`, `title`) VALUES (?, '未付款', ?, ?, ?, ?, ?)",
    serch:"SELECT * FROM `test`.`order` where state = '待付款'",
    serchall:"SELECT * FROM `test`.`order` ORDER BY `state`",
    serchdelive:"SELECT * FROM `test`.`order` where state = '未发货'",
    serchdbuy:"SELECT * FROM `test`.`order` where state = '未收货'",
    delate:"DELETE FROM `test`.`order` WHERE `id` = ?"
  }
}

module.exports = sqlMap;
