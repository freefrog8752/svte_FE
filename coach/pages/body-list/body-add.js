// coach/pages/body-list/body-add.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    body:{},
    id:''
  },
  inputweight: function (e) {
    console.log(e);
    this.setData({ 'body.weight': Number(e.detail.value) });
  },
  inputSSHL: function (e) {
    console.log(e);
    this.setData({ 'body.shentishuifenhanliang': e.detail.value });
  },
  inputGGJ: function (e) {
    console.log(e);
    this.setData({ 'body.gugeji': e.detail.value });
  },
  inputJCDX: function (e) {
    console.log(e);
    this.setData({ 'body.jichudaixie': e.detail.value });
  },
  inputSTNL: function (e) {
    console.log(e);
    this.setData({ 'body.shentinianling': e.detail.value });
  },
  inputBF: function (e) {
    console.log(e);
    this.setData({ 'body.bodyFat': e.detail.value });
  },
  inputXW: function (e) {
    console.log(e);
    this.setData({ 'body.xiongwei': e.detail.value });
  },
  inputZBW: function (e) {
    console.log(e);
    this.setData({ 'body.zuobiwei': e.detail.value });
  },
  inputYBW: function (e) {
    console.log(e);
    this.setData({ 'body.youbiwei': e.detail.value });
  },
  inputYW: function (e) {
    console.log(e);
    this.setData({ 'body.yaowei': e.detail.value });
  },
  inputZDTW: function (e) {
    console.log(e);
    this.setData({ 'body.zuodatuiwei': e.detail.value });
  },
  inputYDTW: function (e) {
    console.log(e);
    this.setData({ 'body.youdatuiwei': e.detail.value });
  },
  inputZXTW: function (e) {
    console.log(e);
    this.setData({ 'body.zuoxiaotuiwei': e.detail.value });
  },
  inputYXTW: function (e) {
    console.log(e);
    this.setData({ 'body.youxiaotuiwei': e.detail.value });
  },





  gotoEdit:function(){
    wx.request({
      url: app.globalData.rootUrl+'student/'+this.data.id+'/bodyIndexs',
      method:'post',
      data:this.data.body,
      success:data=>{
        wx.showToast({
          title: '保存成功',
        })
        wx.navigateBack({
          
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({id:options.id});
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