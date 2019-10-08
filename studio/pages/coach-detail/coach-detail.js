// pages/user/user.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coach:{},
    coursesList: [],
    images: [],
    path: 'https://doit.svte.cn',
    salary: {
      "sales_salary": 0,
      "baseSalary": 0,
      "reduce_salary":0
    }
  },
  inputCourse:function(e){
    this.setData(
      { 'salary.coursePercentage': e.detail.value, 'coach.course_percentage': e.detail.value,}
    );
  },
  inputReduce: function (e) {
    this.setData(
      { 'salary.reduceCoursePercentage': e.detail.value, 'coach.reduce_course_percentage': e.detail.value }
    );
  },
  inputBase: function (e) {
    this.setData(
      { 'salary.baseSalary': e.detail.value, 'coach.base_salary': e.detail.value }
    );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options);
    let coach = JSON.parse(options.data);
    this.setData({coach:coach});
    let images = [];
    wx.request({
      url: app.globalData.rootUrl + 'coach/' + this.data.coach.id + '/photos',
      success: data => {
        data.data.data.forEach(item => {
          images.push(item);
        })
        that.setData({
          images: images
        })
        console.log(that.data.images);
      }
    })
    wx.request({
      url: app.globalData.rootUrl + 'studio/coache/' + this.data.coach.id + '/salary',
      success: data => {
        console.log(data.data.data[0]);
        this.setData({ salary: data.data.data[0] });
      }
    })
    wx.request({
      url: app.globalData.rootUrl + 'coach/' + this.data.coach.id + '/course',
      success: data => {
        let arr = [];
        data.data.data.forEach(item => {
          arr.push(item.name);
        });
        this.setData({ coursesList: arr });
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
delUser:function(){
  
},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let salary = this.data.salary;
    
    if (salary.baseSalary || salary.coursePercentage || salary.reduceCoursePercentage) {
      for(let k in salary){
        if(salary[k]){
          salary[k] = Number(salary[k]);
        }else{
          salary[k] = 0;
        }
      }
      wx.request({
        method:'post',
        url: app.globalData.rootUrl + 'coach/' + this.data.coach.id + '/salary',
        data: salary,
        success: data => { console.log(data.data) }

      })
    }
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