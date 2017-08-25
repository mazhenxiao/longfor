import React from 'react';
import ReactDOM from 'react-dom';
import iss from "./iss.js"; //公共组件
//===============================数据层
var $$data = {
    list: []  //"0822"
},
myScroll,loadingTxt;
class APP extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = $$data; //初始化数据
      
    }
    componentWillMount() {
        var th = this;
        document.addEventListener("$$EVENT_menuList",ev=>{
            th.getFatch(ev.data);//异步获取数据
        })
    }
    componentDidMount() {
        this.Event_addEventScroll();
        this.loadinit();
    }

  
    //事件
    loadinit(){
        var th = this;
        var url = iss.getAPI("getUser.do");
        console.log(url);
        $.post(url,{username:paraJson.usercode})
         .done(da=>{
             var $da = typeof da=="string"? JSON.parse(da):da;
             reginarg=$da.data.regionAll;
             th.getFatch({name:$da.data.regionAll})
         })
    }
    setULWidth(){
        //每次刷新视图调用
        setTimeout(function(){
            myScroll.refresh();
        })
     }
    Event_click_labelBar(ev){
        var $el = ev.currentTarget,$$el = $($el),input =  $$el.find("input:checkbox");
            input.click();
            input.prop("checked")? $$el.addClass("active"):$$el.removeClass("active");
            ev.stopPropagation();
    }
    Event_click_postBithday(ev) { //送上生日祝福
       // iss.hashHistory.push("/gift")
     //  console.log(this);
     var th = this;
       let list = this.Event_getCheckedData();
       th.Event_postJAJA(list,1);
    
    }
    Event_postJAJA(list,num){ //提交数据
      
        if(list.length<=0){
            iss.alert({ 
                content:"请选择过生日人员！",
                ok:function(){ console.log("关闭")
            }
        });
            return;
        }
        iss.hashHistory.push({
            pathname:num==1? "gift":"postCoin",
            state:{"list":list,type:num}
        })
    }
    Event_click_postLongCoin(ev) { //发龙币表示一下
        let th = this;
        let list = this.Event_getCheckedData();
        th.Event_postJAJA(list,2);
    }
    Event_getCheckedData(){  //获取选中数据
        let list = document.querySelectorAll("input:checked");
        let da = [];
        for(var i = 0 ; i<list.length;i++){
            var id = list[i].getAttribute("data-id");
            da.push(this.state.list.filter((da,ind)=>{
                if(da.id==id){ return da}
             })[0])
        }
      
       return da;
    }
    Event_addEventScroll() { //绑定滚动
          myScroll = new iScroll('wrapper', {
            snap: true,
			momentum: false,
			vScroll:false,
			hScroll:true,
            hScrollbar:false,
            checkDOMChanges:true
        });
 
    }
    getFatch(da) {
        var th = this;
        $.post(iss.getAPI("getBirthdayList.do"),{"region":(da.name),"account":$.cookie("account"),"usercode":$.cookie("usercode")})
         .done(function(da){
            var $da = (typeof da=="string")? JSON.parse(da):da;
            if($da.length<=0){ loadingTxt="暂无人过生日，请选择其他区域！"}
            if($da.code==0&&$da["data"]&&$da["data"].length){
                 reginarg=$da.data[0].region;
                 lxHandle();
                 th.setState({
                    "list":$da.data
                 })
                 th.setULWidth()
            }
            
            th.refs.appFootbtn.classList.remove("hide");
         })
         .fail(function(){
            
         })
        
         

    }

    render() {
        
        var list,plist=[],num=0,th = this;
        if(this.state.list.length<=0){ list = <li className="tootip">{loadingTxt||"数据加载中请稍后。。。"}</li>}else{

            this.state.list.forEach(($d,$i)=>{
                plist[num]=plist[num]||[];
                plist[num].push($d);
                if(($i+1)%6==0){ num+=1; }
            })
           // console.log(plist)
           this.refs.postcardUl.style.width=(plist.length*6.9)+"rem";
            list= plist.map(function (da, ind) {

                  return <li key={ind} ><ul className="childUL">
                      {
                        da.map(($d,$i)=>{
                            return <li key={$i} onClick={th.Event_click_labelBar.bind(this)}>
                                <p className="label">
                                     <span className="clip"><img onLoad={iss.loadImag.bind(this)}  data-src={iss.imgsrc+$d.headIcon+".jpg"} src={iss.imgicon} /></span>
                                     <input type="checkbox" data-id={$d.id}  defaultChecked={$d.status==0? false:true} className="radio" name="postcardListImage" />
                                </p>
                                <p className="postcard-ul-txt" data-guid={$d.identityCard}>{$d.truename}</p>
                                <p className="postcard-ul-txtDate">{iss.formatTime($d.birthayTime)}</p>
                            </li>
                        })
                      }
                      </ul>
                  </li>
              /*   <li key={ind} onClick={th.Event_click_labelBar.bind(this)}>
                <p className="label">
                    <span className="clip"><img onLoad={iss.loadImag.bind(this)}  data-src={iss.imgsrc+da.headIcon+".jpg"} src={iss.imgicon} /></span>
                    <input type="checkbox" data-id={da.id}  defaultChecked={da.status==0? false:true} className="radio" name="postcardListImage" />
                </p>
                <p className="postcard-ul-txt" data-guid={da.identityCard}>{da.truename}</p>
                <p className="postcard-ul-txtDate">{iss.formatTime(da.birthayTime)}</p>
                </li> */
        });
    }
        return (<div className="postcard">
            <article id="wrapper" className="postcard-scrollbox">
              
                <ul className="postcard-ul" ref="postcardUl">
                    {list}
                </ul>
             
            </article>
            <footer className="text-center footer hide" ref="appFootbtn">
                <button id="Event_postBithday" onClick={this.Event_click_postBithday.bind(this)} className="btn btn-primary">送上生日祝福</button>
                <button id="Event_postLongCoin" onClick={this.Event_click_postLongCoin.bind(this)} className="btn tn btn-warning mgL70">发龙币表示一下</button>
              
            </footer>
        </div>)
    }

}



export default APP;
