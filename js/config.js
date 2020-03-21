var host='http://120.24.51.37:9010/admin' //测试版
// var host='http://120.24.51.37:9010/admin/' //测试版

var filePath='http://120.24.51.37/group1/' //测试版
// var filePath='http://120.24.51.37/group1/' //测试版
 
//请求方法
function ajaxMethod(str,param,obj) {
    var link = urlLink(str);
    var result = {};
    $.ajax({
        type: link.method,
        url:host + link.url+param,
        data:obj,
        dataType:'json',
        async:false,
        cache:true,
        success:function (data) {
            result = data;
        },
        error: function() {
          console.log("Error");
        }
  
    });
    return result;

}