var app = getApp()
Page({
    data:{
        openid:''
    },
    formsubmit:function(e){
        console.log(e.detail);
        
       wx.request({
         url: 'https://dzjc.cjlu.edu.cn/wx/user',
         data: {
             openId:this.data.openid,
             username:e.detail.value.username,
             password:e.detail.value.userpassword
         },
         method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }, // 设置请求的 header
         success: function(res){
           // success
           if(res.data.ret==1&&res.data.userType==0){
               wx.navigateTo({
                 url: '../normal/normal?obsid='+res.data.obsid,
                 success: function(res){
                   // success
                 },
                 fail: function() {
                   // fail
                 },
                 complete: function() {
                   // complete
                 }
               })
           }else if(res.data.ret==1&&res.data.userType==1){
               wx.navigateTo({
                 url: '../admin/admin',
                 success: function(res){
                   // success
                 },
                 fail: function() {
                   // fail
                 },
                 complete: function() {
                   // complete
                 }
               }) 
           }
           
         },
         fail: function() {
           // fail
         },
         complete: function() {
           // complete
         }
       })
    },
     onLoad: function (options) {
         this.setData({
             openid:options.openid
         })
     }
})
//?openID='+this.userdata.openid+'&username='+e.detail.value.username+'&password='+e.detail.value.password