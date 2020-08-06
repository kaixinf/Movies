//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    city: "上海",
    start: 0,
    count: 6,
    list_start: 0,
    list_count: 5,
    // 豆瓣热门
    f_start: 10,
    find_lists: [],
    // 找电影
    movie_lists: [],
    //电影列表
    lists: [],

  },

  // 豆瓣热门
  find() {
    var f_start = this.data.f_start
    var that = this
    wx.request({
      url: 'https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a',
      data: {
        start: f_start,
        count: 6
      },
      header: {
        "content-type": "json"
      },//请求数据需要加上header头
      success: res => {
        that.setData({
          find_lists: res.data.subjects
        })
      }
    })
  },
  getData() {
    var that = this
    // 豆瓣热门获取数据
    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a',
      data: {
        start: this.data.start,
        count: this.data.count,
        city: this.data.city
      },
      header: {
        "content-type": "json"
      },//请求数据需要加上header头
      success: function (res) {
        that.setData({
          movie_lists: that.data.movie_lists.concat(res.data.subjects)
          // movie_lists:that.data.movie_lists.concat(res.data.subjects)
        })
      }
    })
  },
  // 电影列表请求数据
  getLists() {
    var that = this
    var start = this.data.list_start
    var count = this.data.list_count
    wx.request({
      url: 'https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a',
      data: {
        start: start,
        count: count
      },
      header: {
        "content-type": "json"
      },//请求数据需要加上header头
      success: (res) => {
        this.setData({
          lists: that.data.lists.concat(res.data.subjects)
        })
      }
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '首页'
    }),
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#00B600',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    this.find()  //豆瓣热门
    this.setData({
      movie_lists: [],
    })
    this.getData() //找电影
    this.getLists() //豆瓣片单

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    // 下拉时  list_count值重置为0  并将列表清空
    this.setData({
      f_start: this.data.f_start + 6, //豆瓣热门(轮播) 也重置一下
      lists: [],
      list_count: 5
    })
    this.find()
    this.getLists()
  },
  // // 上拉加载
  onReachBottom: function () {
    this.data.lists = []
    // 上拉加载的时候 设置list_count的值 触发一次事件就让list_count值+1
    this.setData({
      list_count: this.data.list_count + 5  //
    })
    this.getLists()
  },
  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
