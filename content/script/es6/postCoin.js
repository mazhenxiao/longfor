import React from 'react';
import ReactDOM from 'react-dom';
import iss from "./iss.js"; //公共组件
//===============================数据层
var $$data = {
    list: [//默认列表
        { guid: 0, number: "2.2", text: "好事成双" },
        { guid: 1, number: "6.6", text: "万事顺利" },
        { guid: 2, number: "16.8", text: "一路发" },
        { guid: 3, number: "99.9", text: "幸福长远" }
    ],
    actionList: { guid: 0, number: "2.2", text: "好事成双" }, //默认选中列表
    actionName: [],
    actionText: "祝您：生日快乐，好事成双",
    hotnumber:0
}
class postCoin extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = $$data; //初始化数据
    }

    componentWillMount() {
        this.setState({ "actionName": this.props.location.state.list });
        this.getFatch();//异步获取数据

    }
    componentDidMount() {
        this.addEventScroll();
        document.querySelector(".J_list").click();
    }
    //事件
    Event_keyup_input(ev){
      let el = ev.currentTarget,vl = el.value||this.state.hotnumber.number;
      this.setState({
        actionList:{
            number:vl
        }
      })
      this.Event_Count();
    }
    addEventScroll() { //绑定滚动事件
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 4
        })
    }
    Event_click_list(da, ev) { //绑定列表点击
        var ele = ev.currentTarget, th = this;
        $(".J_list").each((ind, ele) => {
            ele.remove("action");
        })
        /*     document.querySelectorAll(".J_list").forEach(function(ele,ind){
                ele.remove("action");
            }); */
        ele.add("action");
        th.setState({ "actionList": da });
        th.setState({"hotnumber":da});
        this.setState({
            "actionText":da.text
        })
        this.refs.postcoininput.value=da.number;
        this.refs.textarea.value = da.text
        //th.hotnumber = da;
    }
    Event_keyup_textarea(ev) { // 输入表述内容
        var el = ev.currentTarget;
            if(el.value.length>25){
                let t = ev.currentTarget.value.substr(0,24);
                el.value = t;
                this.setState({ "actionText": t });
            }else{
                this.setState({ "actionText": ev.currentTarget.value })
            }
        
    }
    Event_click_postCoin(ev) {

        var me = ev.currentTarget;
        me.classList.add("disabled");
        let th = this;
        let src = this.state.actionList.number,
            txt = this.state.actionText,
            da = this.props.location.state;//传入数据
        let username = [];
        da.list.forEach((d, i) => {
            username.push(d["username"]);
        })
        
        $.post(iss.getAPI("addBirthdayPerson.do"), { "usernames": username.join(","), "type": da.type, "content": txt, "giftType": src })
            .done(da => {
                // console.log(da);
                
                var $da = typeof da=="string"? JSON.parse(da):da;  /* {"code":"0","msg":"success","data":[{"username":"lucl","giftId":"82","type":"2"}],"longbiData":[{"username":"lucl","issueId":1138}]} */
                if($da.code==0){
                    th.toApp($da);
                }else if($da.code=="-1"&&$da.msg.indexOf("fail")<0){
                    iss.alert({ 
                        content:$da.msg,
                        ok:function(){ console.log("关闭")
                    }
                })

                }else if($da.code=="-1"&&$da.indexOf("fail")>=0){
                    iss.alert({content:"发送信息失败！"});
               }
               
            })
            .fail(er => {
                console.log(er);
            })
    }
    toApp(da) {
      
        let th = this;
        let name = [];
        this.props.location.state.list.forEach((d, i) => {
            da.longbiData.forEach((dd,ii)=>{
                    if(d.username==dd.username){
                        name.push({
                            "usercode":d.username,
                            "message":{
                             "type": "de4bfdf2-5623-11e7-907b-a6006ad3dba0", //四数据
                             "content":th.state.actionText,
                             "id":dd.issueId
                            }
                         });
                    }

            })
          
        })

        lxbridge.callHandler('sendBirthdayLongCoin',
            name, 
            function (response) {
               let plan =  iss.getPlan();
                if (response == "-1") {
                    lxbridge.callHandler('back2history', {}, function (response) { });
                } else {
                    if(plan=="Android"){
                    lxbridge.callHandler('backToChat', response, function (response) { });
                    }
                }


            });

    }
    Event_Count() { //统计
        return (this.state.actionList.number * this.state.actionName.length).toFixed(1);
    }
    getFatch() {
        var th = this;

    }

    render() {
        var th = this;
        let list = this.state.list.map(function (da, ind) { //获取列表
            return <li key={ind} className="swiper-slide J_list" onClick={th.Event_click_list.bind(th, da)}>
                <div className="postCoinBox">
                    <p className="postCoinNumber">{da.number}</p>
                    <p className="postCointext">{da.text}</p>
                </div>
            </li>
        });
        let pepo = this.state.actionName.map(function (da, ind) {
            return da.truename;
        });
        let pepoTxt = pepo.join("、");
        return <article className="postCoin">
            <section className="swiper-container postCoinContainer" id="postCoinContainer">
                <ul className="swiper-wrapper">
                    {list}
                </ul>
            </section>
            <section className="postCoinList">
                <div><p><span className="postCoinListKey">单人龙币</span><input ref="postcoininput" type="number" className="postCoinListValue postCoinListValueInput" onKeyUp={this.Event_keyup_input.bind(this)} defaultValue={this.state.actionList.number} />个</p></div>
                <div><p><span className="postCoinListKey">发放人数</span><span className="postCoinListValue">{pepoTxt} {pepo.length}人</span></p></div>
            </section>
            <section className="postCoinTxt">
                <p><textarea ref="textarea"  defaultValue={this.state.actionText} onBlur={this.Event_keyup_textarea.bind(this)} onKeyUp={this.Event_keyup_textarea.bind(this)}></textarea></p>
            </section>
            <section className="postCoinBuy">
                <p><span>合计</span><span>{this.Event_Count()}</span></p>
            </section>
            <footer className="text-center postCoinFoot">
                <button className="btn btn-warning" onClick={this.Event_click_postCoin.bind(this)}>塞进龙币</button>
            </footer>
        </article>
    }

}



export default postCoin;
