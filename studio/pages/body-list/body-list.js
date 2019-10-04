// pages/user/user.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    body:{}
  },

  //选择领域

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let studentId = options.studentId;
    let bodyId = options.bodyId;
    wx.request({
      url: app.globalData.rootUrl + 'student/'+studentId+'/bodyIndexs/'+bodyId,
      success:data=>{
        this.setData({
        user:data.data.data})
      }
    })
    // let body = {
    //     weight: 55.3,      skeletalMuscle: 100,      bodyFat: 1,      whr: 2,      pbf: 3,      bmi: 4}
    // this.setData({user:body});
    
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