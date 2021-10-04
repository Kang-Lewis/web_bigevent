//每次调用$.get post ajax前会调用这个函数
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    //在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);
})