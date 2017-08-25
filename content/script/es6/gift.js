import React from 'react';
import ReactDOM from 'react-dom';
import iss from "./iss.js"; //公共组件
//===============================数据层
var $$data = {
    textarea: "生日快乐~",  //编辑内容默认
    activeList: [], //默认点中图片
    list: [
        { id: 0, src: "http://worko.longfor.com:59650/workofile/icon/birthday1.png", bigsrc: "http://worko.longfor.com:59650/workofile/icon/birthday1.png" },
        { id: 1, src: "http://worko.longfor.com:59650/workofile/icon/birthday2.png", bigsrc: "http://worko.longfor.com:59650/workofile/icon/birthday2.png" },
        { id: 2, src: "http://worko.longfor.com:59650/workofile/icon/birthday3.png", bigsrc: "http://worko.longfor.com:59650/workofile/icon/birthday3.png" },
        { id: 3, src: "http://worko.longfor.com:59650/workofile/icon/birthday4.png", bigsrc: "http://worko.longfor.com:59650/workofile/icon/birthday4.png" },
        { id: 4, src: "http://worko.longfor.com:59650/workofile/icon/birthday5.png", bigsrc: "http://worko.longfor.com:59650/workofile/icon/birthday5.png" }
    ]
}
class INFO extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = $$data; //初始化数据
        console.log(iss.posturl+"/#/giftInfo");
    }

    componentWillMount() {
     //  let $da = this.props.location.state;//传入数据
        this.getFatch();//异步获取数据
        
    }
    componentDidMount() {
        document.documentElement.style.background = "#fff";
        document.body.style.background = "#fff";
        this.addEvent_scroll();
        
    }
    //事件
    addEvent_scroll() {  //绑定滚动
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 5
        });
    }
    Event_keyUp_Textarea(ev) {  //失去焦点
        var v = ev.target.value
        var th = this;
        if(v.length>25){
            let t = v.substr(0,24);
             ev.target.value=t;
            th.setState({"textarea":t});
        }else{
            th.setState({"textarea":v});
        }
        
    }
    Event_click_Edit(ev) { //点击编辑
        this.refs.textarea.removeAttribute("readonly");
        this.refs.textarea.focus();
        this.refs.giftReadonly.add("hide");
    }
    Event_click_Slid(ev) { //点击图片
        var th = this, ele = ev.currentTarget, id = ele.getAttribute("data-guid");
        var list = this.state.list.filter(function (da, ind) { if (da["id"] == id) { return true } });
        th.setState({ "activeList": list[0] });
        this.refs.giftImge.src = list[0]["bigsrc"];
        $(ele.parentNode.childNodes).each(function(index,eles){
            eles.remove("active") 
        })
        //ele.parentNode.childNodes.forEach(function (eles, index) { eles.remove("active") });
        ele.add("active");
    }
    Event_click_Submit(ev) { //表单提交
        var th = this;
        let src = (this.state.activeList),
            txt = (this.state.textarea),
            da =   this.props.location.state;//传入数据
            let username =[];
             da.list.forEach((d,i)=>{
                username.push(d["username"]);
            }) 

           $.post(iss.getAPI("addBirthdayPerson.do"),{"usernames":username.join(","),"type":da.type,"content":txt,"giftType":src.src})
            .done(da=>{ 
                //送上礼物成功后回调
             // console.log(da);
             var $da = typeof da =="string"? JSON.parse(da):da;
             if($da.code==-1){
                 iss.alert({
                     content:"提交失败！"
                 })
             }else{
                th.toAPP($da);
             }
              
            })
            .fail(er=>{
               console.log(er);
            })
        
    }
    toAPP(arg){
       // console.log(this.state);
       var th = this;
        var name = [];
        arg.data.forEach((dd,ii)=>{
         
                 name.push({"usercode":dd.username,  //人员
                 "message":{
                     "msgType":"8485655c-6770-11e7-907b-a6006ad3esdq", //写死
                     "topTitle":"生日提醒", //写死
                     "centerWords":th.state.textarea,  //输入文字
                     "centerImg":th.state.activeList.src,  //选中图片
                     "centerKeyvals":[],
                     "fromName":dd.giftId,
                     "fromAppUrl":"",
                     "fromIcon":"",
                     "openUrl":iss.posturl+"/#/giftInfo"  //详情地址
                 }
             })
            
        })
        /*  this.props.location.state.list.forEach((d,i)=>{
           // name.push(d.username);
         
           
        })  */
        lxbridge.callHandler('sendBirthdayLongCoin',
        name, function(response){
        let plan =  iss.getPlan();
            if(response=="-1"){
                lxbridge.callHandler('back2history', {}, function(response){});
            }else{
                if(plan=="Android"){
                lxbridge.callHandler('backToChat', response, function(response){});
                }
            }
            //lxbridge.callHandler('back2home', {}, function(response){}); //===""   回主页


        });


    }
    getFatch(da) {
        var th = this;
        let $da = this.props.location.state;//传入数据
        th.setState({"activeList":this.state.list[0]});//初始化默认点中数据
    }

    render() {
        var th = this;
        let list = this.state.list.map(function (da, ind) {
            if (ind == 0) {
                return <li key={ind} className="swiper-slide active" data-guid={da.id} onClick={th.Event_click_Slid.bind(th)}><a href="javascript:;"><img src={da.src} /></a></li>
            } else {
                return <li key={ind} className="swiper-slide" data-guid={da.id} onClick={th.Event_click_Slid.bind(th)}><a href="javascript:;"><img src={da.src} /></a></li>
            }
        });
        return <article className="gift">
            <div className="gift-content">
                <p className="gift-img"><img ref="giftImge" src={this.state.list[0]["bigsrc"]} /></p>
                <div className="gift-txt" >
                    <p className="text-left">祝您：</p><span className="gift-btn-spanEdit" ref="giftReadonly" onClick={this.Event_click_Edit.bind(this)}>(点击可编辑)</span>
                    <textarea  defaultValue={this.state.textarea} onBlur={this.Event_keyUp_Textarea.bind(this)}  onInput={this.Event_keyUp_Textarea.bind(this)} placeholder="生日快乐~" readOnly ref="textarea" className="gift-txt-edit" />
                </div>
            </div>
            <footer className="gift-footer">
                <div className="swiper-container gift-scrollBox">
                    <ul className="swiper-wrapper">
                        {list}
                    </ul>
                </div>
                <p className="padV50 text-center">
                    <button className="btn btn-primary" onClick={this.Event_click_Submit.bind(this)}>送出祝福</button>
                </p>
            </footer>
        </article>
    }

}



export default INFO;
