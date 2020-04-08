$(function () {
    // 获取背景图片
    getBackground();

    getHome();

    function getBackground() {
        var result = ajaxMethod('banner', 1);
        // console.log(result)
        if (result.code == 0 && result.data != null) {
            //do something
            // console.log('11111');
            if (result.data.length > 0) {

                var imgUrl = filePath + result.data[0].bannerPath
                $('body').css('backgroundImage', 'url(' + imgUrl + ')');
            }

        } else {
            //do something
        }
    }

    // 获取首页顶部栏目
    function getHome() {
        var that = this;
        var result = ajaxMethod('topSet', 80);
        console.log('获取首页顶部栏目')
        console.log(result)
        if (result.code == 0 && result.data != null) {
          //do something
          var data = result.data[0].children;

          var totalData = [];
          var sigleData = [];
          var srt = '';
          for (var index = 0; index < data.length; index++) {
            var value = data[index];
            // console.log(value.children)
            if (value.children.length > 0) {
              var newData = new Object({
                id: 0,
                catalogName: '',
                title1: '',
                title2: '',
              });
              newData.children = value.children;
              newData.title1 = value.catalogName.substring(0, 2);
              newData.title2 = value.catalogName.substring(2, 4);
              newData.id = value.id;
              newData.catalogName = value.catalogName;
             
              totalData.push(newData);
              // console.log(newData.children);
              var str2 = '';

              for (var ind = 0; ind < newData.children.length; ind++) {
                var val = newData.children[ind];
                // console.log(val)
                var url = './news.html?id=' + val.id + '&pId=' + value.id;
                if (val.catalogName == "党建视频") {
                  url = './moreBook.html?type=1';
                }
                if (val.catalogName == "资料下载") {
                  url = './news.html?id=0&pId=0&type=0';
                }
                if (val.catalogName == "党务回答") {
                  url = './news.html?id=0&pId=0&type=1';
                }
                if (ind != 0 && ind != 3) {

                  if (ind == 2) {
                    str2 += '<span>' +
                      '<span >|</span><a  href="' + url + '" data-id="' + val.id + '" target="_blank">' + val.catalogName + ' </a> '
                      + '</span></br>'
                  } else {
                    str2 += '<span>' +
                      '<span >|</span><a  href="' + url + '" data-id="' + val.id + '" target="_blank">' + val.catalogName + ' </a> '
                      + '</span>'
                  }
                } else {

                  str2 += '<span>' +
                    '<a  href="' + url + '" data-id="' + val.id + '" target="_blank">' + val.catalogName + ' </a> '
                    + '</span>'
                }
              }
              srt += '<div class="title-hold ">' +
                '<div class="title-left">' +
                '<div>' + newData.title1 + '</div>' +
                '<div>' + newData.title2 + '</div>' +
                '</div>' +
                '<div class="title-right list' + index + ' " >' +
                '<div >' + str2 + '</div></div></div>'

            } else {
              sigleData.push(value);
            }

            document.getElementById("contentTop").innerHTML = srt;
          }


        

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
    console.log('now');
    console.log(now);
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

