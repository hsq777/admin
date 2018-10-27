const express = require('express');


const router = express.Router();

// 请求首页
router.get('/', (req, res)=>{
    res.render('index');
});

// 请求注册页面
router.get('/regiester', (req, res)=>{
    res.render('regiester');
});

// 请求登录页面
router.get('/login', (req, res)=>{
    res.render('login');
});


module.exports = router;