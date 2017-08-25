//－－－－－－－－－－设置登录信息－－－－－－－－－－－－－－－－－
var paraJson=getUrlParams();
console.log(paraJson.usercode);
if (paraJson.usercode && typeof (paraJson.usercode) != "undefined") {
	$.cookie('usercode', paraJson.usercode, { expires: 7, path: '/' });
}
if(paraJson.token && typeof (paraJson.token) != "undefined"){
	$.cookie('account', paraJson.token, { expires: 7, path: '/' }); 
}


//--------------获取url中参数数据--------------
function getUrlParams() {
	var url = window.location.href;
	var index = url.indexOf("?");
	var result = "";
	if (index > 0) {
		var params = url.substr(index + 1).split("&");
		for (var i = 0; i < params.length; i++) {
			var ps = params[i].split("=");
			if (i == 0) {
				result += "{";
			}
			if (i != 0) {
				result += ",";
			}
			if (ps.length == 1) {
				result += "\"" + ps[0] + "\":\"\"";
			} else {
				result += "\"" + ps[0] + "\":\"" + ps[1] + "\"";
			}
			if (i == params.length - 1) {
				result += "}";
			}
		}
	}
	if ("" == result) {
		return "";
	} else {
		return JSON.parse(result);
	}
}