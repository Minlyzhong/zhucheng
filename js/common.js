$(function() {
	$(".webs span").hover(function() {
		var type = $(this).data("type");
		$(".webs span").css("background", "none");
		$(this).css("background", "#FAF9F5");
		$(".websites").css("display", "none");
		$(".site" + type).css("display", "block")
	});
	$("#search").on("click",
	function() {
		searchText()
	});
	$(window).keydown(function(e) {
		var key = window.event ? e.keyCode: e.which;
		if (key == 13) {
			var myInput = document.getElementById("searchInput");
			if (myInput == document.activeElement) {
				searchText();
				return false
			}
		}
	});
	function searchText() {
		var text = $("#searchInput").val().replace(/[, ]/g, "");
		if (text) {
			var searchUrl = encodeURI("./search.html?searchText=" + text);
			window.open(searchUrl, "")
		} else {
			showMessage("请输入关键字", 0)
		}
    }
    

	getBackground();
	function getBackground() {
       var obj={
            params:1
       }
        httpService.httpServer('banner',obj).then(function(data){
            if (data.code == 0 && data.data != null) {
                if (data.data.length > 0) {
                    var imgUrl = filePath + data.data[0].bannerPath;
                    $("body").css("backgroundImage", "url(" + imgUrl + ")")
                } else {
                    $("body").css("backgroundImage", "url(images/banner.jpg)")
                }
            } else {
                $("body").css("backgroundImage", "url(images/banner.jpg)")
            }
        })
      
	
	}
	function getNow(s) {
		return s < 10 ? "0" + s: s
	}
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	var date = myDate.getDate();
	var h = myDate.getHours();
	var m = myDate.getMinutes();
	var s = myDate.getSeconds();
	var now = year + "年" + getNow(month) + "月" + getNow(date) + "日";
	$("#nowTime").html(now);
	function AddFavorite(sURL, sTitle) {
		try {
			window.external.addFavorite(sURL, sTitle)
		} catch(e) {
			try {
				window.sidebar.addPanel(sTitle, sURL, "")
			} catch(e) {
				alert("加入收藏失败，请使用Ctrl+D进行添加")
			}
		}
	}
	function setHome(obj, vrl) {
		try {
			obj.style.behavior = "url(#default#homepage)";
			obj.setHomePage(vrl)
		} catch(e) {
			if (window.netscape) {
				try {
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
				} catch(e) {
					alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。")
				}
				var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
				prefs.setCharPref("browser.startup.homepage", vrl)
			}
		}
	}
});