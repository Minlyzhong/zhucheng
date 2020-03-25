$(function(){
    // 获取背景图片
    getBackground();
    
    function getBackground(){
        var result = ajaxMethod('banner',1);
        // console.log(result)
            if (result.code == 0 && result.data != null) {
                //do something
                // console.log('11111');
                if(result.data.length>0){
    
                    var imgUrl = filePath + result.data[0].bannerPath
                    $('body').css('backgroundImage','url('+imgUrl+')');
                }
              
            } else {
                //do something
            }
    }
    
    
    //判断是否在前面加0(获取时间)
function getNow(s) {
    return s < 10 ? '0' + s: s;
    }
     
    var myDate = new Date();            
     
    var year=myDate.getFullYear();        //获取当前年
    var month=myDate.getMonth()+1;   //获取当前月
    var date=myDate.getDate();            //获取当前日
     
     
    var h=myDate.getHours();              //获取当前小时数(0-23)
    var m=myDate.getMinutes();          //获取当前分钟数(0-59)
    var s=myDate.getSeconds();
     
    // var now=year+'年'+getNow(month)+"月"+getNow(date)+"日 "+getNow(h)+':'+getNow(m)+":"+getNow(s);
    var now=year+'年'+getNow(month)+"月"+getNow(date)+"日";
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
    function setHome(obj,vrl){
        alert('1')
        try{
            alert('2')
            obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
        }
        catch(e){
            alert('3')
            alert(window.netscape)
            if(window.netscape) {
                
                try {
                    alert('4')
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }
                catch (e) {
                    alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
                }
                var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                prefs.setCharPref('browser.startup.homepage',vrl);
                alert('5')
            }
        }
    }
    
    //设为首页
// function SetHome(url){
//     if (document.all){
//     document.body.style.behavior='url(#default#homepage)';
//     document.body.setHomePage(url);
//     }
//     else{
//     alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
//     }
// }


// //设为首页
// function SetHomePage() {
//     if (document.all) {
//       document.body.style.behavior = 'url(#default#homepage)';
//       document.body.setHomePage('https://www.baidu.com/');
//     }
//     else if (window.sidebar) {
//       if (window.netscape) {
//         try {
//           netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
//         }
//         catch (e) {
//           alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true");
//         }
//       }
//       var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
//       prefs.setCharPref('browser.startup.homepage', 'https://www.baidu.com/');
//     }
//   }


