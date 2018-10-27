const express = require('express');
const mongoose = require('mongoose');
const ejs =require('ejs');

const mainRouter = require('./routers/mainRouter');
const apiRouter = require('./routers/apiRouter');

const server = express();

//处理静态资源文件请求
server.use('/public',express.static('./static'));//前面是url以什么开头，后面是存放的文件夹名
//处理ajax请求
server.use('/api',apiRouter);


//配置模板引擎
server.set('view engine','html');
server.engine('html',ejs.__express);

//处理页面请求
server.use('/',mainRouter);


new Promise((resolve,reject)=>{
    // 启动数据库，执行命令：
    // >mongod --dbptah=数据库数据的存放路径 --port=27017
    // 连接数据库
    mongoose.connect('mongodb://localhost:27018', {useNewUrlParser: true}, (error)=>{
        if(error){
            console.log('连接数据库失败');
        }else{
            console.log('连接数据库成功'); 
            resolve();
        }
    })
})
.then(()=>{
    // 启动服务器
    server.listen(8080, 'localhost', (error)=>{
        if(error){
            console.log('服务器启动失败');
        }else{
            console.log('服务器启动成功');
            
        }
    })
})


