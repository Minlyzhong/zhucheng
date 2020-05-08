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
        var result = ajaxMethod('topSet', uId);
        console.log(result)
        if (result.code == 0 && result.data != null) {
          //do something
          var data = result.data[0];
          console.log(data)
          //  $('#topName').html(data.catalogName);
          $("#sedStep").html(data.catalogName);
          var set = '<li><a href="index.html"  target="_blank" >首页</a></li>';
          if (data.children.length > 0) {
            data.children.forEach(function (value, index) {
              console.log(value)
           
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
            console.log(set)
            getMoreSet(data.children);
          } else {
            $("#topTitle").html(data.catalogName);
          }
          $("#contentTop").html(set);

        } else {
          //do something
        }
    }



     // 获取多栏目内容
     function getMoreSet(data) {
      console.log(data);
      console.log(data.length);
      // for (var i = 0; i < data.length; i++) {
        getChildNews(data, data.length, 'first');
      // }
    }
 

     //获取中部新闻list
     function getChildNews(data, count, list) {
      var str='';
      for (var i = 0; i < count; i++) {
        // console.log($("#fTitle-" + i + list + " a"))
        console.log(data[i].id) 
        var str1='';
        var set = '';
        var result = getNews(data[i].id)
        for (var index = 0; index < result.length; index++) {
          if (index == 0) {
              str1= '<div class="shine-detail" id="fNews-' + i + list +'">'+
              '<a href="./newDetail.html?id=' + result[index].id + '&pId=' + data[i].id+'" target="_blank" style="color:#494848">'+
                '<h3>'+result[index].title+'</h3>'+
             '</a>'+
              '<a href="./newDetail.html?id=' + result[index].id + '&pId=' + data[i].id+'" target="_blank">[详情]</a>'+
            '</div>'
          
          } else {
            var url = './newDetail.html?id=' + result[index].id + '&pId=' + data[i].id
            set += '<li ><a target="_blank" href="' + url + '">' + result[index].title + '</a></li>';
          }          
         
        }
        if(data[i].catalogUrl){
          var tUrl= data[i].catalogUrl
        }else{
          var tUrl= './news.html?id='+data[i].id+'&pId='+uId;
        }
          
        
          str += 
          '<li class="shine-set1" style="display:block">'+
          '<div class=" shine-title" id="setNewList">'+
            '<div id="topTitle" class="fl">'+data[i].catalogName+'</div>'+
            '<a class="fr more" href="'+tUrl+'" target="_blank">更多>></a></div>'+
          '<div class="" style="padding: 5px 10px;">'+str1+
          '</div>'+
          '<ul class="content-list content-min" style="line-height: 38px;">'+set+'</ul>'+
        '</li>';
        
      }
        $('#'+list+'-set').html(str);
    }

// 获取新闻列表
function getNews(id) {
  var that = this;
  var data = {
    catalogId: id,
    size:10
  }
  var result = ajaxMethod('newList', '', data);
  // console.log(result)
  if (result.code == 0 && result.data != null) {
    //do something
    return result.data.records;
  } else {
    //do something
  }
}

     

    


  })

