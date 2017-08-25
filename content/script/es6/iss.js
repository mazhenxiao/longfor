class ISS{
  constructor(){
     return this.tools();
  }
  tools(){ //公共组件入口
      var th = this;
      return {
			url:"http://114.251.168.251:28286/birthday/birthdayapi",
			posturl:"http://114.251.168.251:28286/birthday",
			//url:"http://192.168.33.45:28286/birthday/birthdayapi", //接口通用地址
			//posturl:"http://192.168.33.45:28286/birthday",
		 // url:"http://10.239.63.95:8080/birthdayapi",
			imgsrc:"http://worko.longfor.com:59650/workofile/head/",
			imgicon:"http://114.251.168.251:28286/birthday/content/images/ICONS.png",
		//	imgicon:"/content/images/ICONS.png",
		  /*
			 接口说明
			 getOrganization.do   获取区域列表 
			 getBirthdayList.do   获取人员
			 addBirthdayPerson 提交祝福入库
			 getUser.do 获取当前用户
		   */
		  getAPI(name){
			  
			  if(!name){ alert("getAPI没有参数");return ""}
             return this.url+"/"+name;
			},
			getParam:function(arg){
				 return eval("({'"+location.hash.split("?")[1].replace(/^\&/ig,"").split("&").join(",").replace(/\=/ig,"':'").replace(/\,/ig,"','")+"'})")[arg]
					
			},
		  formatTime(da){
			  return da.substr(0,2)+"月"+da.substr(2);
		  },
          diverWidth(){
            var html = document.documentElement;
            var hWidth = html.getBoundingClientRect().width;
             if(hWidth>750){ hWidth=750}
                         html.style.fontSize = hWidth/7.5 + "px";
            
		  },
          use(arg){
            // Object.assign(this,arg);  //全局数据绑定 --android 4.4.4不支持
			// console.log(this);
			Object["assign"]? Object.assign(this,arg):$.extend(this,arg);
			
			},
			/**
			 * 图片加载
			 */
			loadImag:function(ev){
					 let el = new Image(),$els = ev.currentTarget;
							 el.addEventListener("error",function(){
								//console.log("error:"+$els.getAttribute("data-src"));
                  //el.src = this.imgicon;
							 })
							 el.addEventListener("load",function(){
								// console.log("sucess:"+$els.getAttribute("data-src"));
								   $els.src=$els.getAttribute("data-src");
							 })
							 el.src=$els.getAttribute("data-src");
							
							
			},
		  publicMixin:{
			EVENT_IMG_ERROR(ev){
               console.log(ev);
			}
		  },
		  getPlan:function(){
			  let plan = navigator.userAgent;
			      return plan.indexOf("Android")>=0? "Android":navigator.userAgent.indexOf("Mac OS")>-1? "ios":"";
		  },
		  alert:function(arg){
			  var str = '<div class="modal fade" tabindex="-1" role="dialog">\
					<div class="modal-dialog" role="document">\
					  <div class="modal-content">\
						<div class="modal-header">\
						  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
						  <h4 class="modal-title"><%title%></h4>\
						</div>\
						<div class="modal-body">\
						  <p><%content%></p>\
						</div>\
						<div class="modal-footer">\
						  <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>\
						</div>\
					  </div>\
					</div>\
				  </div>',
				   opt = {
					   title:"提示",
					   content:"",
					   ok:$.noop
				   }
				   $.extend(opt,arg);
				   let $ele = $(str.replace(/\<\%title\%\>/ig,opt.title).replace(/\<\%content\%\>/ig,opt.content));
					$("body").append($ele);
					$ele.modal({
						show:true
					}).on("hidden.bs.modal",function(){
						let opts = $(this).data("data");
						opts.ok();
					}).data("data",opt)
					
		  }
		
      }
  }

}

/**
	 *addClass
	 * 扩展原生方法，添加class 移除class和 包含class
	 * str 需要添加 删除 包含的class
	 * 只有contains返回true false
	 */
	HTMLElement.prototype.add=function(str){
		var th = this;
		for(var i = 0; i<arguments.length;i++){
			th.classList.add(arguments[i]);
		}

	}
	HTMLElement.prototype.remove = function(str){

		var th = this;
		for(var i = 0; i<arguments.length;i++){
			th.classList.remove(arguments[i]);
		}
	}
	HTMLElement.prototype.contain = function(str){
		return this.classList.contains(str);
	}
	String.prototype.toTime = function(eq){
		var str = this.toString();
		var eq = eq||":";
		var num = str.lastIndexOf(eq);
		return str.substr(0,num);

	}

	HTMLElement.prototype["trigger"]=crateTriggerTools;
	HTMLDocument.prototype["trigger"]=crateTriggerTools;
	
	function crateTriggerTools(event,data){
		var evt = document.createEvent("Event");
		evt["data"]=data||"";
		evt.initEvent(event,true,true);
		
		this.dispatchEvent(evt);
	}



var iss = new ISS();
window.onresize=function(){ iss.diverWidth(); }
export default iss