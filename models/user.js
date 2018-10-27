const mongoose = require('mongoose');

// 创建用户的数据库表格
const schema = mongoose.Schema({
    username: String,
    password: String
})

// 创建操作数据库表格的模型
const User = mongoose.model('user', schema);


User.find((error, result)=>{
    console.log(result);
})

//promise创建好后里面的代码会立即执行，并且是同步执行，只是里面可以存放异步代码
// module.exports = {};
// 是否存在该用户名的用户
module.exports.isExistUserByName = function(username){

    return new Promise((resolve, reject)=>{
        // 查询数据库
        User.findOne({username}).then((result)=>{
            if(result){
                //存在
                reject();
            }else{
                //不存在
                // console.log('不存在');
                resolve();
            }
        })

    });
    
}

// 新增用户数据到数据库中
module.exports.saveUserInfo = function(username, password){
    return new Promise((resolve, reject)=>{
        let userInfo = new User({
            username,
            password
        });
        userInfo.save((error, newInfo)=>{
            if(error){
                //保存数据失败
                reject();
            }else{
                // 保存成功，注册成功
                resolve();
            }
        })
    })
}

//用户名及密码是否正确
module.exports.isUserAndPsdRight = function(username,password){
    return new Promise((resolve,reject)=>{
        User.findOne({username,password}).then((result)=>{
            if(result){
                //存在
                resolve();
            }
            else{
                //不存在
                reject();
            }
        })
    })
}


// module.exports = {
//     isExistUserByName,
//     saveUserInfo
// }


// promise
// promise是一个类，需要接收一个函数为参数创建对象，该创建好之后，立即同步执行该函数
// 该函数接收两个参数：resolve:成功的函数， reject：失败的函数
// promise方法中，发生异常，自动调用reject方法
let promise = new Promise((resolve, reject)=>{

    // var str = '123';
    // str.map((item)=>item+1);

    resolve([1,2,3,4]);


    // reject();


});

// promise处理结果的方式1：
/*
promise.then(
    //promise对象中resolve方法调用，以下函数就执行
    (data)=>{
        console.log('resolve调用了');
        console.log(data);
    },
    //promise对象中reject方法调用，以下函数就执行
    (error)=>{
        console.log('reject调用了');
    }
)
*/

// promise处理结果的方式2：
/*
promise
.then((data)=>{
    console.log('resolve调用了');
})
.catch((error)=>{
    console.log('reject调用了');
})
*/

