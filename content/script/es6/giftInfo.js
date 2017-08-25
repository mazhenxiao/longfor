import React from 'react';
import ReactDOM from 'react-dom';
import iss from "./iss.js"; //公共组件
//===============================数据层
var $$data = {
    me:{
        headIcon:"",
        true_name:""
    },
    user:{
        id:"",
        giftType:"",
        username:"",
        content:""
    }//默认点中图片
}
class giftInfo extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = $$data; //初始化数据
        
    }

    componentWillMount() {

        this.getFatch();//异步获取数据
        
    }
    componentDidMount() {
        document.documentElement.style.background = "#fff";
        document.body.style.background = "#fff";
    }
    //事件
    getFatch() {
        var th = this;
        var pm =  new Promise((resolve, reject)=>{
        $.post(iss.getAPI("getDetail.do"),{
            "id":iss.getParam("id")
        })
        .done(da=>{
            let $da = typeof da =="string"? JSON.parse(da):da;
            if($da.code=="-1"){
                iss.alert({
                    content:"请求失败，请重试！"
                });
                return 
            }
            th.setState({
                user:$da.data
            })     
            resolve(this.state.user)
        })
        .fail(er=>{

        }) 
       })// prom end

       Promise.all([pm]).then(da=>{
           var $da = da["length"]? da[0]:da;
           $.post(iss.getAPI("getUser.do"),{"username":$da.username})
            .done(da=>{
               let $da = typeof da=="string"? JSON.parse(da):da;
               if($da.code==0){
                   th.setState({
                       me:$da.data.headIcon
                   });
                   console.log($da.data)
               }
            })
            .fail(da=>{

            })
       })
    }

    render() {
  
        return <article className="giftInfo">
            <div className="gift-content">
                <p className="gift-img"><img src={this.state.user.giftType}  /></p>
                <div className="gift-txt" >
                    <p className="text-left">祝您：</p>
                    <p className="gift-txt-edit">{this.state.user.content}</p>
                </div>
            </div>
            <footer className="giftInfo-footer">
                <p className="giftInfo-user"><img src={iss.imgsrc+this.state.me+".jpg"} /></p>
                <p className="giftInfo-name">{this.state.me.true_name}</p>
            </footer>
        </article>
    }

}



export default giftInfo;
