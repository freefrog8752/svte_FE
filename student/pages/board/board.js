//index.js
//获取应用实例

const app = getApp()
Page({
  data: {
    title: '消息',
    remark: '仅保留30天内的消息',
    noMessageTitle: '暂无新消息',
    OnMoreButton: '加载更多',
    pageSize: 10,
    searchPageNum: 0,
    newLessonTemplateList: null,
    totalCount: 0,
    //showOnMoreButton:true,
    showNoMaessage: false,
    msgList: []
  },
  inputMsg: function (e) {
    this.setData({ 'msg': e.detail.value })
  },
  pub:function(){
    let that = this;
    wx.request({
      url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/comments',
      method:'post',
      data: {
        "studioId": Number(app.globalData.studioId),
        "studentId": app.globalData.studentId,
        "message": this.data.msg
        },
      success: function (res) {

        that.getList();
        this.setData({ 'msg': '' })
        console.log(res);
      },
    })
  },
changeList:function(e){
  const type = e.currentTarget.dataset.type;
  if(type==0){
    if(this.data.searchPageNum == 0){
      wx.showToast({
        title: '已经是第一页了',
      })
      return;
    }
    this.setData({
      searchPageNum:this.data.searchPageNum-1
    })
  }else{
    if (this.data.msgList.length < 10) {
      wx.showToast({
        title: '没有更多了',
      })
      return;
    }
    this.setData({
      searchPageNum: this.data.searchPageNum + 1
    })
  }
  this.getList();
},
getList:function(){
  let that = this;
  wx.request({
    url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/comments?page=' + this.data.searchPageNum + '&pageSize=' + this.data.pageSize,
    success: function (res) {

      that.setData({
        msgList: res.data.data
      });
      console.log(res);
    },
  })
},
  onLoad: function () {
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