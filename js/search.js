$(function () {

    var text = '';
    var newText = '';
    var flag = 0;
    var pageNo = 1;

    var searchUrl = window.location.href;
    var searchData = searchUrl.split("="); //截取 url中的“=”,获得“=”后面的参数
    var searchText = decodeURI(searchData[1]); //decodeURI解码
    console.log('searchText');
    console.log(searchText);
    $("#searchInput").val(searchText);
    $("#keyWord").html(searchText);
    flag = 1;
    getSetList(1, searchText);
    getTopList();




    //  初始化分页
    var totalPage = 1;

    //获取顶部栏 
    function getTopList() {
      // var result = ajaxMethod('topSet', 80);
      var obj={
        params:80
      }
      httpService.httpServer('topSet',obj).then(function(result){
        if (result.code == 0 && result.data != null) {
          //do something
          var data = result.data[0];
          console.log(data)
          //  $('#topName').html(data.catalogName);
          var set = '<li><a href="index.html"  target="_blank" >首页</a></li>';
          if (data.children.length > 0) {
            data.children.forEach(function (value, index) {
              console.log(value)
           
              if(value.catalogUrl){
                var url = value.catalogUrl;
              }else{
                var url = './newsSed.html?id=' + value.id + '&pId=' + 80;
              }
              if (index == 0) {
                var srt = '<li><a href="' + url + '" data-id="' + value.id + '" target="_blank" >' + value.catalogName + '</a></li>';
              } else {
                var srt = '<li><a href="' + url + '" data-id="' + value.id + '" target="_blank" >' + value.catalogName + '</a></li>';
              }
              set += srt;
            })
            console.log(set)
          } else {
            $("#topTitle").html(data.catalogName);
          }
          $("#contentTop").html(set);
  
        } else {
          //do something
        }
    })
     
  }


    function getSetList(page, text) {
      if(text == newText && page == pageNo){
        return;
      }
      pageNo = page || 1;
      var data = {
        current: pageNo,
        size: 10,
        query: text,
        catalogId: 80,
      }
      newText = text;
      
      var result = ajaxMethod('searchNews', '', data);
      console.log(result)

      if (result.code == 0 && result.data != null) {
        //do something
        if (result.data.size > result.data.total) {
          totalPage = 1;
        } else {
          totalPage = Math.ceil(result.data.total / result.data.size);
          console.log(totalPage);
        }

        if(flag == 1){
          console.log(flag)
          console.log('初始化分页')
          $("#demo2").jqPaginator({
          totalPages: totalPage,
          visiblePages: 10,
          currentPage: 1,
          first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
          prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
          next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
          last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
          page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
          onPageChange: function (n,type) {
            // $("#demo2-text").html(n);
            console.log('type')
            console.log(type)
            flag == 0;

            if(type != 'init'){
              $('html,body').animate({ scrollTop: 250 }, 'slow');
              getSetList(n,text);
            }

          }
        })
        }

        
        
        var list = result.data.records;
        var set = '';
        $('#setNewListHold').html(set);
        if(list.length == 0 && pageNo ==1){
          $('#setNewListHold').html('没有搜索到您要查找的内容');
          return;
        }
        list.forEach(function (value, index) {
          //  console.log(value)
          var srt = '<div class="main-new" >' +
            '<a target="_blank" href="./newDetail.html?id=' + value.id + '&pId=' + value.catalogId + '"><h3>' + value.title + '</h3></a>' +
            '<div class="flex-cstyle row main-content" >' +

            '<div class="shine-detail save">' + value.creatTs + '  </div></div></div>';
          set += srt
        })
        $('#setNewListHold').html(set);

      } else {

        $('#setNewListHold').html('没有搜索到您要查找的内容');
        //do something
      }
    }


  })