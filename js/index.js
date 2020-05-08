$(function () {

  var mId = 0;
  var mPid = 0;
  var topList = {

  };
    getHome();
    getBanner();
    // 获取杂志
    getMagazine();
    // 获取最新下载
    getDownload();

    // 底部下载二维码效果
    $('.bottom-download li').hover(function(e){
      var i = $(this).data('index');
      $('.bottom-img li').css('display','none');
      $('.bottom-img li').eq(i).css('display','block');

        $('.bottom-download li').removeClass('active-down');
        $('.bottom-download li').eq(i).addClass('active-down');
    },function(){
    })
    // 首页中部栏目和新闻效果
    $('.mouse').hover(function(e){
        var i = $(this).data('index');
        var type = $(this).data('type');
        if($('#'+type+'-set .shine-set1 ').eq(i).html()){
        }else{
          var list = topList[type];
          getChildNews(list, i, type);
        }
        $('#'+type+'-set .shine-set1 ').css('display','none');
        $('#'+type+'SetList .mouse ').removeClass('active-hover');
        $('#'+type+'-set .shine-set1 ').eq(i).css('display','block');
        $('#'+type+'SetList .mouse').eq(i).addClass('active-hover');
    },function(){
        // console.log('移出')
    })
    //  悬浮事件 轮播图旁边新闻效果
    $(".left-choice span").hover(function () {
        if ($(this).data('type') == 0) {
          $(".left-choice span").attr('class', '');
          $(".choice").css('display', 'none');
          $("#groupList").css('display', 'block');
          $("#groupNewList").attr('class', 'left-active');
        } else if($(this).data('type') == 1){
          $(".left-choice span").attr('class', '');
          $(".choice").css('display', 'none');
          $("#newNotice").css('display', 'block');
          $("#notice").attr('class', 'left-active');
        }else{
          $(".left-choice span").attr('class', '');
          $(".choice").css('display', 'none');
          $("#newDownload").css('display','block');
          $("#down").attr('class', 'left-active');
        }
      });

  // 获取首页顶部栏目
  function getHome() {
    var result = ajaxMethod('topSet', 80);
    if (result.code == 0 && result.data != null) {
      var data = result.data[0].children;
      var totalData = [];
      var sigleData = [];
      var srt = '';
      for (var index = 0; index < data.length; index++) {
        var value = data[index];
        if(value.children.length == 0){
            sigleData.push(value);
          }
          var newData = new Object({
            id: 0,
            catalogName: '',
            children:[],
            catalogIcon:''
          });
          newData.children = value.children;
          newData.id = value.id;
          newData.catalogName = value.catalogName;
          newData.catalogIcon = value.catalogIcon;
          newData.catalogUrl = value.catalogUrl;
          newData.url = value.catalogUrl;
          totalData.push(newData);
          var str2 = '';
          var pic='images/nav3.png';
          if(newData.catalogUrl){
            var url = newData.catalogUrl;
          }else{
              var url='./newsSed.html?id=' + newData.id + '&pId=' + newData.id;
          }
          newData.url = url;
          if(newData.catalogIcon){
            pic = filePath+newData.catalogIcon;
        }
            srt += '<li><a class="first-'+index+'"  href="'+url+'" target="_blank"><img src="'+pic+'" alt=""><div>'+ newData.catalogName + '</div></a>';
           $('#contentTop').html(srt);
      }
      $('#firstSetListArr').attr('href',totalData[0].url);
      $('#sedSetListArr').attr('href',totalData[1].url);
      $('#thiSetListArr').attr('href',totalData[2].url);
      // 获取单栏目内容
      getsigleDataList(sigleData);
      // 获取多栏目内容
      getMoreSet(totalData);
    } else {
    }
  }

  // 获取单栏目内容
  function getsigleDataList(data) {
    if (data) {
    //单栏目的第一个栏目
      var params = {
        catalogId: data[0].id,
        size:9
      }
      var result1 = ajaxMethod('newList', '', params);
        if (result1.code == 0 && result1.data != null) {
          //do something
          var set = '';
          var listCount = 9;
          var resultList = result1.data.records.slice(0, listCount);
          resultList.forEach(function (value, index) {
            if (index == 0) {
              // 热点内容
              $("#hotTitle").html(value.title);
              if(value.subTitle){
                $("#hotTime").html(value.subTitle);
              }
              $("#hotLink").attr('href', 'newDetail.html?id=' + value.id + '&pId=' + data[0].id);
            }else{
                var url = './newDetail.html?id=' + value.id + '&pId=' + data[0].id;
                var srt = '<li ><a target="_blank" href="' + url + '">' + value.title + '</a></li> ';
                set += srt;
            }
            $("#groupNewList").html(data[0].catalogName);
            $("#groupList").html(set);
            // $("#groupUrl").attr('href', './news.html?id=' + val.id + '&pId=' + val.id);
          })
        }

        // 第二个单栏目
        var params2={
          catalogId: data[1].id,
          size:8
        }
        var result2 = ajaxMethod('newList', '', params2);
        if (result2.code == 0 && result2.data != null) {
          //do something
          var set = '';
          var set2 = '';
          var listCount = 8;
          var resultList2 = result2.data.records.slice(0, listCount);
          resultList2.forEach(function (value, index) {
            var url = './newDetail.html?id=' + value.id + '&pId=' + data[1].id;
            var srt = '<li ><a target="_blank" href="' + url + '">' + value.title + '</a></li> ';
            set += srt;
            $("#notice").attr('data-id', data[1].id);
            $("#newNotice").html(set);
            $("#notice").html(data[1].catalogName);
            $("#noticeMore").attr('href', './news.html?id=' + data[1].id + '&pId=' + data[1].id);
            mPid = data[1].id;
            mId = data[1].id;  
          })    

        } else {
        }
    }
  }

  // 获取多栏目内容
      function getMoreSet(data) {
        // for (var i = 0; i < data.length; i++) {
        //   getFistNew(data[i], i, data[i].id);
        // }
          getFistNew(data[0], 0, data[0].id);
          getFistNew(data[1], 1, data[1].id);
          getFistNew(data[2], 2, data[2].id);
      }
    //   获取前三set
      function getFistNew(data, index, pId) {
        // list=> first, sed , thi  
        if (index != 3) {
          switch (index) {
            case 0:
              $("#firstSet").html(data.catalogName);
              var srt = getList(data.children, pId,'first');
              $("#firstSetList").html(srt);
              $('#firstSetList .mouse').eq(0).addClass('active-hover');
              topList.first = data.children;
              getChildNews(data.children, 0, 'first');
              break;
            case 1:
              $("#sedSet").html(data.catalogName);
              var srt = getList(data.children, pId,'sed');
              $("#sedSetList").html(srt);
              $('#sedSetList .mouse').eq(0).addClass('active-hover');
              topList.sed = data.children;
              getChildNews(data.children, 0, 'sed');
              break;
            case 2:
              $("#thiSet").html(data.catalogName);
              var srt = getList(data.children, pId, 'thi');
              $("#thiSetList").html(srt);
              topList.thi = data.children;
              $('#thiSetList .mouse').eq(0).addClass('active-hover');
              getChildNews(data.children, 0, 'thi');
            default:
          }
        }
      }
    //   获取每一部分的二级栏目
      function getList(data, pId, list) {
        var set = '';
        for (var index = 0; index < data.length; index++) {
          var value = data[index];
            var srt = '<li class="mouse" data-type="'+list+'" data-index="'+index+'" data-id="' + value.id + '">' + value.catalogName + '</li>';
          set += srt;
        }
        return set;
      }
      //获取中部新闻list
      function getChildNews(data, count, list) {
        var str='';
        var str2='';
        var str1='';
        var set = '';
        var result = getNews(data[count].id,'','',true).slice(0, 10);
        for (var index = 0; index < result.length; index++) {
          if (index == 0) {
              str1= '<div class="shine-detail" id="fNews-' + count + list +'">'+
              '<a href="./newDetail.html?id=' + result[index].id + '&pId=' + data[count].id+'" target="_blank" style="color:#494848">'+
                '<h3>'+result[index].title+'</h3>'+
              '</a>'+
              '<a href="./newDetail.html?id=' + result[index].id + '&pId=' + data[count].id+'" target="_blank">[详情]</a>'+
            '</div>'
           
            } else {
              var url = './newDetail.html?id=' + result[index].id + '&pId=' + data[count].id
              set += '<li ><a target="_blank" href="' + url + '">' + result[index].title + '</a></li>';
            }          
            // $('#fNewsList-' + i + list).html(set);
          }
          if(result.length>0){
              str += '<div class="flex-cstyle row" style="padding: 5px 10px;">'+str1+
              '</div>'+
              '<ul class="content-list content-min" style="line-height: 38px;">'+set+'</ul>';
          }else{
            str += '<div class="flex-cstyle row" style="padding: 5px 10px;">'+'暂无相关内容'+'</div>';
          }
          if(count == 0){
            for(var i=0; i<data.length; i++){
              if(i == 0){
                str2 += '<li class="shine-set1" style="display:block">'+
                '</li>';
              }else{
                str2 += '<li class="shine-set1" style="display:none">'+
                '</li>';
              }
            }
            $('#'+list+'-set').html(str2);
            $('#'+list+'-set li').eq(count).html(str);


          }else{
            $('#'+list+'-set .shine-set1').eq(count).html(str);
          }
      }
      // 获取新闻列表
      function getNews(id) {
        var data = {
          catalogId: id,
          size:10
        }
        var result = ajaxMethod('newList', '', data);
        if (result.code == 0 && result.data != null) {
          //do something
          return result.data.records;
        } else {
          //do something
        }
      }

    // 获取最新下载
    function getDownload() {
        var data = {
            size:8
        }
        var result = ajaxMethod('downloadList', '',data,true);
        if (result.code == 0 && result.data != null) {
            //do something
            var set = '';
            var resultList = result.data.records.slice(0, 8);
            resultList.forEach(function (value, index) {
                var url = filePath + value.filePath
                var srt = '<li ><a href="' + url + '" target="_blank" >' + value.title + '</a></li>';
                set += srt
            })
            $("#newDownload").html(set);
            $("#downloadData").html(set);

        } else {
        }
    }
    // 获取杂志
    function getMagazine() {
        var data = {
          size: 6
        }
        var that = this;
        var result = ajaxMethod('magazine', '', data,true);
        if (result.code == 0 && result.data != null) {
          var data = result.data.records;
          var srt1 = '';
          var srt2 = '';
          for (var i = 0; i < data.length; i++) {
              srt2 += '<li><a target="_blank" href="' +data[i].path + '"><img src="' + filePath + data[i].coverPic + '" alt="" ></a></li>';
            // }
            $('#four-set').html(srt2);
          }
        } else {
        }
      }
      
      // 获取顶部banner
       function getBanner() {
       //参数 : 1, 背景图片, 2,头部大图, 3, 中间横图, 4,推荐专题左图, 5,推荐专题右图
         var resultAll = ajaxMethod('bannerList', '','',true);
         if (resultAll.code == 0 && resultAll.data != null){
               var resultAllList={
                 list1:[],
                 list2:[],
                 list3:[],
                 list4:[],
                 list5:[],
               }
               for(var i=0; i<resultAll.data.length;i++){
                 var item = resultAll.data[i];
                 var srt='list'+item.position
                 resultAllList[srt].push(item);       
               }
         // 顶部轮播图         
               var dataImg = resultAllList.list2;
               if (dataImg.length == 1) {
                   var str='';
                   for (var i = 0; i < dataImg.length; i++) {
                       var url = filePath + dataImg[i].bannerPath;
                       if(!dataImg[i].jumpUrl || dataImg[i].jumpUrl==null){
                         str+='<a class="swiper-slide" href="'+dataImg[i].jumpUrl +'" target="_blank" style="pointer-events:none;"><img src="'+url+'" alt="" ></img></a>';
                       }else{
                         str+='<a class="swiper-slide" href="'+dataImg[i].jumpUrl +'" target="_blank"><img src="'+url+'" alt="" style=""></img></a>';
                       }  
                     // style="pointer-events:none;"a标签禁止点击事件
                   }
                 
                   $('.hot-img').html(str);
                   $('#swiperPage').remove();//删除轮播的点
                   // mySwiper.detachEvents();//禁止滑动
     
               }else if(dataImg.length > 0 && dataImg.length != 1){
                   var str='';
                   for (var i = 0; i < dataImg.length; i++) {
                       var url = filePath + dataImg[i].bannerPath;
                       if(!dataImg[i].jumpUrl || dataImg[i].jumpUrl==null){
                         str+='<a class="swiper-slide" href="'+dataImg[i].jumpUrl +'" target="_blank" style="pointer-events:none;" ><img  src="'+url+'" alt=""></img></a>';
                       }else{
                         str+='<a class="swiper-slide" href="'+dataImg[i].jumpUrl +'" target="_blank"><img  src="'+url+'" alt=""></img></a>';
                       }
                   }
                   $('.hot-img').html(str);
     
                   var mySwiper = new Swiper('.container1',{
                       loop: true,
                       autoplay: 3000,
                       pagination : '#swiperPage',
                     }); 
               }
                // 下部长栏
             var dataImg2 = resultAllList.list3;
             if (dataImg2.length == 1) {
                 var str='';
                 for (var i = 0; i < dataImg2.length; i++) {
                     var url = filePath + dataImg2[i].bannerPath;
                     if(!dataImg2[i].jumpUrl || dataImg2[i].jumpUrl==null){
                       str+='<a class="swiper-slide" href="'+dataImg2[i].jumpUrl +'" target="_blank" style="pointer-events:none;"><img src="'+url+'" alt="" ></img></a>';
                     }else{
                       str+='<a class="swiper-slide" href="'+dataImg2[i].jumpUrl +'" target="_blank"><img src="'+url+'" alt="" style=""></img></a>';
                     }  
                   // style="pointer-events:none;"a标签禁止点击事件
                 }
               
                 $('.longImg').html(str);
                 $('#swiperPage2').remove();//删除轮播的点
                 // mySwiper.detachEvents();//禁止滑动
     
             }else if(dataImg2.length > 0 && dataImg2.length != 1){
                 var str='';
                 for (var i = 0; i < dataImg2.length; i++) {
                     var url = filePath + dataImg2[i].bannerPath;
                     if(!dataImg2[i].jumpUrl || dataImg2[i].jumpUrl==null){
                       str+='<a class="swiper-slide" href="'+dataImg2[i].jumpUrl +'" target="_blank" style="pointer-events:none;" ><img  src="'+url+'" alt=""></img></a>';
                     }else{
                       str+='<a class="swiper-slide" href="'+dataImg2[i].jumpUrl +'" target="_blank"><img  src="'+url+'" alt=""></img></a>';
                     }
                 }
                 $('.longImg').html(str);
                 var mySwiper = new Swiper('.container2',{
                       loop: true,
                       pagination : '#swiperPage2',
                       autoplay: 3000,
                     }); 
             }
             var dataImg3 = resultAllList.list4;
             if (dataImg3.length>0) {
                 if (dataImg3.length > 0 ) {
                     var imgUrl = filePath + dataImg3[0].bannerPath
                     $('#special-left img').attr('src', imgUrl);
                     $('#special-left ').attr('href', dataImg3[0].jumpUrl);
                 }
             } else {
               $('#special-left ').css('pointer-events', 'none');
                 //do something
             }
     
             var dataImg4 = resultAllList.list5;
             if (dataImg4.length>0) {
                 if (dataImg4.length > 0) {
                     var imgUrl = filePath + dataImg4[0].bannerPath
                     $('#special-right img').attr('src', imgUrl);
                     $('#special-right').attr('href', dataImg4[0].jumpUrl);
                 }
             } else {
                 //do something
                 $('#special-right ').css('pointer-events', 'none');
             }
                 }
               }
});