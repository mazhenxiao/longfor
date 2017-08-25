import React from 'react';
import ReactDOM from 'react-dom';
import iss from "./iss.js"; //公共组件
//===============================数据层
let $$data={
    ulAction:{}, //ul选取
    olAction:{}, //ol选取
    ulList:[],  //name: "重庆区域", id: 10041, nodeID: "0", orgid: "999999"
    olList:[]
}

 var OListPoint,MenuListPoint;
  class OList extends React.Component{
      constructor(props){
          super(props);
          OListPoint = this;
          this.state = $$data;
          this.defaultPOST();//获取默认区域
      }
      componentDidMount() {
        
      }
      defaultPOST(){
          var usercode = location.hash.split("usercode=")[1];
          $.post(iss.getAPI("getUser.do"),{"username":usercode})
          .done(da=>{
              let $da = typeof da=="string"? JSON.parse(da):da;
              if($da.code==0){
                document.trigger("$$EVENT_menuList",{"name":da.regionAll}); //默认地区
                 // console.log($da);
               // OListPoint.getFatch({orgid:$da.data.})
              }
          })
          .fail(da=>{

          })
      }
      getFatch(da){
          var th = this;
         $.post(iss.getAPI("getOrganization.do"),{"nodeID":da.orgid})
          .done(arg=>{
            var $arg = (typeof arg=="string")? JSON.parse(arg):arg;
            if($arg.code==0&&$arg["data"]&&$arg["data"].length){
                let da = $arg.data;
                th.setState({"olList":da});
                
            }
          })
          .fail(arg=>{

          })
      }
      Event_Click_li(da,ev){
          $("#MenuList").addClass("hide");
          document.trigger("$$EVENT_menuList",da);
      }
      render(){
           var li = this.state.olList.map((d,i)=>{
             return <li onClick={this.Event_Click_li.bind(this,d)} key={i} data-id={d.id} data-nodeid={d.nodeID} data-orgid={d.orgid}>{d.name}</li>
          }) 

          return    <ol className="MenuListRight" id="MenuListRight">
            {li}
      </ol>
      }
  }



  class MenuList extends React.Component{
    constructor(arg){
        super(arg);
        MenuListPoint = this;
        this.state = $$data;
        this.getFatch();//ajax
    }
    componentDidMount(){
        var th = this;
       setTimeout(function(){
        th.setScroll();//绑定滚动
       },1000)
    }
    setScroll(){
         var myScroll = new iScroll('MenuListBoxLeft', {    
            hScrollbar: false,
            vScrollbar: false,
            checkDOMChanges:true
        }); 
        var myScroll2 = new iScroll('MenuListBoxRight', {    
            hScrollbar: false,
            vScrollbar: false,
            checkDOMChanges:true
        }); 
    }
    getFatch(nodeID=0){
        var th = this;
      $.post(iss.getAPI("getOrganization.do"),{"nodeID":nodeID})
       .done(arg=>{
            var $arg = (typeof arg=="string")? JSON.parse(arg):arg;
            if($arg.code==0&&$arg["data"]&&$arg["data"].length){
                let da = $arg.data;
                th.setState({"ulList":da});
            }
       })
       .fail(er=>{
           console.log(er)
       })
    }
    Event_Click_li(da,ev){
        var self = ev.currentTarget,sbling = self.parentNode.querySelector(".active");
        if(sbling){
            sbling.classList.remove("active");
        }
        self.classList.add("active");
        OListPoint.getFatch(da); //发送数据给ol
    }
    render(){
        var th = this;
        let li = this.state.ulList.map((d,i)=>{
            return <li onClick={this.Event_Click_li.bind(this,d)} key={i} data-id={d.id} data-nodeid={d.nodeID} data-orgid={d.orgid}>{d.name}</li>
        })
       return  <ul className="MenuListLeft" id="MenuListLeft">
                  {li}
                </ul>
                
    }
} 
 
ReactDOM.render((<MenuList />),document.querySelector("#MenuListBoxLeft"));
ReactDOM.render((<OList/>),document.querySelector("#MenuListBoxRight"));
 
export default MenuList;



