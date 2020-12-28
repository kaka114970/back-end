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
    search: "select * from user",
    searchId: "select * from user where userId = ?",
    login: "select * from user where phone = ? and password = ?",
    searchUsername: "select * from user where username = ?",
    loginphone:"select * from user where phone = ?",
    updatapassword:"UPDATE `test`.`user` SET password = ? WHERE phone = ?"
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
    search: "select * from logo"
  },
  swipe: {
    search: "select * from swipe"
  }
}

module.exports = sqlMap;
