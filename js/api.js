/* ***************************incoming*********************************** */


//页面所有的请求路由
function urlLink(str){
    var url = {
       //首页顶部栏目
        topSet:{
            method:'get',
            url:'/site/plate/',

        },
        //获取所有网站banner信息(params位置)
        banner:{
            method:'get',
            url:'/site/banner/list/'
        },
        //通过ID获取新闻的详细内容
        newDetail:{
            method:'get',
            url:'/site/news/'
        },
        //分页查询最新下载列表
        downloadList:{
            method:'get',
            url:'/site/downLoad/list'
        },
        //分栏目查询对应的栏目新闻
        newList:{
            method:'get',
            url:'/site/news/findAll'
        },
          //分页获取网站QA问答信息
          question:{
            method:'get',
            url:'/site/question'
        },
          //分页获取网站QA问答详情
          questionDetail:{
            method:'get',
            url:'/site/question/'
        },

        // 分页获取杂志列表
        magazine:{
            method:'get',
            url:'/site/magazine/list'
        },

          //分页获取影展列表
          filmFestival:{
            method:'get',
            url:'/site/filmFestival/list'
        },

        //分页获取影展列表
        filmFestivalDetail:{
            method:'get',
            url:'/site/filmFestival/'
        },
     
    };
    return url[str];

}

  

    //调用请求方法时
// var data={
//     phone:17328728XXX,
//     password:123456
// };
// var result=ajaxMethod('login',data);


// 获取顶部banner
// function getBanner(){
              
               
//     let that = this;
//     var result=ajaxMethod('banner',1);
//     console.log(result)
    
//         if (result.code == 0 && result.data != null) {
//             //do something
//             console.log('11111');
//             $('.hot-img img').attr('src',aa);
              
             
             
            
//         } else {
//             //do something
//         }
    
   
// }



