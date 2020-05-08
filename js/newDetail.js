$(function () {
    //获取url中的参数  
    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数   
      if (r != null) return unescape(r[2]); return null; //返回参数值  
    }

    // $("#search").on('click', function () {
    //   window.open('./search.html', "");
    // });
    var uId = getUrlParam("id");
    var pId = getUrlParam("pId");

    //获取顶部栏 
    getTopList();
    // 获取新闻详情
    getNewsDetail();

 //获取顶部栏 
 function getTopList() {
    var result = ajaxMethod('topSet', pId);
    console.log(result)
    if (result.code == 0 && result.data != null) {
      //do something
      var data = result.data[0];
      console.log('data')
      console.log(data)
      var set = '<li><a href="index.html"  target="_blank" >首页</a></li>';
      //  $('#topName').html(data.catalogName);
    //   pid是80就是二级页面
      if(data.id == 80){
            $(".noChild").css('display','none');
            if (data.children.length > 0) {
                data.children.forEach(function (value, index) {
                  console.log(value)
                  if (value.id == uId) {
                    $("#thiStep").html(value.catalogName);
                  }
                   
                })
              } else {
              }
      }else{
        $("#sedStep").html(data.catalogName);

        if(data.catalogUrl){
          $("#sedStep").attr('href',data.catalogUrl);
        }else{
          $("#sedStep").attr('href','./news.html?id=' + data.id + '&pId=' +data.parentId);
        }
        
        if (data.children.length > 0) {
          data.children.forEach(function (value, index) {
            console.log(value)
            if (value.id == uId) {
              $("#thiStep").html(value.catalogName);
            }
          })
        } else {
          $("#topTitle").html(data.catalogName);
        }
      }
    } else {
      //do something
    }
}

    // 获取新闻详情
    function getNewsDetail() {

      var result = ajaxMethod('newDetail', uId);
      if (result.code == 0 && result.data != null) {
        //do something
        var data = result.data

        $("#time").html(data.creatTs);
        $("#source").html(data.newsfrom || '');
        $("#detailTitle").html(data.title);
        $("#newsTitle").html(data.title);
        $("#newDetail").html(data.content);
        $('#newDetail p img').parents('p').addClass('tac');
      } else {
        //do something
      }
    }

    $('#big').click(function () {
      console.log('111')
      $('#newDetail p, #newDetail p span').attr('class', 'big-font');
    })
    $('#middle').click(function () {
      $('#newDetail p, #newDetail p span').attr('class', 'mid-font');
    })
    $('#small').click(function () {
      $('#newDetail p, #newDetail p span').attr('class', 'small-font');
    })

  })