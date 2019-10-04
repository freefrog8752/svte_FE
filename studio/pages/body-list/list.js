// pages/user/user.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sIndex: 0,
    fileds: ['女', '男'],
    fIndex: 1,
    type: 0,
    dates: '',
    invalid_date: '',
    // user:{},
    id: '',
    basic: {
      name: '',
      phone: 0,
      // age: 18,
      gender: 0
    },
    user: {}
  },
  
  
  onLoad: function (options) {
    this.setData({ id: options.id });
    let id = options.id;
    let that = this;
    wx.request({
      url: app.globalData.rootUrl + 'student/' + id + '/bodyIndexs',
      success: function (res) {
        that.setData({
          bodyparams: res.data.data
        });
        // console.log(that.data.user);
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  gotoBody: function (e) {
    let bodyId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../body-list/body-list?studentId='+this.data.id+'&bodyId='+bodyId,
    })
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