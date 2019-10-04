// pages/user/user.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: ['一般优秀小橙V', '红V大佬', '蓝V小编'],
    sIndex:0,
    fileds: ['女', '男'],
    fIndex: 1,
    type:0,
    dates:'',
    invalid_date:'',
    // user:{},
    id:'',
    basic:{
      amount:0,
      totalCourse:0,
      leftCourse:18,
      expiredTime:'',
      signTime:'',
      channel:1,
      courseId:2
    }

  },
  bindSignTimeChange:function(e){
    this.setData({
      'basic.signTime':e.detail.value
    })
  },
  bindLeft: function (e) {
    this.setData({
      fIndex: e.detail.value,
      'basic.leftCourse': Number(e.detail.value)
    })},
  bindAmount: function (e) {
    this.setData({
      fIndex: e.detail.value,
      'basic.amount': Number(e.detail.value)
    })
  },
  bindTotal: function (e) {
    this.setData({
      'basic.totalCourse': Number(e.detail.value)
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      'basic.expiredTime': e.detail.value
    })
  },
  
  //选择微博状态
  pickerStatus: function(e){
    this.setData({
      sIndex:e.detail.value
    })
  },
  addContract:function(){
    let that = this;
        wx.request({
          url: app.globalData.rootUrl + 'studio/'+app.globalData.studioId+'/student/'+this.data.id+'/contracts',
          method:'post',
          data:this.data.basic,
          success:function(d){
            wx.navigateBack({
            
            })
          }
        })
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      'id':options.id
    });
    // if(options.contractId){
    //   wx.request({
    //     url: app.globalData.rootUrl + `studio/1/student/${options.id}/contracts/${options.contractId}`,
    //     success: function (res) {
    //       // res.data.data.gender = parseInt(res.data.data.gender == null ? 1 : res.data.data.gender);
    //       // res.data.data.phone = parseInt(res.data.data.phone);
    //       // res.data.data.age = parseInt(res.data.data.age);
    //       that.setData({
    //         basic: res.data.data
    //       });
    //       console.log(that.data.basic);
    //     },
    //   })
    // }
    
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