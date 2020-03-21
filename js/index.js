$(function(){

    
    
    // getHome();
    getBanner();
    getDownload();
    getNotice();
    // getNewsDetail();
    // getNews();
    getQuest();
    //获取视频
    getVideo();


    // $('.more').click(function(){

    //     var id = $(this).data('id');
    //     console.log($(this).data('id'))
    //     goDetailIndex(id);
    // })

    
   
    
    // 页面跳转
    function goDetailIndex(ind){
        console.log(ind);
        var id = ind;
        
        url='./news.html';
        // 在本页打开
        // location.href = url
        // 打开新页面
        window.open(url,"","id="+id);  
    
      }
      

// 获取顶部banner
function getBanner(){
              
               
    var that = this;
    var result=ajaxMethod('banner',1);
    // console.log(result)
    
        if (result.code == 0 && result.data != null) {
            //do something
            // console.log('11111');
            var imgUrl = filePath + result.data[0].bannerPath
            $('.hot-img img').attr('src',imgUrl);
              
             
             
            
        } else {
            //do something
        }
    
   
}
// 获取视频

function getVideo(){
              
               
    var that = this;
    var result=ajaxMethod('banner',1);
    console.log(result)
    
        if (result.code == 0 && result.data != null) {
            //do something
            console.log('11111');
            var imgUrl = filePath + result.data[0].bannerPath
            $('.hot-img img').attr('src',imgUrl);
              
             
             
            
        } else {
            //do something
        }
    
   
}


// 获取党务问答
function getQuest(){
              
               
    var that = this;
   
    var result=ajaxMethod('question','');
    // console.log(result)
    
        if (result.code == 0 && result.data != null) {
            //do something
          
             //do something
             var set='';
             var resultList = result.data.records.slice(0,5)
             resultList.forEach(function(value, index ){
                //  console.log(value)
                //  var url = './newsDetail.html?id='+value.id+'&pId='+parentId
                 var url = './newsDetail.html?id='+value.id;
                 var srt='<li ><a target="_blank" href="'+url+'">'+value.questions+'</a></li> ';
                 set += srt
 
                 
               })
            //    console.log(set)
            //    $('#quest').html(set);
               document.getElementById("quest").innerHTML = set;

            
             
            
        } else {
            //do something
        }
    
   
}



function getNotice(){

}

// 获取最新下载
function getDownload(){
    

    var that = this;
    var data={

    }
    var result=ajaxMethod('downloadList','');
    // console.log(result)
    
        if (result.code == 0 && result.data != null) {
            //do something
            var set='';
            var resultList = result.data.records.slice(0,4);
            resultList.forEach(function(value, index ){
                // console.log(value)
                var url = filePath + value.filePath
                var srt='<li ><a href="'+url+'" target="_blank" >'+value.title+'</a></li>';
                set += srt

                
              })
            //   console.log(set)
              document.getElementById("newDownload").innerHTML = set;
              document.getElementById("downloadData").innerHTML = set;
            //   $('#newDownload').html(set);
            //   $('#downloadData').html(set);
          
             
             
            
        } else {
            //do something
        }
    
   
}
 // 获取新闻详情
 function getNewsDetail(){
              
               
    var that = this;

    var result=ajaxMethod('newDetail',2980);
    // console.log(result)
    
        if (result.code == 0 && result.data != null) {
            //do something
          
             
             
            
        } else {
            //do something
        }
    
   
}




});