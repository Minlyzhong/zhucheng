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
            // showMessage("获取数据成功 !", 1);
        },
        error: function() {
          console.log("Error");
          showMessage("数据请求失败 , 请稍后再试 !", 0);

        }
  
    });
    return result;

}

// $("#some-element").busyLoad("show");





    $(document).ajaxStart(function () {
        // console.log('网络请求开始')
        $("#some-element").busyLoad("show",{
            spinner: "circles", // pump, accordion, pulsar, cube, cubes, circle-line, circles, cube-grid
            image: false,
            fontawesome: false, // "fa fa-refresh fa-spin fa-2x fa-fw"
            custom: false, // jQuery Object
            color: "#43A9FF",
            background: "rgba(0, 0, 0, 0.21)",
            maxSize: "50px", // Integer/String only for spinners & images, not fontawesome & custom
            minSize: "50px", // Integer/String only for spinners & images, not fontawesome & custom
            text: '加载中',
            textColor: false, // default is color
            textMargin: ".5rem",
            textPosition: "bottom", // left, right, top, bottom  
            fontSize: "1rem",
            fullScreen: false,
            animation: false, // fade, slide
            animationDuration: "fast", // String, Integer 
            containerClass: "busy-load-container",
            containerItemClass: "busy-load-container-item",
            spinnerClass: "busy-load-spinner",
            textClass: "busy-load-text"
        });
        
    }).ajaxStop(function () {
        // 隐藏loading
        // console.log('网络请求结束')
        $("#some-element").busyLoad("hide");
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



