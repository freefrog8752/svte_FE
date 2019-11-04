// pages/user/user.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      courseName:'',
      duration:''

  },
  courseName:function(e){
    this.setData({courseName:e.detail.value});
  },
  courseDurition: function (e) {
    this.setData({ duration: e.detail.value });
  },
  addCourse:function(){
    let that = this;
    wx.request({
      url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/course',
      method:'post',
      data: { name: that.data.courseName,duration:that.data.duration},
      success: function (res) {
        that.setData({
          courseList: res.data.data
        });
        wx.navigateBack({
          
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // wx.request({
      
    //   url: app.globalData.globalUrl.getStudent + options.id,
    //   success: function (res) {
    //     res.data.data.gender = parseInt(res.data.data.gender == null ? 1 : res.data.data.gender);
    //     res.data.data.phone = parseInt(res.data.data.phone);
    //     res.data.data.age = parseInt(res.data.data.age);
    //     that.setData({
    //       basic: res.data.data
    //     });
    //     console.log(that.data.basic);
    //   },
    // })
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