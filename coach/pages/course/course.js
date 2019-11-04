// coach/pages/course/course.js
let app = getApp();

var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    restArr:[],
    disableIndexs: [],
    groupArr: [],
    groupIndexArr: [],
    hidelist: true,
    currentFirst:'',
    currentLast:'',
    currentCourse:{},
    studiocourse: [],
    selectWeek: 0,
    timeBean: {},
    coursesList: [

    ],
    isEmptyCourseList: true,
    times: ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'],
    dates:[],
    weekoffset:0,
    weekloffset:-6,
    courses:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/course',
      success: data => {
        this.setData({ studiocourse: data.data.data });
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
    this.setData({
      timeBean: util.getWeekDayList(this.data.selectWeek),
    })
    let timeBean = this.data.timeBean;
    this.setData({
      currentDay: timeBean.yearMonth + '-' + timeBean.weekDayList[timeBean.selectDay].day
    })
    this.getCourses();
  },
  
  getCourses: function () {
    let sun = new Date(this.data.currentDay + ' 00:00:00')
    sun.setDate(sun.getDate() + 1);
    const lastDay = sun.getFullYear() + '-' + ((sun.getMonth() + 1) < 10 ? ('0' + (sun.getMonth() + 1)) : (sun.getMonth() + 1)) + '-' + (sun.getDate() < 10 ? ('0' + sun.getDate()) : sun.getDate());
    wx.request({
      url: app.globalData.rootUrl + 'coach/' + app.globalData.coach.id + '/plans?startApplyTime=' + this.data.currentDay + '&endApplyTime=' + lastDay,
      success: res => {
        let courses = [];
        console.log(res.data);
        res.data.data.forEach(d => {
          let date = new Date(d.apply_time);
          let dateObj = {
            date: (((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate())),
            time: (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() == 0 ? '00' : '30'),
            isRest: d.is_rest,
            courseId: d.studio_course_id,
            planId: d.id,
            course_name: d.course_name,
            can_apply: d.can_apply
          }
          courses.push(dateObj)
        })
        this.setData({ 'courses': courses });
        let disableArr = [];
        let groupIndexArr = [];
        let groupArr = [];
        let restArr = [];
        this.data.courses.forEach(item => {
          if (this.data.times.indexOf(item.time) >= 0) {
            if (item.isRest==1) {
              disableArr.push(this.data.times.indexOf(item.time));
              restArr.push(item);
            } else if (item.can_apply) {
              groupIndexArr.push(this.data.times.indexOf(item.time));
              groupArr.push(item);
            }
          }
        })
        this.setData({ disableIndexs: disableArr,restArr:restArr, groupIndexArr: groupIndexArr, groupArr: groupArr });
        console.log(this.data.courses);
      }
    })
  },
  chooseCourse:function(e){
    console.log(e.target.dataset);
    wx.navigateTo({
      url: 'course-add?data=' + JSON.stringify(e.target.dataset),
    })
  },
  /**
   * 点击了上一周，选择周数字减一，然后直接调用工具类中一个方法获取到数据
   */
  lastWeek: function (e) {
    var selectWeek = --this.data.selectWeek;
    var timeBean = this.data.timeBean
    timeBean = util.getWeekDayList(selectWeek)

    if (selectWeek != 0) {
      timeBean.selectDay = 0;
    }

    this.setData({
      timeBean,
      selectWeek
    })
  },

  /**
   * 点击了下一周，选择周数字加一，然后直接调用工具类中一个方法获取到数据
   */
  nextWeek: function (e) {
    var selectWeek = ++this.data.selectWeek;
    var timeBean = this.data.timeBean
    timeBean = util.getWeekDayList(selectWeek)

    if (selectWeek != 0) {
      timeBean.selectDay = 0;
    }

    this.setData({
      timeBean,
      selectWeek
    })
  },

  /**
   * 选中了某一日，改变selectDay为选中日
   */
  dayClick: function (e) {
    var timeBean = this.data.timeBean
    timeBean.selectDay = e.detail;
    this.setData({
      timeBean,
      currentDay: timeBean.yearMonth + '-' + timeBean.weekDayList[timeBean.selectDay].day
    })
    this.getCourses();
  },
  onReady: function () {
    
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