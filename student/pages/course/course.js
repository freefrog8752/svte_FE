// miniprogram/pages/course.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidelist:true,
    showBox: 1,
    activeNav: 1,
    isEmptyCourseList:true,
    currentFirst: '',
    currentLast: '',
    selcate:'',
    planId:'',
    coaches:[],
    currentCoach:{},
    studiocourse:[],
    times: [ '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
    dates: [],
    weekoffset: 0,
    weekloffset: -6,
    courses: [

    ],
    coursesList: [

    ],
    historyList:[
    ]
  },
  selPlanCourse:function(){

  },
  switchTab: function (event) {
    this.setData({
      showBox: event.currentTarget.dataset.boxNum,
      activeNav: event.currentTarget.dataset.boxNum,
    });
    wx.request({
      url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/student/' + app.globalData.studentId + '/plans',
      success: data => {
        this.setData({ coursesList: data.data.data });
        this.setData({
          isEmptyCourseList: this.data.coursesList.length === 0
        })
      }
    })
  },
  loadDates: function () {
    let fd = this.getTime(this.data.weekoffset);
    let ld = this.getTime(this.data.weekloffset);

    let dates = this.getDiffDate(fd, ld);
    let datesArr = [];
    dates.forEach(d => {
      datesArr.push({ fulldate: d, simple: (d.split('-')[1] + '-' + d.split('-')[2]) });
    });
    datesArr = [''].concat(datesArr);
    this.setData({
      currentFirst: fd,
      currentLast: ld,
      'dates': datesArr
    })
  },
  setCourse: function (e) {
    console.log(e.currentTarget.dataset);
    if(e.currentTarget.dataset.p.can_apply){
      let time = e.currentTarget.dataset.time;
      let date = e.currentTarget.dataset.date;
      this.setData({
        issel:date.simple+time
      });
    this.setData({
      planId: e.currentTarget.dataset.p.planId
    });
    }
    // wx.navigateTo({
    //   url: 'course-add?data=' + JSON.stringify(e.target.dataset),
    // })
  },
  changeDuration: function (e) {
    let type = e.target.dataset.type;
    let fd = this.data.weekoffset;
    let ld = this.data.weekloffset;
    let offset = 0;
    if (type == 0) {
      offset = 7;
    } else {
      offset = -7;
    }
    console.log(fd,ld)
    this.setData({
      weekoffset: fd + offset,
      weekloffset: ld + offset
    });
    this.loadDates();
    if (this.data.selCourseId){
      wx.request({
        url: app.globalData.globalUrl.getCoaches + '?courseId=' + this.data.selCourseId,
        success: data => {
          this.setData({ coaches: data.data.data });
          this.showCoaches(1);
        }
      })
    }
  },
  getDiffDate: function (start, end) {
    var startTime = this.getDate(start);
    var endTime = this.getDate(end);
    var dateArr = [];
    while ((endTime.getTime() - startTime.getTime()) > -1) {
      var year = startTime.getFullYear();
      var month = (startTime.getMonth()+1) < 10 ? "0" + (parseInt(startTime.getMonth().toString(), 10) + 1) : (startTime.getMonth() + 1);
      var day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
      //     console.log(dateArr[0])
      //     console.log(dateArr[0] && (parseInt(dateArr[0].split('-')[2]) > parseInt(day)))
      //     if(dateArr[0] && (parseInt(dateArr[0].split('-')[2]) > parseInt(day))){
      //   month=month+1;
      // }
      dateArr.push(year + "-" + month + "-" + day);
      startTime.setDate(startTime.getDate() + 1);
    }
    return dateArr;
  },

  getDate: function (datestr) {
    var temp = datestr.split("-");
    if (temp[1] === '01') {
      temp[0] = parseInt(temp[0], 10) - 1;
      temp[1] = '12';
    } else {
      temp[1] = parseInt(temp[1], 10) - 1;
    }
    //new Date()的月份入参实际都是当前值-1
    var date = new Date(temp[0], temp[1], temp[2]);
    return date;
  },
  confirm:function(){this.setData({hidelist:true});},

  getTime: function (n) {
    var now = new Date();

    var day = now.getDay(); //返回星期几的某一天;
    n = day == 0 ? n + 6 : n + (day - 1)

    now.setDate(now.getDate() - n);
    var month = now.getMonth() + 1;
    var year = now.getFullYear();

    if (day) {
      //这个判断是为了解决跨年的问题
      if (month >= 1) {
        month = month;
      }
      //这个判断是为了解决跨年的问题,月份是从0开始的
      else {
        year = year - 1;
        month = 12;
      }
    }
    let date = now.getDate();
    var s = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (date < 10 ? ('0' + date) : date);
    return s;
  },
  checkCate:function(e){
    let cate = e.currentTarget.dataset.cate;
    console.log(cate);
    this.setData({ hidelist:false,selcate:cate});
  },
  cancel:function(){this.setData({hidelist:true})},
  showCoaches: function (i) { this.setData({ hidelist: false, selcate: i });},
  selcoach:function(e){
    let coach = e.currentTarget.dataset.c;
    this.setData({currentCoach:coach});
    console.log(this.data.currentCoach);
    let sun = new Date(this.data.currentLast + ' 00:00:00')
    sun.setDate(sun.getDate() + 1);
    const lastDay = sun.getFullYear() + '-' + ((sun.getMonth() + 1) < 10 ? ('0' + (sun.getMonth() + 1)) : (sun.getMonth() + 1)) + '-' + (sun.getDate() < 10 ? ('0' + sun.getDate()) : sun.getDate());
    wx.request({
      url: app.globalData.rootUrl + 'coach/' + this.data.currentCoach.id + '/plans?startApplyTime=' + this.data.currentFirst + '&endApplyTime=' + lastDay,
      success: res => {
        let courses = [];
        console.log(res.data);
        res.data.data.forEach(d => {
          let date = new Date(d.apply_time);
          let dateObj = {
            date: (((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate())),
            time: (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':00',
            isRest: d.is_rest,
            courseId: d.studio_course_id,
            planId:d.id,
            course_name:d.course_name,
            can_apply: d.can_apply
          }
          courses.push(dateObj)
        })
        this.setData({ 'courses': courses });
        console.log(this.data.courses);
      }
    })
    
  },
  savePlan:function(){
    wx.request({
      url: app.globalData.rootUrl +'studio/'+app.globalData.studentId+'/student/'+app.globalData.studentId+'/plans',
      method:'post',
      data:{planId:this.data.planId},
      success:data=>{
        wx.showToast({
          title: '保存成功',
        })
      }
    })
  },
  selcourse: function (e) {
    console.log(e);
    this.setData({selCourseId : e.currentTarget.dataset.c.id});
    wx.request({
      url: app.globalData.globalUrl.getCoaches + '?courseId=' + e.currentTarget.dataset.c.id,
      success:data=>{
        this.setData({coaches:data.data.data});
        this.showCoaches(1);
      }
    })
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
    wx.request({
      url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/student/' + app.globalData.studentId +'/plans',
      success: data => {
        this.setData({ coursesList: data.data.data });
        this.setData({
          isEmptyCourseList: this.data.coursesList.length === 0
        })
      }
    })
    wx.request({
      url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/coaches',
      success: data => {
        this.setData({
          coaches: data.data.data
        });
      }
    })
  },
cancelCourse:function(e){
  let p = e.currentTarget.dataset.item;
  wx.request({
    url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/student/' + app.globalData.studentId + '/plans/'+p.id,
    method:'delete',
    success: data => {
      // this.setData({ coursesList: data.data.data });
      wx.showToast({
        title: '取消成功',
      })
      this.setData({
        isEmptyCourseList: this.data.coursesList.length === 0
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
    this.loadDates();
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