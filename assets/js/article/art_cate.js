$(function() {
    var layer = layui.layer;
    var form = layui.form;
    //获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                console.log(res);
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        })
    }

    initArtCateList();

    var indexAdd = null;
    //为添加类别绑定点击事件
    $('#btnAddCate').on('click', function() {
        var layer = layui.layer;
        indexAdd = layer.open({
            type: 1,
            area: ['400px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html() //获得html页面中在script里面写的html
        })
    })

    //通过代理的形式，为form-add表单绑定事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！');
                }
                layer.close(indexAdd); //根据索引关闭对应的弹出层
                initArtCateList();
                layer.msg('新增分类成功！');
            }
        })
    })

    var indexEdit = null;
    //使用代理的方式给编辑按钮绑定事件
    $('tbody').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['400px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html() //获得html页面中在script里面写的html
        })
        var id = $(this).attr('data-id');
        //发起请求获取对应分类数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data); //将获取到的数据通过layui写入input
            }
        })
    })

    //通过代理的方式，为修改分类的表单绑定submit事件
    //请务必要养成写注释的好习惯
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！');
                }
                layer.close(indexEdit);
                layer.msg('更新分类数据成功！');
                initArtCateList();
            }
        })
    })

    //通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id');
        //提示用户是否删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！');
                    }
                    layer.msg('删除分类成功！');
                    layer.close(index);
                    initArtCateList();
                }
            })
        });
    })
})