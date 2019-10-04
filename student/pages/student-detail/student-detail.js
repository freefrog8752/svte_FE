// pages/user/user.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: ['一般优秀小橙V', '红V大佬', '蓝V小编'],
    sIndex: 0,
    fileds: ['女', '男'],
    fIndex: 1,
    type: 0,
    dates: '',
    invalid_date: '',
    // user:{},
    id: '',
    basic: {
      name: '',
      phone: 0,
      age: 18,
      gender: 0
    },
user:{}
  },
  //选择领域
  pickerFiled: function (e) {
    console.log(e.detail.value);
    this.setData({
      fIndex: e.detail.value,
      'basic.gender': Number(e.detail.value)
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  inputName: function (e) {
    this.setData({ 'user.name': e.detail.value })
  },
  inputPhone: function (e) {
    this.setData({ 'user.phone': Number(e.detail.value) })
  },
  inputAge: function (e) {
    this.setData({ 'user.age': Number(e.detail.value) })
  },
  //选择微博状态
  pickerStatus: function (e) {
    this.setData({
      sIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  addUser: function () {
    let that = this;
    wx.request({
      url: app.globalData.globalUrl.getStudent + this.data.id,
      method: 'put',
      data: this.data.user, success: function (d) {
        wx.navigateBack({

        })
      }
    })
  
  },
  onLoad: function (options) {
    this.setData({id:options.id});
    let id = options.id;
    let that = this;
    wx.request({
      url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId+'/students/' + this.data.id,
      success: function (res) {
        // let user = {};
        // res.data.data.forEach(item => {
        //   if (item.id == that.data.id) {
        //     user = item
        //   }
        // })
        that.setData({
          user: res.data.data[0]
        });
        // console.log(that.data.user);
      },
    });
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
    let that = this;
    wx.request({
      url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/students/' + this.data.id,
      success: function (res) {
        let user = {};
        that.setData({
          user: res.data.data[0]
        });
        // console.log(that.data.user);
      },
    });
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