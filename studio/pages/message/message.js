//index.js
//获取应用实例

const app = getApp()
Page({
  data: {
    title:'消息',
    remark: '仅保留30天内的消息',
    content1: 'Primer市场课程更新版上线',
    content2:'马上点击查阅最新版本市场课程，五分钟内就学会一项市场技能！',
    keyWords1:'技能：',
    keyWords2: '更新时间：',
    noMessageTitle:'暂无新消息',
    noMessageContent: '马上搜索更多精选课程',
    noMessageButton: '发现课程',
    OnMoreButton:'加载更多',
    pageSize: 3,
    searchPageNum:1,
    newLessonTemplateList:null,
    totalCount:0,
    currentRecordCount:0,
    //showOnMoreButton:true,
    showNoMessage:false,
msgList:[]
  },
 
onLoad:function(){
  let that = this;
  wx.request({
    url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId +'/messages',
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