// miniprogram/pages/dbList_detail/dbList_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[],
    start:0,
    count:5,
    text:""
  },
// 获取数据
dbLists() {
  var start = this.data.start
  var count = this.data.count
  var that = this
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      text:options.txt,
      start:options.start
    })
    this.dbLists()
    wx.setNavigationBarTitle({
      title: '口碑电影'
    })
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
    this.data.lists = []
    // 上拉加载的时候 设置list_count的值 触发一次事件就让list_count值+1
    this.setData({
     count: this.data.count + 5  //
    })
    this.dbLists()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})