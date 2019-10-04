// coach/pages/plan/plan.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseId:'',
    applyArr: [],
    selActs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ 'selActs': JSON.parse(options.actions), courseId: options.courseId});
    console.log(this.data);
  },
  saveActs:function(){
    this.saveList(0);
  },
  saveList: function (index) {
    let i = index ? index : 0;
    let selActs = this.data.selActs;
    selActs[i].groupCount = selActs[i].group_count;
    selActs[i].unit = 1;
    wx.request({
      url: app.globalData.rootUrl + 'plan/' + this.data.courseId + '/movements',
      method: 'post',
      data: selActs[i],
      success: data => {
        if (selActs[i + 1]) {
          this.saveList(i + 1);
        } else {
          wx.showToast({ title: '提交成功' })
          this.setData({ hideActsList: true });
        }
      }
    })
    this.setData({ hideActsList: true })
  },
  confirmList: function () {
    this.saveList();

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
  showMenu: function (e) {
    let apply = e.currentTarget.dataset.item;
    let idx = e.currentTarget.dataset.idx;
    const itemList = ['热身', '训练', '拉伸'];
    wx.showActionSheet({
      itemList: itemList,
      success: (res) => {
        console.log(apply)
        apply.tag = itemList[res.tapIndex];
        let arr = this.data.selActs;
        arr[idx] = apply;
        this.setData({
          'selActs' : arr
        });
        console.log(this.data.selActs);
      },
      fail: (res) => {
        console.log(res.errMsg)
      }
    })

  },
  confirm: function () {
  
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