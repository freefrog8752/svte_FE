// miniprogram/pages/individual/individual.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contractList:[],
    user:{},
    path: 'https://doit.svte.cn',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.rootUrl + 'studio/1/students/' + app.globalData.studentId,
      success: data => {
        this.setData({ user: data.data.data[0] });
      }
    })
    wx.request({
      url: app.globalData.rootUrl + 'student/' + app.globalData.studentId + '/bodyIndexs',
      success: data => {
        console.log(data.data.data)
      }
    })
    wx.request({
      url: app.globalData.rootUrl + 'studio/'+app.globalData.studioId+'/student/'+app.globalData.studentId+'/contracts',
      success:data=>{
        this.setData({contractList:data.data.data});
      }
    });

    // var data = [
    //   // { name: "", value: [95, 50, 60, 30, 88, 90], color: "rgb(0,175,236)" },
    // // { name: "詹姆斯", value: [90, 80, 70, 40, 75, 88], color: "rgb(206,0,30)" },
    // { name: "", value: [60, 88, 75, 60, 40, 20], color: "rgb(84,27,134)" },]
    // var xLabel = ['体重', 'BMI', '骨骼肌', 'WHR', 'PBF', '体脂率']
    // var option = {
    //   data: data,
    //   xLabel: xLabel,
    //   chartRatio: 0.7,
    //   style: 'radar',
    //   // showLabel: true,
    //   // animation: true,
    //   // showTooltip: true,
    //   // tooltip: '{a}:{b}',
    //   area: false,
    // }
    // this.roseComp = this.selectComponent('#radar');
    // this.roseComp.setOptions(option);
    // this.roseComp.initChart(150, 100);
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