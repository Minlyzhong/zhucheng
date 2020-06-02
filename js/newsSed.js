$(function () {

    //获取url中的参数  
    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数   
      if (r != null) return unescape(r[2]); return null; //返回参数值  
    }

    var totalPage = 1;

 


    var uId = getUrlParam("id");
    // var pId = getUrlParam("pId");
    var type = getUrlParam("type") || '';
    var flag = 0;
    console.log(uId)
    //获取顶部栏 
    getTopList();

  

    //获取顶部栏 
    function getTopList() {
      var obj={
        params:uId
      }

      httpService.httpServer('topSet',obj).then(function(result){
        // console.log(result)
        if (result.code == 0 && result.data != null) {
          //do something
          var data = result.data[0];
          // console.log(data)
          //  $('#topName').html(data.catalogName);
          $("#sedStep").html(data.catalogName);
          var set = '<li><a href="index.html"  target="_blank" >首页</a></li>';
          if (data.children.length > 0) {
            // 需要登录的needLoginData, 登录后用data.children
            var needLoginData = loginRoad(data.children);
            needLoginData.forEach(function (value, index) {
              // console.log(value)
           
              if(value.catalogUrl){
                var url = value.catalogUrl;
              }else{
                var url = './news.html?id=' + value.id + '&pId=' + uId;
              }
              if (index == 0) {
                var srt = '<li><a href="' + url + '" data-id="' + value.id + '" target="_blank" >' + value.catalogName + '</a></li>';
              } else {
                var srt = '<li><a href="' + url + '" data-id="' + value.id + '" target="_blank" >' + value.catalogName + '</a></li>';
              }
              set += srt;
            })
            // console.log(set)
            getMoreSet(needLoginData);
          } else {
            $("#topTitle").html(data.catalogName);
          }
          $("#contentTop").html(set);

        } else {
          //do something
        }
    })
        // var result = ajaxMethod('topSet', uId);
    }

    function loginRoad(data){
      // console.log('过滤')
      var sonData = data;
      var newList =[];
      for(var i=0; i<sonData.length; i++){
        // console.log(sonData[i])
        // console.log(sonData[i].catalogUrl == 'login')
        if(sonData[i].catalogUrl != 'login'){
          newList.push(sonData[i]);
        }
      }
      return newList;
    }

     // 获取多栏目内容
     function getMoreSet(data) {
      // console.log(data);
      //  过滤需要登录的栏目
        // var needLoginData = loginRoad(data);
        getChildNews(data, data.length, 'first');
    }
 
    var totelList ='';

    function runAsync(data, count, list){
      var def = $.Deferred();
      //做一些异步操作
      getData(0,data.length);
      function getData(i,length){
        
          var sId = data[i].id;
          var item = data[i];
          var str1='';
          var set = '';
          var str='';
           var data1={
              catalogId: item.id,
              size:10
            }
            
          $.ajax({
            type: 'GET',
            url:host + urlLink('newList').url,
            data:data1,
            dataType:'json',
            cache:false,
            async:true, //是否异步
            success:function (result1) {
                if (result1.code == 0 && result1.data != null) {
                  var result = result1.data.records;
                  for (var index = 0; index < result.length; index++) {
                    if (index == 0) {
                        str1= '<div class="shine-detail" id="fNews-' + i + list +'">'+
                        '<a href="./newDetail.html?id=' + result[index].id + '&pId=' + sId+'" target="_blank" style="color:#494848">'+
                          '<h3>'+result[index].title+'</h3>'+
                       '</a>'+
                        '<a href="./newDetail.html?id=' + result[index].id + '&pId=' + sId+'" target="_blank">[详情]</a>'+
                      '</div>'
                    
                    } else {
                      var url = './newDetail.html?id=' + result[index].id + '&pId=' + sId
                      set += '<li ><a target="_blank" href="' + url + '">' + result[index].title + '</a></li>';
                    }          
                   
                  }
                  if(item.catalogUrl){
                    var tUrl= item.catalogUrl
                  }else{
                    var tUrl= './news.html?id='+sId+'&pId='+uId;
                  }
                  
                    str = 
                    '<li class="shine-set1" style="display:block">'+
                    '<div class=" shine-title" id="setNewList">'+
                      '<div id="topTitle" class="fl">'+item.catalogName+'</div>'+
                      '<a class="fr more" href="'+tUrl+'" target="_blank">更多>></a></div>'+
                    '<div class="" style="padding: 5px 10px;">'+str1+
                    '</div>'+
                    '<ul class="content-list content-min" style="line-height: 38px;">'+set+'</ul>'+
                  '</li>';
      
                } else {
                }
              $('#'+list+'-set').append(str);
              //改变循环结束的位置,为请求完成时
              if(++i<length){
                  getData(i,length)
              }
            },
            error: function() {
              console.log("Error");
              showMessage("数据请求失败 , 请稍后再试 !", 0);
            }
        });
      return def.promise(); //就在这里调用
    }
  }
   
  
     //获取中部新闻list
     function getChildNews(data, count, list) {
     
      // 兼容IE的promise
      runAsync(data, count, list);
      $('html,body').animate({ scrollTop: 200 }, 'slow');
      // .done(function(d){
      //   console.log("resolve");
      //   console.log(d);

      // }).fail(function(d){
      //   console.log("reject");
      //   console.log(d);

      // })
     
     }
    

  })

