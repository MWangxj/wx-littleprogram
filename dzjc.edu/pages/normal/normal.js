var app = getApp()
Page({
  data: {//定义检测点信息
    obsid:'',
    obsInfos:[],
    obsindex:''
  },
  
onLoad: function (options) {
  
         this.setData({
             obsid:options.obsid
         })//接收跳转页面参数检测点id
         var that=this;
         wx.request({//根据检测点id获取检测信息并把获取到的信息进行保存，并前台显示
           url: 'https://dzjc.cjlu.edu.cn/wx/obsinfo?obsid='+options.obsid,
           data: {},
           method: 'GET', 
           success: function(res){
             // 请求成功回调函数
            that.setData({
              obsInfos:res.data.obsInfos
            }) 
           },
           fail: function() {
             // 请求失败回调函数
           },
           complete: function() {
             // 请求完成回调函数
           }
         })
     }

});