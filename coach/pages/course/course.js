// coach/pages/course/course.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidelist: true,
    currentFirst:'',
    currentLast:'',
    currentCourse:{},
    studiocourse: [],
    coursesList: [

    ],
    isEmptyCourseList: true,
    times: [ '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
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
    this.loadDates();
  },
  loadDates:function(){
    let fd = this.getTime(this.data.weekoffset);
    let ld = this.getTime(this.data.weekloffset);
    let dates = this.getDiffDate(fd, ld);
    let datesArr = [];
    dates.forEach(d=>{
      datesArr.push({ fulldate: d, simple: (d.split('-')[1] +'-'+ d.split('-')[2])});
    });
    datesArr = [''].concat(datesArr);
    this.setData({
      currentFirst: fd,
      currentLast: ld,
      'dates': datesArr
    })
   let sun = new Date(this.data.currentLast+' 00:00:00')
    sun.setDate(sun.getDate() + 1);
    const lastDay = sun.getFullYear() + '-' + ((sun.getMonth() + 1) < 10 ? ('0' + (sun.getMonth() + 1)) : (sun.getMonth() + 1)) + '-' + (sun.getDate() < 10 ? ('0' + sun.getDate()) : sun.getDate());
    // console.log(lastDay)
    wx.request({
      url: app.globalData.rootUrl + 'coach/' + app.globalData.coach.id +'/plans?startApplyTime='+this.data.currentFirst+'&endApplyTime='+lastDay,
      success:res=>{
        let courses = [];
        console.log(res.data);
        res.data.data.forEach(d=>{
          let date = new Date(d.apply_time);
          let dateObj = {
            date: ((((date.getMonth() + 1) < 10) ?'0'+ (date.getMonth() + 1): (date.getMonth() + 1) )+ '-' + (date.getDate() < 10 ? ('0' + date.getDate()): date.getDate())),
            time: (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())+':00',
            isRest:d.is_rest,
            courseId: d.studio_course_id,
            course_name: d.course_name
            }
          courses.push(dateObj)
        })
        this.setData({'courses': courses});
        console.log(this.data.courses);
      }
    })
  },
  checkCate: function (e) {
    this.setData({ hidelist: false });
  },
  setCourse:function(e){
    console.log(e.target.dataset);
    wx.navigateTo({
      url: 'course-add?data=' + JSON.stringify(e.target.dataset),
    })
  },
  changeDuration:function(e){
    let type = e.target.dataset.type;
    let fd = this.data.weekoffset;
    let ld = this.data.weekloffset;
    let offset = 0;
    if(type == 0){
      offset = 7;
    }else{
      offset = -7;
    }
    this.setData({
      weekoffset: fd+offset,
      weekloffset: ld+offset
    });
    this.loadDates();
  },
  confirm: function () { this.setData({ hidelist: true }); },
  selcourse: function (e) {
    console.log(e);
    this.setData({ selCourseId: e.currentTarget.dataset.c.id, currentCourse: e.currentTarget.dataset.c });
  },
  setDefault:function(){
    let params = [];
    let courses = this.data.courses;
    const times = this.data.times;
    const dates = this.data.dates;
    courses.forEach(c=>{
      c.full = c.date+c.time
    });
    dates.forEach(d=>{
      if (d.fulldate){
      times.forEach(t=>{
        params.push({ applyTime: d.fulldate + ' ' + t, courseId:this.data.selCourseId, isRest:0, isSingle:1,full:d.simple+t});
      })
      }
    });
  console.log(params);
  for(let i = 0;i<params.length;i++){
    courses.forEach(c=>{
      if (params[i].full == c.full) {
        params.splice(i,1);
      }
    });
  }
    let plans = { plans: params };
    wx.request({
      url: app.globalData.rootUrl + 'coach/' + app.globalData.coach.id + '/plans',
      data: plans,
      method: 'post',
      success: data => {
        console.log(data);
        this.loadDates();
      }
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
  getDiffDate : function(start, end) {
    var startTime = this.getDate(start);
    var endTime = this.getDate(end);
    var dateArr = [];
    while((endTime.getTime() - startTime.getTime()) > -1) {
  var year = startTime.getFullYear();
  var month = (startTime.getMonth()+1) < 10 ? "0" + (parseInt(startTime.getMonth().toString(), 10) + 1) : (startTime.getMonth() + 1);
  var day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
  dateArr.push(year + "-" + month + "-" + day);
  startTime.setDate(startTime.getDate() + 1);
}
return dateArr;
},

getDate:function(datestr) {
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
  // getDates: function(fd,ld){
  //   var start_time = fd;
  //   var end_time = ld;
  //   var bd = new Date(start_time), be = new Date(end_time);
  //   var bd_time = bd.getTime(), be_time = be.getTime(), time_diff = be_time - bd_time;
  //   var d_arr = [];
  //   for (var i = 0; i <= time_diff; i += 86400000) {
  //     var ds = new Date(bd_time + i);
  //     d_arr.push(ds.getDate());
  //   }
  //   return d_arr;
  // },
  getTime: function(n) {
    var now = new Date();
   
    var day = now.getDay(); //返回星期几的某一天;
    n = day == 0 ? n + 6 : n + (day - 1)
    console.log(n);
    now.setDate(now.getDate() - n);
    var month = now.getMonth() + 1;
    var year = now.getFullYear();
console.log(day,month,year);
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})