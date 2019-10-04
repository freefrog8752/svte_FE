// pages/user/user.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: ['一般优秀小橙V', '红V大佬', '蓝V小编'],
    sIndex:0,
    fileds: ['男', '女'],
    fIndex: 0,
    id:'',
    contracts:[],
    bodyparams:[],
user:{}
  },
  moreBody: function () {
    wx.navigateTo({
      url: '../body-list/list?id=' + this.data.id,
    })
  },
  gotoBody: function (e) {
    console.log(1);
    let bodyId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../body-list/body-list?studentId=' + this.data.user.id + '&bodyId=' + bodyId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({id:options.id});
    let id = options.id;
    let that = this;
    wx.request({
      url: app.globalData.rootUrl + 'studio/'+app.globalData.studioId+'/students/' + id,
      success: function (res) {
        that.setData({
          user: res.data.data[0]
        });
        // console.log(that.data.user);
      },
    });
    wx.request({
      url: app.globalData.rootUrl + 'studio/1/student/'+id+'/contracts',
      success: function (res) {
        that.setData({
          contracts: res.data.data
        });
        // console.log(that.data.user);
      },
    });
    wx.request({
      url: app.globalData.rootUrl + 'student/'+id+'/bodyIndexs',
      success: function (res) {
        that.setData({
          bodyparams: res.data.data
        });
        // console.log(that.data.user);
      },
    })
  },
  gotoBody: function (e) {
    console.log(1);
    let bodyId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../body-list/body-list?studentId=' + this.data.user.id + '&bodyId=' + bodyId,
    })
  },
  addBodyIndex: function () { 
    wx.navigateTo({
      url: '../body-list/body-add?id=' + this.data.id,
    })
  },
gotoEdit:function(){
  wx.navigateTo({
    url: '../create-user/create-user?id='+this.data.user.id,
  })
},
  addContract: function () {
    wx.navigateTo({
      url: '../create-contract/create-contract?id='+this.data.id,
    })},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    wx.request({
      url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/students/' + this.data.id,
      success: function (res) {
        that.setData({
          user: res.data.data
        });
        // console.log(that.data.user);
      },
    });
    wx.request({
      url: app.globalData.rootUrl + 'studio/1/student/' + this.data.id + '/contracts',
      success: function (res) {
        that.setData({
          contracts: res.data.data
        });
        // console.log(that.data.user);
      },
    });
    let body = ['2019-06-06', '2019-06-07', '2019-06-08'];
    wx.request({
      url: app.globalData.rootUrl + 'student/' + this.data.id + '/bodyIndexs',
      success: function (res) {
        that.setData({
          bodyparams: res.data.data.length == 0 ? body : res.data.data
        });
        // console.log(that.data.user);
      },
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})