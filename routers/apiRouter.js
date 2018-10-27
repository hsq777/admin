const express = require('express');
const bodyParser = require('body-parser');
const user = require('../models/user');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));

router.post('/regiester', (req, res)=>{
    // 取得请求参数
    let {username, password} = req.body;//解构赋值
    //等价于
    //let username = req.body.username;
    //let password = req.body.password;
    // {
    //     username
    //     password
    // }
    console.log('接收的请求参数为：');
    console.log(req.body);

    //判断该用户是否存在
    user.isExistUserByName(username)
    .then(()=>{
        // 不存在，将数据保存到数据库中，完成注册，响应客户端
        user.saveUserInfo(username, password).then(()=>{
            //注册成功
            res.json({
                status: 0,
                message: '注册成功'
            })

        }).catch(()=>{
            //注册失败
            res.json({
                status: 1,
                message: '注册失败，数据库错误'
            })
        })
    })
    .catch(()=>{
        // 存在，响应客户端，该用户已存在
        res.json({
            status: 2,
            message: '该用户名已存在'
        })
    });

})
router.post('/login',(req,res)=>{
    //取得请求参数
    let{username,password} = req.body;
    console.log('接收的请求参数为：');
    console.log(req.body);

    //判断该用户名及密码是否正确
    user.isUserAndPsdRight(username,password)
    .then(()=>{
        //正确 
        res.json({
            status: 0,
            message: '登入成功'
        })
    })
    .catch(()=>{
        //错误，提示输入用户名或密码错误
        res.json({
            status: 3,
            message: '输入用户名或密码错误'
        })
    });
})

module.exports = router;