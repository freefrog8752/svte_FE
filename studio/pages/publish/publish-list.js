// studio/pages/publish/pulish-list.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    windowHeight: "500px",
    list: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
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
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    let that = this;
    wx.request({
      url: app.globalData.globalUrl.studioPath + app.globalData.studioId + '/news',
      success: function (res) {
        that.setData({
          list: res.data.data
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
addMsg:function(){
  wx.navigateTo({
    url: 'publish',
  })
},
  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})