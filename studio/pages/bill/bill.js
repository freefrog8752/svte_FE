// studio/pages/bill/bill.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalIncomes: 0,
    monthTotalIncomes: 0,
    monthCourseExpendIncomes: 0,
    windowHeight: "500px",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight + "px");
        that.setData({
          windowHeight: res.windowHeight + "px"
        })
      },
      fail: function (e) {
        console.log("获取设备信息失败" + e);
      }
    });
    wx.request({
      url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId +'/earnings',
      success: function (res) {
        that.setData({
          totalIncomes: res.data.data.totalIncomes,
          monthTotalIncomes: res.data.data.monthTotalIncomes,
          monthCourseExpendIncomes: res.data.data.monthCourseExpendIncomes
        });
       
      },
      fail: function (error) {
        console.log(error);
        that.setData({
          request_fail: true,
        });
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