$(function () {

    //获取url中的参数  
    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数   
      if (r != null) return unescape(r[2]); return null; //返回参数值  
    }

    var totalPage = 1;

    // $("#search").on('click', function () {
    //   window.open('./search.html', "");
    // });


    var uId = getUrlParam("id");
    var pId = getUrlParam("pId");
    var type = getUrlParam("type") || '';
    var flag = 0;
    // type=0是最新下载 1是党务问答
    console.log(uId)
    //获取顶部栏 
    getTopList();

    // 获取子栏目内容

    // if (uId != 0) {

      getSetList(1);
    // } else {
    //   // 获取最新下载
    //   getDownload(1);
    // }

    //  初始化分页
    $("#demo2").jqPaginator({
      totalPages: totalPage,
      visiblePages: 10,
      currentPage: 1,
      first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
      prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
      next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
      last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
      page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
      onPageChange: function (n) {
        // $("#demo2-text").html(n);
        // if(n !=1){
        $('html,body').animate({ scrollTop: 200 }, 'slow');
        console.log(flag)
        if (flag != 1) {
          
          // if (uId != 0) {
            getSetList(n);
          // } else {
          //   // 获取最新下载
          //   getDownload(n);
          // }
        }else{
          flag += 1;
        }

        // }
      }
    })

     //获取顶部栏 
     function getTopList() {
        // var result = ajaxMethod('topSet', pId);
        var obj={
          params:pId
        }
        httpService.httpServer('topSet',obj).then(function(result){
          console.log(result)
          if (result.code == 0 && result.data != null) {
            //do something
            var data = result.data[0];
            console.log('data')
            console.log(data)
            var sonIndex = 0;
            var set = '<li><a href="index.html"  target="_blank" >首页</a></li>';
            //  $('#topName').html(data.catalogName);
          //   pid是80就是二级页面
            if(data.id == 80){
                  $(".noChild").css('display','none');
                  if (data.children.length > 0) {
                    // 需要登录的data
                    var needLoginData = loginRoad(data.children);
                    console.log('needLoginData')
                    console.log(needLoginData)
                    needLoginData.forEach(function (value, index) {
                        console.log(value)
                        if (value.id == uId) {
                          $("#topTitle").html(value.catalogName);
                          $("#thiStep").html(value.catalogName);
                          sonIndex = index+1;
                        }
                        if(value.catalogUrl){
                          var url = value.catalogUrl;
                        }else{
                          var url='./newsSed.html?id=' + value.id + '&pId=' + value.id;
                        }
                       
                          var srt = '<li><a href="' + url + '" data-id="' + value.id + '" target="_blank" >' + value.catalogName + '</a></li>';
          
                        set += srt;
                      })
                      console.log(set)
                    } else {
                      $("#topTitle").html(data.catalogName);
                    }
            }else{
              $("#sedStep").html(data.catalogName);
  
              if(data.catalogUrl){
                $("#sedStep").attr('href',data.catalogUrl);
              }else{
                $("#sedStep").attr('href','./newsSed.html?id=' + data.id + '&pId=' + data.id);
              }
              var needLoginData = loginRoad(data.children);
                    console.log('needLoginData')
              if (needLoginData.length > 0) {

                needLoginData.forEach(function (value, index) {
                  console.log(value.id)
                  console.log(uId)
                  if (value.id == uId) {
                    // $('#topTitle').html(value.catalogName);
                    $("#topTitle").html(value.catalogName);
                    $("#thiStep").html(value.catalogName);
                    console.log(index+1);
                    sonIndex = index+1;    
                  }
                  if(value.catalogUrl){
                    var url = value.catalogUrl;
                  }else{
                    var url = './news.html?id=' + value.id + '&pId=' + pId;
                  }
                    var srt = '<li><a class="sedList" href="' + url + '" data-id="' + value.id + '" target="_blank" >' + value.catalogName + '</a></li>';
                  set += srt;
                })
                console.log(set)
              } else {
                $("#topTitle").html(data.catalogName);
          //       $(".sedList").on("click",
          //       function(e) {
          //         var i = $(this).data("id");
          //         console.log('i');
          //         console.log(i);
          //         // 登录后才能看
          //         // if(false){
          //         // showMessage("登录账户后才可查看相关内容", 0);
          //         // // a禁止跳转

          //         // return false;
          //         // }

					// });
              }
            }  
          
            $("#contentTop").html(set);
            $("#contentTop li:eq("+sonIndex+") a").css('color','rgb(230, 0, 0)')
  
          } else {
            //do something
          }
      })
       
    }

    function loginRoad(data){
      // console.log('过滤')
      var sonData = data;
      var newList =[];
      for(var i=0; i<sonData.length; i++){
        console.log(sonData[i])
        console.log(sonData[i].catalogUrl == 'login')
        if(sonData[i].catalogUrl != 'login'){
          newList.push(sonData[i]);
        }
      }
      return newList;
    }

    function getSetList(page) {
      flag += 1;

      var obj={
        data : {
          catalogId: uId,
          current: page,
          size: 10
        }
      }

      httpService.httpServer('newList',obj).then(function(result){
        console.log(result)

        if (result.code == 0 && result.data != null) {
          //do something
          if (result.data.size > result.data.total) {
            totalPage = 1;
          } else {
            totalPage = Math.ceil(result.data.total / result.data.size);
            console.log(totalPage);
          }
          var list = result.data.records;
          var set = '';
          $('#setNewListHold').html(set);
          if(list.length == 0 && page == 1){
            $('#setNewListHold').html('<h3 class="noneRes">暂无相关内容</h3>');
            return;
          }
          list.forEach(function (value, index) {
            if (value.titlePic) {
              var pic = filePath + value.titlePic;
              var srt = '<div class="main-new new-pic" >' +
                '<a target="_blank" href="./newDetail.html?id=' + value.id + '&pId=' + uId + '"><img  class="max" src="'+pic+'" alt="">'+
                '<div class="new-tit"><h3>' + value.title + '</h3></a>' +
                // '<div class="flex-cstyle row main-content" >' +
                '<div class="shine-detail save">' + value.creatTs + '</div></div></div>'
              
            } else {
              var srt = '<div class="main-new" >' +
                '<a target="_blank" href="./newDetail.html?id=' + value.id + '&pId=' + uId + '"><h3>' + value.title + '</h3></a>' +
                '<div class="flex-cstyle row main-content" >' +
                '<div class="shine-detail save">' + value.creatTs + '  </div></div></div>';
              
            }
            set += srt;
  
          })
          $('#setNewListHold').html(set);
        } else {
          //do something
        }
    })
     
    }
         
  })