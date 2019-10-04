//index.js
//获取应用实例

const app = getApp()
Page({
  data: {
    title: '消息',
    remark: '仅保留30天内的消息',
    content1: '用户1申请成为教练',
    content2: '马上点击查阅最新版本市场课程，五分钟内就学会一项市场技能！',
    keyWords1: '技能：',
    keyWords2: '更新时间：',
    noMessageTitle: '暂无新申请',
    noMessageContent: '马上搜索更多精选课程',
    noMessageButton: '发现课程',
    OnMoreButton: '加载更多',
    pageSize: 3,
    searchPageNum: 1,
    requestList: [{}],
    totalCount: 0,
    currentRecordCount: 0,
    //showOnMoreButton:true,
    showNoMessage: false,

  },
  rejectUser:function(e){
    wx.request({
      url: app.globalData.rootUrl + 'student/' + e.currentTarget.dataset.id + '/disable',
      method: 'post',
      success: function (d) {
        wx.showToast({
          title: '拒绝成功',
        })
      }
    })
  
  },
  createUser:(e)=>{
    let that = this;
    wx.request({
      url: app.globalData.rootUrl +'student/'+e.currentTarget.dataset.id+'/enable',
      method: 'post',
      success: function (d) {
        wx.showToast({
          title: '批准成功',
        })
        that.showList();
      }
    })
  },
  onShow: function () {
    this.showList();
  },
  showList:function(){
    wx.request({
      url: app.globalData.rootUrl + 'studio/'+app.globalData.studioId+'/students?isActive=0',
      success:data=>{
        let arr =[];
        console.log(data.data);
        arr = data.data.data;
        arr.forEach(d=>{
          d.content= '用户'+d.name+'申请加入';
        })
        console.log(arr)
        this.setData({requestList:arr})
      }
    })
  },
  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function (res) {
  },


})