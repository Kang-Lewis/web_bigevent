//每次调用$.get post ajax前会调用这个函数
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    //在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);

    //统一为有权限的接口 设置headers请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            'Authorization': localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载complete函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message ===
            "身份认证失败！") {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }

})