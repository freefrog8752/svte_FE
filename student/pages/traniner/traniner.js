// pages/traniner/traniner.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    traniner: null,
    traninerList:[
    ],
    photos:[],
    root:'http://doit.svte.cn',
    courseType:[]
  },

  selectTraniner: function(e){
    const id = e.currentTarget.dataset.info.id;
    wx.request({
      url: app.globalData.rootUrl + 'coach/' + e.currentTarget.dataset.info.id+'/course',
      success:data=>{
        let arr = [];
        data.data.data.forEach(item=>{
          arr.push(item.name);
        });
        this.setData({ courseType:arr});
     
      }
    })
    wx.request({
      url: app.globalData.rootUrl + 'coach/' + id + '/photos',
      success: data => {
        let arr = [];
        data.data.data.forEach(item=>{
          arr.push(this.data.root+item.path);
        })
        this.setData({
          photos:arr
        });
        console.log(arr)
      }
    })
    this.setData({
      traniner: e.currentTarget.dataset.info
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.rootUrl +'studio/'+app.globalData.studioId+'/coaches',
      success:data=>{
        this.setData({
          traninerList:data.data.data
        });
        this.setData({
          traniner: this.data.traninerList[0]
        })
      }
    })
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