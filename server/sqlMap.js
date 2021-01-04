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
    searchId: "select * from user where phone = ?",
    login: "select * from user where phone = ? and password = ? and islogin = 0",
    loginend:"UPDATE `sql42_192_149_1`.`user` SET `islogin` = 1 WHERE phone = ?",
    outlogin:"UPDATE `sql42_192_149_1`.`user` SET `islogin` = 0 WHERE phone = ?",
    searchUsername: "select * from user where username = ?",
    loginphone: "select * from user where phone = ?",
    updatapassword: "UPDATE `sql42_192_149_1`.`user` SET password = ? WHERE phone = ?"
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
    addorder:"INSERT INTO `sql42_192_149_1`.`order`(`productid`, `state`, `color`, `size`, `price`, `img`, `title`) VALUES (?, '未付款', ?, ?, ?, ?, ?)",
    serch:"SELECT * FROM `sql42_192_149_1`.`order` where state = '待付款'",
    serchall:"SELECT * FROM `sql42_192_149_1`.`order` ORDER BY `state`",
    serchdelive:"SELECT * FROM `sql42_192_149_1`.`order` where state = '未发货'",
    serchdbuy:"SELECT * FROM `sql42_192_149_1`.`order` where state = '未收货'",
    delate:"DELETE FROM `sql42_192_149_1`.`order` WHERE `id` = ?"
  },
  command: {
    searchcommand:"SELECT * FROM `sql42_192_149_1`.`command` ORDER BY `commandID` DESC",
    addcommand:"INSERT INTO `sql42_192_149_1`.`command`(`nico`, `header`, `command`, `commandID`) VALUES ('谜之用户', '/src/assets/img/mv3.jpg',?, NULL)"
  }
  
}

module.exports = sqlMap;
