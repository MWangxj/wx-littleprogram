//app.js
App({

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {//获取用户信息
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {

      //调用登录接口
      wx.login({
        success: function (res) {//登录成功之后返回用户信息
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
          
          if (res.code) {//获取用户信息的code
            console.log(res.code);
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxdf364108244109b0&secret=028754d2c79e620aa259a7ece7783975&js_code=' + res.code + '&grant_type=authorization_code',//向微信服务器请求用户关注公众号所获取的唯一标志openid
              method: 'GET', 
              header: {
                'content-type': 'application/json'
              },// 设置请求的 header
              success: function (res) {
                // success
                wx.request({
                  url: 'https://dzjc.cjlu.edu.cn/wx/openId?openId=oHScZ0Tvn6-YEPAs1fH2FqEQJSN8',// + res.openid,
                  data: {},
                  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                  // header: {}, // 设置请求的 header
                  success: function (res) {
                    // success
                    console.log(res.data);
                    if (res.data.ret == 0) {
                      wx.navigateTo({
                        url: '../bindwx/bindwx?openid=oHScZ0Tvn6-YEPAs1fH2FqEQJSN8',
                        success: function (res) {
                          // success
                        },
                        fail: function () {
                          // fail
                        },
                        complete: function () {
                          // complete
                        }
                      })
                    } else {
                      if (res.data.userType == 0) {
                        wx.navigateTo({
                          url: '../normal/normal?obsid='+res.data.obsid,
                          success: function (res) {
                            // success
                          },
                          fail: function () {
                            // fail
                          },
                          complete: function () {
                            // complete
                          }
                        })

                      }else{
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
                    }
                  },
                  fail: function () {
                    // fail
                  },
                  complete: function () {
                    // complete
                  }
                })
              },
              fail: function () {
                // fail
              },
              complete: function () {
                // complete
              }
            })
          }
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    obsid:''
  }
})
//https://api.weixin.qq.com/sns/jscode2session?appid=wxdf364108244109b0&secret=028754d2c79e620aa259a7ece7783975&js_code=031ir6LH0ohs8k2LKtIH0Bn5LH0ir6Lu&grant_type=authorization_code
//openid":"oHScZ0Tvn6-YEPAs1fH2FqEQJSN8"
//oHScZ0Tvn6-YEPAs1fH2FqEQJSN8