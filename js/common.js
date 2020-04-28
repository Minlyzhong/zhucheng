if (!window.console || !console.firebug){
  var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

  window.console = {};
  for (var i = 0; i < names.length; ++i)
      window.console[names[i]] = function() {}
}

// 兼容ie8
if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function forEach( callback, thisArg ) {
    var T, k;
    if ( this == null ) {
      throw new TypeError( "this is null or not defined" );
    }
    var O = Object(this);
    var len = O.length >>> 0; 
    if ( typeof callback !== "function" ) {
      throw new TypeError( callback + " is not a function" );
    }
    if ( arguments.length > 1 ) {
      T = thisArg;
    }
    k = 0;
    while( k < len ) {
      var kValue;
      if ( k in O ) {
        kValue = O[ k ];
        callback.call( T, kValue, k, O );
      }
      k++;
    }
  };
}

$(function () {
  // 底部友情链接选择
  $(".webs span").on('click', function () {
    
    var type = $(this).data('type');
      $(".webs span").css('background', 'none');
      $(this).css('background', '#FAF9F5');
      $(".websites").css('display', 'none');
      $(".site"+type).css('display', 'block');
    
  });

  $("#search").on('click', function () {
    // window.open('./search.html', "");
    searchText();

  });

  $(window).keydown( function(e) {
    var key = window.event?e.keyCode:e.which;
    if(key == 13){
        var myInput = document.getElementById('searchInput');  //获取到ID为name的input
        if (myInput == document.activeElement) { 
            searchText();
            return false;
        }
    }
});

function searchText(){
  var text = $('#searchInput').val().replace(/[, ]/g,'');

  if(text){
    var searchUrl = encodeURI("./search.html?searchText=" + text); //使用encodeURI编码
    location.href = searchUrl;
    // window.open(searchUrl, "");

  }else{
    showMessage("请输入关键字", 0);
  }

}


    // 获取背景图片
    getBackground();

    getHome();

    function getBackground() {
        var result = ajaxMethod('banner', 1);
        if (result.code == 0 && result.data != null) {
            //do something
            if (result.data.length > 0) {

                var imgUrl = filePath + result.data[0].bannerPath
                $('body').css('backgroundImage', 'url(' + imgUrl + ')');
            }else{
              $('body').css('backgroundImage', 'url(images/banner.jpg)');
            }

        } else {
          $('body').css('backgroundImage', 'url(images/banner.jpg)');
            //do something
        }
    }


      // 获取首页顶部栏目
      function getHome() {
        var that = this;
        var result = ajaxMethod('topSet', 80);


        if (result.code == 0 && result.data != null) {
          //do something
          var data = result.data[0].children;

          var totalData = [];
          var sigleData = [];
          var srt = '';
          for (var index = 0; index < data.length; index++) {
            var value = data[index];
            if(value.children.length == 0){
                sigleData.push(value);
              }
            // if (value.children.length > 0) {
              var newData = new Object({
                id: 0,
                catalogName: '',
                children:[],
              });
              newData.children = value.children;
             
              newData.id = value.id;
              newData.catalogName = value.catalogName;
              // newData.parentId = value.parentId;

              totalData.push(newData);
              var str2 = '';

              for (var ind = 0; ind < newData.children.length; ind++) {
                var val = newData.children[ind];
                    str2 += '<li>' +
                      '<a  href="' + catalogUrl + '" data-id="' + val.id + '" target="_blank">' + val.catalogName + ' </a> '
                      + '</li>'
              }
              if(newData.children == 0){
                srt += '<li><a  href="./news.html?id=' + newData.id + '&pId=' + newData.id+'" target="_blank">'+ newData.catalogName + '</a>'+
                  '<ul >' + str2 + '</ul>'+
                  '</li>' ;
              }else{
                srt += '<li><a  href="#" style="pointer-events:none;">' + newData.catalogName + '</a>'+
                  '<ul >' + str2 + '</ul>'+
                  '</li>' ;
              }
              
               $('#contentTop').html(srt);

          }

          // 获取多栏目内容
          // getMoreSet(totalData);

          // 获取单栏目内容
          // getsigleDataList(sigleData);

        } else {
          //do something
        }

      }



    //判断是否在前面加0(获取时间)
    function getNow(s) {
        return s < 10 ? '0' + s : s;
    }

    var myDate = new Date();

    var year = myDate.getFullYear();        //获取当前年
    var month = myDate.getMonth() + 1;   //获取当前月
    var date = myDate.getDate();            //获取当前日


    var h = myDate.getHours();              //获取当前小时数(0-23)
    var m = myDate.getMinutes();          //获取当前分钟数(0-59)
    var s = myDate.getSeconds();

    // var now=year+'年'+getNow(month)+"月"+getNow(date)+"日 "+getNow(h)+':'+getNow(m)+":"+getNow(s);
    var now = year + '年' + getNow(month) + "月" + getNow(date) + "日";
    $('#nowTime').html(now);


})


// JavaScript Document
// 加入收藏 <a onclick="AddFavorite(window.location,document.title)">加入收藏</a>
function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
//设为首页 <a onclick="setHome(this,window.location)" >设为首页</a>
function setHome(obj, vrl) {
    try {
        obj.style.behavior = 'url(#default#homepage)'; obj.setHomePage(vrl);
    }
    catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl);

        }
    }
}

