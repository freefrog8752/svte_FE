// pages/contract/contract.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHover: 0,
    currentContract:0,
    bodyIndexList:[
    ]
  },

  addHover: function(e){
    this.setData({
      isHover: e.currentTarget.dataset.index,
      currentContract: e.currentTarget.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.rootUrl + 'student/' + app.globalData.studentId + '/bodyIndexs',
      success: data => {
        this.setData({ bodyIndexList: data.data.data });
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})