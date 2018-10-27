$('#confirm').click(function(){
    //取得用户输入的数据
    var user = $('.user').val();
    var psd = $('.psd').val();
    //对数据的判断
    if(!user || !psd){
        alert('输入不能为空');
        return;
    }
    //发送登入请求
    $.ajax({
        url: 'api/login',
        data: {
            username: user,
            password: psd
        },
        method: "POST",
        success: function(data){
            console.log("登入请求成功");
            console.log(data);
            if(data.status === 0){
                //跳转的主页
                window.location.href = '/';
            }else{
                alert(data.message);
            }
        },
        fail: function(error){
            console.log('请求失败');
            console.log(error);
        }
    })
})