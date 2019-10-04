// studio/pages/publish/publish-detail.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
title:'',
img:{},
content:'',
id:'',
    path: 'https://doit.svte.cn',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let id = options.id;
    let that = this;
    // wx.request({
    //   url: app.globalData.globalUrl.studioPath + app.globalData.studioId + '/news/'+id,
    //   success: function (res) {
        that.setData({
          title: options.title,
          content:options.content,
          id:id
        });
    //   },
    //   fail: function (error) {
    //     console.log(error);
    //     that.setData({
    //       request_fail: true,
    //     });
    //   }
    // })
    wx.request({
      url: app.globalData.globalUrl.studioPath + app.globalData.studioId + '/news/' + id+'/photos',
      success: function (res) {
     
        that.setData({
          img: res.data.data[0]
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
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
  deleteMessage:function(){
    let that = this;
    wx.request({
      url: app.globalData.globalUrl.studioPath + app.globalData.studioId + '/news/' + that.data.id,
      method:'delete',
      success: function (res) {
       wx.navigateBack({
         
       })
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
   * Lifecycle function--Called when page show
   */
  onShow: function () {

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