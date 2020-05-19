// var host='http://120.24.51.37:9010/admin' //测试版
// var filePath='http://120.24.51.37/group1/' //测试版

var host='http://36.133.32.21:8020/admin' //正式版
var filePath='http://36.133.32.21:8020/group1/' //正式版

//请求方法
function ajaxMethod(str,param,obj,caches) {
    console.log(caches)
    var link = urlLink(str);
        var result = {};
        var isCaches = caches || false;
        // $.ajax.setRequestHeader('If-Modified-Since', '0');//清除缓存，根据第二篇文章新加的
        // $.ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//这段不能少，否则也不能正常发送数据
        jQuery.support.cors = true; 
        $.ajax({
            type: link.method,
            url:host + link.url+param,
            data:obj,
            dataType:'json',
            cache:false,
            // crossDomain: true == !(document.all),   //添加这一行代码
            async:isCaches, //是否异步
            success:function (data) {
                result = data;
                // showMessage("获取数据成功 !", 1);
            },
            error: function() {
              console.log("Error");
              showMessage("数据请求失败 , 请稍后再试 !", 0);
            }
        });
  
    return result;
}

// 声明一个全局Http请求
window.httpService = {
    //通过访问来源，设置不同的服务器
    /**
     * [httpServer 请求服务]
     * @param  {[type]} url    [url请求链接]
     * @param  {[type]} params [参数]
     * @param  {[type]} types  [请求方式，默认为post]
     * @return {[type]}        [返回的结果]
     */
    httpServer: function(url, obj) {
        var deffer = $.Deferred();
        var params = obj.params || '';
        $.ajax({
            url: host + urlLink(url).url+params, // 请求接口
            data: obj.data||'',
            type: obj.types || 'GET',
            cache: true,
            async: obj.async || true,
            success: function(data) {
                deffer.resolve(data);
            },
            error: function(data) {
                deffer.reject(data);
                console.log(data);
                showMessage("数据请求失败 , 请稍后再试 !", 0);
            }
        });
        return deffer.promise();
    }
};


// $("#some-element").busyLoad("show");

    $(document).ajaxStart(function () {
        // console.log('网络请求开始')
        // $("#some-element").busyLoad("show",{
       
        // });
        
    }).ajaxStop(function () {
        // 隐藏loading
        // console.log('网络请求结束')
        // $("#some-element").busyLoad("hide");
    });

     /**
         * 弹出消息提示框，采用浏览器布局，位于整个页面中央，默认显示3秒
         * 后面的消息会覆盖原来的消息
         * @param message：待显示的消息
         * @param type：消息类型，0：错误消息，1：成功消息
         */
        function showMessage(message, type) {
            $(".showMessage").remove();//如果元素已经存在，则先删除它。（不存在也不影响 remove）
            var messageJQ = $("<div class='showMessage'>" + message + "</div>");
            if (type == 0) {
                messageJQ.addClass("showMessageError");
            } else if (type == 1) {
                messageJQ.addClass("showMessageSuccess");
            }
            /**先将元素隐藏到页面，然后以600秒的速度下拉显示出来*/
            messageJQ.hide().appendTo("body").slideDown(600);
            /**3秒之后自动删除生成的元素*/
            window.setTimeout(function () {
                messageJQ.remove();
            }, 3000);
        }



