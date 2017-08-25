//全局变量
var lxbridge=null;

//window.onerror = function(err) {
//	log('window.onerror: ' + err)
//}

function connectWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) {
		callback(WebViewJavascriptBridge)
	} else {
		document.addEventListener('WebViewJavascriptBridgeReady', function() {
			callback(WebViewJavascriptBridge)
		}, false)
	}
}


//链接龙信客户端接口
connectWebViewJavascriptBridge(function(bridge) {
	function log(message, data) {
		console.log("message"+message+",data:"+data);
	}

	bridge.init(function(message, responseCallback) {
		log('JS got a message', message)
		var data = {
			'Javascript Responds' : 'Wee!'
		}
		log('JS responding with', data)
		responseCallback(data)
	})
	
	lxbridge=bridge;
	
	try{
		lxHandle();
	} catch (e) {
		
	}
	
});
