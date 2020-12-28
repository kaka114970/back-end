// node 后端服务器
const userApi = require('./api/userApi');
const productApi = require('./api/procuctApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
// 后端api路由
app.use('/api/user', userApi);
app.use('/api/product', productApi);
const conf = {
  port: 8088,
  host: '10.31.162.36'
};
// 监听端口
//app.listen(3030);
app.listen(conf.port, conf.host, () => {
  console.log(`server is running on http://${conf.host}:${conf.port}`);
})
//console.log('success listen at port:3030......');
