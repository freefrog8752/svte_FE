// coach/pages/plan/plan.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyArr:[],
    hiddenmodalput:true,
    apply:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var date = Date.parse(new Date()) / 1000;
    let startTime = "'2018-01-01'";
    let endTime = "'2019-09-07'";
    // let startTime = this.timestampToTime(date);
    // let endTime = this.timestampToTime(date + 86400*7);
    console.log(startTime, endTime);
    wx.request({
      url: app.globalData.rootUrl + 'coach/' + app.globalData.coach.id + '/student/plans?startApplyTime=' + startTime +'&endApplyTime='+endTime,
      success:data=>{
        let arr = data.data.data;
        arr.forEach(item=>{
          item.applyFormat = item.apply_time.split('T')[0];
        })
        this.setData({applyArr:arr});
      }
    })
  },
showMenu:function(e){
  let apply = e.currentTarget.dataset.item;
  wx.showActionSheet({
    itemList: ['制定计划', '我的计划', '总结'],
    success:(res)=>{
      console.log(res.tapIndex)
      if(res.tapIndex == 0){
        wx.navigateTo({
          url: 'plan?course='+JSON.stringify(apply),
        })
      } else if (res.tapIndex == 1){
        wx.navigateTo({
          url: 'myplan?plan=' + JSON.stringify(apply),
        })
      }else{
        this.setData({
          hiddenmodalput:false
          });
        this.setData({apply:apply});
      }
    },
    fail:(res)=> {
      console.log(res.errMsg)
    }
  })

},
confirm:function(){
  let date = this.timestampToTime(Date.parse(new Date()) / 1000);
  wx.request({
    url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/student/' + this.data.apply.student_id + '/plans/' + this.data.apply.course_plan_id,
    method:'put',
    data: { "comment": this.data.comments, "finishTime": date },
    success: data => {
      wx.showToast({
        title: '提交成功',
      });
      this.setData({hiddenmodalput:true})
    }
  })
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
  inputComments:function(e){
    this.setData({comments:e.detail.value});
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  timestampToTime:function(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M+ '-' + D ;

  }
})