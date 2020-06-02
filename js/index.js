$(function() {
	var mId = 0;
	var mPid = 0;
	var topList = {};
	
	
	function getHome() {
		var result = ajaxMethod("topSet", 80,'',false);
		if (result.code == 0 && result.data != null) {
			var data = result.data[0].children;
			// 有二级栏目的数组
			var totalData = [];

			var needLoginData = [];
			// 没有二级栏目的数组
			var sigleData = [];
			var srt = "";
			for (var index = 0; index < data.length; index++) {
				var value = data[index];
				if (value.children.length == 0) {
					sigleData.push(value)
				}
				var newData = new Object({
					id: 0,
					catalogName: "",
					children: [],
					catalogIcon: ""
				});
				newData.children = value.children;
				newData.id = value.id;
				newData.catalogName = value.catalogName;
				newData.catalogIcon = value.catalogIcon;
				newData.catalogUrl = value.catalogUrl;
				newData.url = value.catalogUrl;
				if(newData.children.length>0){
					totalData.push(newData);
				}

			

				
				var str2 = "";
				var pic = "images/nav3.png";
				if (newData.catalogUrl) {
					var url = newData.catalogUrl
				} else {
					var url = "./newsSed.html?id=" + newData.id + "&pId=" + newData.id
				}
				newData.url = url;
				if (newData.catalogIcon) {
					pic = filePath + newData.catalogIcon
				}
				for (var ind = 0; ind < newData.children.length; ind++) {
					var val = newData.children[ind];
					var needLog = false;
					if (val.catalogUrl && val.catalogUrl.indexOf(".html") != -1) {
						var sUrl = val.catalogUrl;
					} else {
						if(val.catalogUrl){
							needLog = true;
						}
						// var sUrl = "./news.html?id=" + val.id + "&pId=" + val.id;
						var sUrl = './news.html?id=' + val.id + '&pId=' + val.parentId;
					}
						// 二级栏目列表
						str2 += '<li>' +
						  '<a class="sedList" data-log="'+needLog+'"  href="' + sUrl + '" data-id="' + val.id + '" target="_blank">' + val.catalogName + ' </a> '
						  + '</li>';
		
				  }
				  console.log('newData.children == 0')
				  console.log(newData.children)
				if(newData.children.length == 0){
					  srt += '<li><a class="first-' + index + '"  href="' + url + '" target="_blank"><img src="' + pic + '" alt=""><div>' + newData.catalogName + "</div></a>";
				  }else{
					  srt += '<li><a class="first-' + index + '"  href="' + url + '" target="_blank"><img src="' + pic + '" alt=""><div>' + newData.catalogName + '</div></a><ul >' + str2 + '</ul>'+
					    '</li>' ;
				  }
				$("#contentTop").html(srt)

				// $('.sedList').on
				$(".sedList").on("click",
					function(e) {
						var needLogin = $(this).data("log");
						console.log('needLogin');
						console.log(needLogin);
						// 登录后才能看
						if(needLogin){
						showMessage("需要登录账户后才可查看相关内容", 0);
						// a禁止跳转

						return false;
						
						}
						


					});
			}
			$("#firstSetListArr").attr("href", totalData[0].url);
			$("#sedSetListArr").attr("href", totalData[1].url);
			$("#thiSetListArr").attr("href", totalData[2].url);
			$("#fineSetListArr").attr("href", totalData[3].url);
			$("#sixSetListArr").attr("href", totalData[4].url);
			console.log('totalData')
			console.log(totalData)
			getSigleDataList(sigleData);
			// 刷选需要登录的栏目
			// 登录后用totalData, 
			getMoreSet(totalData)
		} else {}
	}
	function getSigleDataList(data) {
		if (data) {
			var obj1 ={
				data: {
					catalogId: data[0].id,
					size: 9
				}
			}
			httpService.httpServer('newList',obj1).then(function(result1){
				if (result1.code == 0 && result1.data != null) {
					var set = "";
					var listCount = 9;
					var resultList = result1.data.records.slice(0, listCount);
					resultList.forEach(function(value, index) {
						if (index == 0) {
							$("#hotTitle").html(value.title);
							if (value.subTitle) {
								$("#hotTime").html(value.subTitle)
							}
							$("#hotLink").attr("href", "newDetail.html?id=" + value.id + "&pId=" + data[0].id)
						} else {
							var url = "./newDetail.html?id=" + value.id + "&pId=" + data[0].id;
							var srt = '<li ><a target="_blank" href="' + url + '">' + value.title + "</a></li> ";
							set += srt
						}
						$("#groupNewList").html(data[0].catalogName);
						$("#groupList").html(set)
					})
				}
			})
			var obj2={
				data:{
					catalogId: data[1].id,
					size: 8	
				}
			}
			httpService.httpServer('newList',obj2).then(function(result2){
				if (result2.code == 0 && result2.data != null) {
					var set = "";
					var set2 = "";
					var listCount = 8;
					var resultList2 = result2.data.records.slice(0, listCount);
					resultList2.forEach(function(value, index) {
						var url = "./newDetail.html?id=" + value.id + "&pId=" + data[1].id;
						var srt = '<li ><a target="_blank" href="' + url + '">' + value.title + "</a></li> ";
						set += srt;
						$("#notice").attr("data-id", data[1].id);
						$("#newNotice").html(set);
						$("#notice").html(data[1].catalogName);
						$("#noticeMore").attr("href", "./news.html?id=" + data[1].id + "&pId=" + data[1].id);
						mPid = data[1].id;
						mId = data[1].id
					})
				} else {}
			})
		}
	}
	function loginRoad(data){
		// console.log('过滤需要登录的栏目')
		// console.log(data);
		// console.log(data.children);
		var sonData = data.children;
		var newList =[];
		for(var i=0; i<sonData.length; i++){
			console.log(sonData[i])
			console.log(sonData[i].catalogUrl == 'login')
			if(sonData[i].catalogUrl != 'login'){
				newList.push(sonData[i]);
			}
		}
		data.children = newList
		// console.log(newList)

		return data;
		
	}
	function getMoreSet(data) {
		
		// 过滤需要登录的栏目
		var data1 = loginRoad(data[0]);
		var data2 = loginRoad(data[1]);
		var data3 = loginRoad(data[2]);
		var data4 = loginRoad(data[3]);
		var data5 = loginRoad(data[4]);
		getFistNew(data1, 0, data[0].id);
		getFistNew(data2, 1, data[1].id);
		getFistNew(data3, 2, data[2].id);
		getFistNew(data4, 3, data[3].id);
		getFistNew(data5, 4, data[4].id);
	}
	function getFistNew(data, index, pId) {
			switch (index) {
			case 0:
				$("#firstSet").html(data.catalogName);
				var srt = getList(data.children, pId, "first");
				$("#firstSetList").html(srt);
				$("#firstSetList .mouse").eq(0).addClass("active-hover");
				topList.first = data.children;
				getChildNews(data.children, 0, "first");
				break;
			case 1:
				$("#sedSet").html(data.catalogName);
				var srt = getList(data.children, pId, "sed");
				$("#sedSetList").html(srt);
				$("#sedSetList .mouse").eq(0).addClass("active-hover");
				topList.sed = data.children;
				getChildNews(data.children, 0, "sed");
				break;
			case 2:
				$("#thiSet").html(data.catalogName);
				var srt = getList(data.children, pId, "thi");
				$("#thiSetList").html(srt);
				topList.thi = data.children;
				$("#thiSetList .mouse").eq(0).addClass("active-hover");
				getChildNews(data.children, 0, "thi");
				break;
			case 3:
				$("#fineSet").html(data.catalogName);
				var srt = getList(data.children, pId, "fine");
				$("#fineSetList").html(srt);
				topList.fine = data.children;
				$("#fineSetList .mouse").eq(0).addClass("active-hover");
				getChildNews(data.children, 0, "fine");
				break;
			case 4:
				$("#sixSet").html(data.catalogName);
				var srt = getList(data.children, pId, "six");
				$("#sixSetList").html(srt);
				topList.six = data.children;
				$("#sixSetList .mouse").eq(0).addClass("active-hover");
				getChildNews(data.children, 0, "six");
				break;
			default:
			}
	}
	function getList(data, pId, list) {
		var set = "";
		for (var index = 0; index < data.length; index++) {
			var value = data[index];
			if(value.catalogUrl && value.catalogUrl.indexOf(".html") != -1 || !value.catalogUrl){
				// 没有需要登录的二级栏目
				if(list == 'sed' || list == 'thi'){
					if(index < 3){
						var srt = '<li class="mouse" data-type="' + list + '" data-index="' + index + '" data-id="' + value.id + '">' + value.catalogName + "</li>";
						set += srt;
					}
				}else{
					var srt = '<li class="mouse" data-type="' + list + '" data-index="' + index + '" data-id="' + value.id + '">' + value.catalogName + "</li>";
					set += srt;
				}
			}
			
			
		}
		return set
	}
	function getChildNews(data, count, list) {
        
        var dId = data[count].id;
		var str = "";
		var str2 = "";
		var str1 = "";
		var set = "";
		console.log('list')
		console.log(list)
		if(list == 'fine'){
			var obj = {
				data:{
					catalogId: dId,
					size: 6
				},
			}
		}else if(list == 'six'){
			var obj = {
				data:{
					catalogId: dId,
					size: 8
				},
			}
		}else{
			var obj = {
				data:{
					catalogId: dId,
					size: 10
				},
			}
		}

       
        httpService.httpServer('newList',obj).then(function(data1){
            var result = data1.data.records;
            for (var index = 0; index < result.length; index++) {
                if (index == 0) {
                    str1 = '<div class="shine-detail" id="fNews-' + count + list + '">' + '<a href="./newDetail.html?id=' + result[index].id + "&pId=" + dId + '" target="_blank" style="color:#494848">' + "<h3>" + result[index].title + "</h3>" + "</a>" + '<a href="./newDetail.html?id=' + result[index].id + "&pId=" + dId + '" target="_blank">[详情]</a>' + "</div>"
                } else {
                    var url = "./newDetail.html?id=" + result[index].id + "&pId=" + dId;
                    set += '<li ><a target="_blank" href="' + url + '">' + result[index].title + "</a></li>"
                }
            }
            if (result.length > 0) {
                str += '<div class="flex-cstyle row" style="padding: 5px 10px;">' + str1 + "</div>" + '<ul class="content-list content-min" style="line-height: 39px;">' + set + "</ul>"
            } else {
                str += '<div class="flex-cstyle row" style="padding: 5px 10px;">' + "暂无相关内容" + "</div>"
            }
            if (count == 0) {
                for (var i = 0; i < data.length; i++) {
                    if (i == 0) {
                        str2 += '<li class="shine-set1" style="display:block">' + "</li>"
                    } else {
                        str2 += '<li class="shine-set1" style="display:none">' + "</li>"
                    }
                }
                $("#" + list + "-set").html(str2);
                $("#" + list + "-set li").eq(count).html(str)
            } else {
                $("#" + list + "-set .shine-set1").eq(count).html(str)
            }
        })

		
	}
    
	function getDownload() {
        var obj = {
            data:{
                size: 8,
                current:1
            }
        };
        
        httpService.httpServer('downloadList',obj).then(function(data){
            if (data.code == 0 && data.data != null) {
            	var set = "";
            	var resultList = data.data.records.slice(0, 8);
            	resultList.forEach(function(value, index) {
            		var url = filePath + value.filePath;
            		var srt = '<li ><a href="' + url + '" target="_blank" >' + value.title + "</a></li>";
            		set += srt
            	});
            	$("#newDownload").html(set);
            	$("#downloadData").html(set)
            } else {}
        })
        
	}

	

	function getMagazine() {
		var obj = {
            data:{
                size: 6
            }
			
        };

        httpService.httpServer('magazine',obj).then(function(data){
            if (data.code == 0 && data.data != null) {
                var data = data.data.records;
                var srt1 = "";
                var srt2 = "";
                for (var i = 0; i < data.length; i++) {
                    srt2 += '<li><a target="_blank" href="' + data[i].path + '"><img src="' + filePath + data[i].coverPic + '" alt="" ></a></li>';
                    $("#four-set").html(srt2)
                }
                } else {}
        })
		
	}
	function getBanner() {
		//参数 : 1, 背景图片, 2,头部大图, 3, 中间横图, 4,推荐专题左图, 5,推荐专题右图 6.顶部热点轮播图
        httpService.httpServer('bannerList','').then(function(data){
            if (data.code == 0 && data.data != null) {
                var resultAllList = {
                    list1: [],
                    list2: [],
                    list3: [],
                    list4: [],
                    list5: [],
                    list6: [],
                };
                for (var i = 0; i < data.data.length; i++) {
                    var item = data.data[i];
                    var srt = "list" + item.position;
                    resultAllList[srt].push(item)
                }
                var dataImg = resultAllList.list2;
                if (dataImg.length == 1) {
                    var str = "";
                    for (var i = 0; i < dataImg.length; i++) {
                        var url = filePath + dataImg[i].bannerPath;
                        if (!dataImg[i].jumpUrl || dataImg[i].jumpUrl == null) {
                            str += '<a class="swiper-slide" href="' + dataImg[i].jumpUrl + '" target="_blank" style="pointer-events:none;"><img src="' + url + '" alt="" ></img></a>'
                        } else {
                            str += '<a class="swiper-slide" href="' + dataImg[i].jumpUrl + '" target="_blank"><img src="' + url + '" alt="" style=""></img></a>'
                        }
                    }
                    $(".hot-img").html(str);
                    $("#swiperPage").remove()
                } else {
                    if (dataImg.length > 0 && dataImg.length != 1) {
                        var str = "";
                        for (var i = 0; i < dataImg.length; i++) {
                            var url = filePath + dataImg[i].bannerPath;
                            if (!dataImg[i].jumpUrl || dataImg[i].jumpUrl == null) {
                                str += '<a class="swiper-slide" href="' + dataImg[i].jumpUrl + '" target="_blank" style="pointer-events:none;" ><img  src="' + url + '" alt=""></img></a>'
                            } else {
                                str += '<a class="swiper-slide" href="' + dataImg[i].jumpUrl + '" target="_blank"><img  src="' + url + '" alt=""></img></a>'
                            }
                        }
                        $(".hot-img").html(str);
                        var mySwiper = new Swiper(".container1", {
                            loop: true,
                            autoplay: 3000,
                            pagination: "#swiperPage",
                        })
                    }
                }
                var dataImg2 = resultAllList.list3;
                if (dataImg2.length == 1) {
                    var str = "";
                    for (var i = 0; i < dataImg2.length; i++) {
                        var url = filePath + dataImg2[i].bannerPath;
                        if (!dataImg2[i].jumpUrl || dataImg2[i].jumpUrl == null) {
                            str += '<a class="swiper-slide" href="' + dataImg2[i].jumpUrl + '" target="_blank" style="pointer-events:none;"><img src="' + url + '" alt="" ></img></a>'
                        } else {
                            str += '<a class="swiper-slide" href="' + dataImg2[i].jumpUrl + '" target="_blank"><img src="' + url + '" alt="" style=""></img></a>'
                        }
                    }
                    $(".longImg").html(str);
                    $("#swiperPage2").remove();
                } else {
                    if (dataImg2.length > 0 && dataImg2.length != 1) {
                        var str = "";
                        for (var i = 0; i < dataImg2.length; i++) {
                            var url = filePath + dataImg2[i].bannerPath;
                            if (!dataImg2[i].jumpUrl || dataImg2[i].jumpUrl == null) {
                                str += '<a class="swiper-slide" href="' + dataImg2[i].jumpUrl + '" target="_blank" style="pointer-events:none;" ><img  src="' + url + '" alt=""></img></a>'
                            } else {
                                str += '<a class="swiper-slide" href="' + dataImg2[i].jumpUrl + '" target="_blank"><img  src="' + url + '" alt=""></img></a>'
                            }
                        }
                        $(".longImg").html(str);
                        var mySwiper = new Swiper(".container2", {
                            loop: true,
                            pagination: "#swiperPage2",
                            autoplay: 3000,
                        })
                    }
                }
                var dataImg3 = resultAllList.list4;
                if (dataImg3.length > 0) {
                    if (dataImg3.length > 0) {
                        var imgUrl = filePath + dataImg3[0].bannerPath;
                        $("#special-left img").attr("src", imgUrl);
                        $("#special-left ").attr("href", dataImg3[0].jumpUrl)
                    }
                } else {
                    $("#special-left ").css("pointer-events", "none")
                }
                var dataImg4 = resultAllList.list5;
                if (dataImg4.length > 0) {
                    if (dataImg4.length > 0) {
                        var imgUrl = filePath + dataImg4[0].bannerPath;
                        $("#special-right img").attr("src", imgUrl);
                        $("#special-right").attr("href", dataImg4[0].jumpUrl)
                    }
                } else {
                    $("#special-right ").css("pointer-events", "none")
				}

				// 顶部热点轮播图
				var dataImg5 = resultAllList.list6;
				console.log('resultAllList')
				console.log(resultAllList)
				console.log(dataImg5)
                if (dataImg5.length == 1) {
                    var str = "";
                    for (var i = 0; i < dataImg5.length; i++) {
                        var url = filePath + dataImg5[i].bannerPath;
                        if (!dataImg5[i].jumpUrl || dataImg5[i].jumpUrl == null) {
                            str += '<a class="swiper-slide" href="' + dataImg5[i].jumpUrl + '" target="_blank" style="pointer-events:none;"><img src="' + url + '" alt="" ></img></a>'
                        } else {
                            str += '<a class="swiper-slide" href="' + dataImg5[i].jumpUrl + '" target="_blank"><img src="' + url + '" alt="" style=""></img></a>'
                        }
                    }
                    $(".longImg2").html(str);
                    $("#swiperPage3").remove();
                } else {
                    if (dataImg5.length > 0 && dataImg5.length != 1) {
                        var str = "";
                        for (var i = 0; i < dataImg5.length; i++) {
                            var url = filePath + dataImg5[i].bannerPath;
                            if (!dataImg5[i].jumpUrl || dataImg5[i].jumpUrl == null) {
                                str += '<a class="swiper-slide" href="' + dataImg5[i].jumpUrl + '" target="_blank" style="pointer-events:none;" ><img  src="' + url + '" alt=""></img></a>'
                            } else {
                                str += '<a class="swiper-slide" href="' + dataImg5[i].jumpUrl + '" target="_blank"><img  src="' + url + '" alt=""></img></a>'
                            }
						}
						
                        $(".longImg2").html(str);
                        var mySwiper = new Swiper(".container3", {
                            loop: true,
                            pagination: "#swiperPage3",
                            autoplay: 3000,
                        })
					}
					
                }


            }
        })
	}
	getHome();
	getBanner();
	getMagazine();
	getDownload();
	$(".bottom-download li").hover(function(e) {
		var i = $(this).data("index");
		$(".bottom-img li").css("display", "none");
		$(".bottom-img li").eq(i).css("display", "block");
		$(".bottom-download li").removeClass("active-down");
		$(".bottom-download li").eq(i).addClass("active-down")
	},
	function() {});
	$(".mouse").hover(function(e) {
		// console.log('111');
		var i = $(this).data("index");
		var type = $(this).data("type");
		console.log(type);
		if ($("#" + type + "-set .shine-set1 ").eq(i).html()) {} else {
			var list = topList[type];
			getChildNews(list, i, type)
		}
		$("#" + type + "-set .shine-set1 ").css("display", "none");
		$("#" + type + "SetList .mouse ").removeClass("active-hover");
		$("#" + type + "-set .shine-set1 ").eq(i).css("display", "block");
		$("#" + type + "SetList .mouse").eq(i).addClass("active-hover")
	},
	function() {});
	$(".left-choice span").hover(function() {
		if ($(this).data("type") == 0) {
			$(".left-choice span").attr("class", "");
			$(".choice").css("display", "none");
			$("#groupList").css("display", "block");
			$("#groupNewList").attr("class", "left-active")
		} else {
			if ($(this).data("type") == 1) {
				$(".left-choice span").attr("class", "");
				$(".choice").css("display", "none");
				$("#newNotice").css("display", "block");
				$("#notice").attr("class", "left-active")
			} else {
				$(".left-choice span").attr("class", "");
				$(".choice").css("display", "none");
				$("#newDownload").css("display", "block");
				$("#down").attr("class", "left-active")
			}
		}
	});

});