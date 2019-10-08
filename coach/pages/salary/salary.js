//index.js
//获取应用实例

const app = getApp()
Page({
  data: {
   
    pageSize: 3,
    searchPageNum: 1,
    newLessonTemplateList: null,
    totalCount: 0,
    currentRecordCount: 0,
    //showOnMoreButton:true,
    showNoMessage: false,
    msgList: []
  },

  onLoad: function () {
    let that = this;
    wx.request({
      url: app.globalData.rootUrl + 'studio/coache/'+app.globalData.coach.id+'/salary',
      success: function (res) {

        that.setData({
          msgList: res.data.data
        });
        console.log(res);
      },
    })
  },
  onShow: function () {
    var that = this;

  },
  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function (res) {
  },


})