// pages/lookMore/lookMore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start:30,
    count: 12,
    mores:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  more(){
    var that = this
    wx.request({
      url: 'https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a',
      data: {
        count: that.data.count,
        start: that.data.start
      },
      header: {
        "content-type": "json"
      },//请求数据需要加上header头
      success: function (res) {
        that.setData({
          mores: that.data.mores.concat(res.data.subjects)
        })
      }
    })
  },
  onLoad: function (options) {
    this.more()
    wx.setNavigationBarTitle({
      title: '更多电影',
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
    this.setData({
      mores: [],
      start: this.data.start + 10,
      count: 12
    })
    this.more()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.mores=[]
    this.setData({
      count:this.data.count+6
    })
    this.more()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})