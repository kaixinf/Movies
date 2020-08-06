// pages/login/login.js
wx.cloud.init()
const db=wx.cloud.database()
const app = getApp()
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    // user:null,
    // userinfo:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 登陆
  // login(){
  //   wx.login({
  //     success (res) { //拿到code
  //       console.log(res)
  //       if (res.code) {
  //         //发起网络请求
  //         wx.request({
  //           url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxcdd511ffa1777179&secret=33d67c77078d6a5075ec259c107996a2&js_code=0235xLRN0oBxK82eBiSN0QoxRN05xLR3&grant_type=authorization_code',
  //           data: {
  //             code: res.code
  //           },
  //           success:res=>{
  //             // console.log(res,8888)
  //             // db.collection('login').add({
  //             //   data:{
  //             //     openid:res.data.openid,
  //             //     key:res.data.session_key
  //             //   }
  //             // })
  //            // 授权
  //             // wx.getSetting({
  //             //   success(res) {
  //             //     console.log(555,res)
  //             //     if (!res.authSetting['scope.record']) {
  //             //       wx.authorize({
  //             //         scope: 'scope.record',
  //             //         success (res) {
                        
  //             //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
  //             //           wx.startRecord()
  //             //         }
  //             //       })
  //             //     }
  //             //   }
  //             // })
  //           }
  //         })
  //       } else {
  //         console.log('登录失败！' + res.errMsg)
  //       }
  //     }
  //   })
  // },
  // getUserInfo (e) {
  //   if(e.detail.errMsg=="getUserInfo:ok") {
  //     // db.collection('login').remove()
  //     db.collection('login').add({
  //       data:{
  //         avatarUrl:e.detail.userInfo.avatarUrl,
  //         name:e.detail.userInfo.nickName
  //       },
  //       success:()=>{
  //         this.setData({
  //           userinfo:res.data
  //         })
  //       }
  //     })
  //     // db.collection('login').get({
  //     //   success:res=>{
  //     //     console.log(res)
         
  //     //   }
  //     // })
  //     console.log(this.data.userinfo,9999)
      
  //     console.log('用户点击确定')
  //     // this.setData({
  //     //   user:1
  //     // })
  //     db.collection('user').get()
       
  //   } else{
  //     console.log('用户点击取消')
  //   }
  //   console.log(e)
    
  // },
 

  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
     // 获取用户信息
     wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.setNavigationBarTitle({
      title: '我的档案',
    })
   
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  globalData: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})