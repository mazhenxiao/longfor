import React from 'react';
import ReactDOM from 'react-dom';
import iss from "./iss.js"; //公共组件
//===============================数据层
var $$data = {
    me:{
        headIcon:"17483",
        true_name:""
            },
            user:{
                id:"",
                giftType:"",
                username:"",
                content:""
            }//默认点中图片
}
class longCoin extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = $$data; //初始化数据
        
    }

    componentWillMount() {

        this.getFatch();//异步获取数据
        
    }
    componentDidMount() {
        document.documentElement.style.background="#f7f7f7";
        document.body.style.background="#f7f7f7";
    }
    //事件
    getFatch() {
        var th = this;
        var pm =  new Promise((resolve, reject)=>{
        $.post(iss.getAPI("getDetail.do"),{
            "id":th.props.location.query.id
        })
        .done(da=>{
            let $da = typeof da =="string"? JSON.parse(da):da;
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
                        me:$da.data
                    });
                    console.log($da.data)
                }
            })
            .fail(da=>{

            })
       })
      
    }

    render() {
  
        return <article className="longCoinRed h100">
           <header className="longCoinRedHeader">
               <p className="longcoinRedUser"><img src={iss.imgsrc+this.state.me.headIcon+".jpg"} /></p>
               <p className="longcoinRedUserName">{this.state.me.true_name}</p>
           </header>
           <div className="longcoinRedcontent">
                 <p className="longCoinRedTxt"><span>{this.state.user.giftType}</span></p>
                 <p className="longCoinRedimg">
                     <img src="content/images/birthday4.png" />
                 </p>
                  <p className="longCoinRedFoot">{this.state.user.content}</p>  
           </div>
        </article>
    }

}



export default longCoin;
