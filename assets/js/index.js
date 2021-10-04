$(function() {
    getUserInfo();
    window.addEventListener("resize", function() {
        //页面缩放一次就刷新iframe
        document.getElementById('mainframe').contentWindow.location.reload(true);
    })

    //点击按钮实现退出功能
    $('#btnLogout').on('click', function() {
        var layer = layui.layer;
        //提示用户是否确认退出
        layer.confirm('确定退出登录？', {
            icon: 3,
            title: '提示',
            btn: ['确认', '取消'], //可以无限个按钮
        }, function(index, layero) {
            //清空本地token
            localStorage.removeItem('token');
            //重新跳转到登录页面
            location.href = '/login.html';
            //关闭询问框
            layer.close(index);
        });
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            }
            // console.log(res.data);
            renderAvatar(res.data);
        },
        //无论成功还是失败最后都会调用complete函数
        // complete: function(res) {
        //     // console.log('complete函数');
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message ===
        //         "身份认证失败！") {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html';
        //     }
        // }
    })
}

//渲染用户的头像
function renderAvatar(user) {
    //获取用户的名称
    var name = user.nickname || user.username;
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}