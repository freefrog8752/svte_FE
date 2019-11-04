// miniprogram/pages/course.js
var app = getApp();
var util =require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidelist:true,
    hideClist: true,
    hideGroup:true,
    currentPlanId:'',
    groupArr:[],
    groupIndexArr:[],
    currentCourse:{},
    showBox: 1,
    activeNav: 1,
    isEmptyCourseList:true,
    currentFirst: '',
    currentLast: '',
    selcate:'',
    planId:'',
    coaches:[],
    disableIndexs:[],
    selectWeek: 0,
    timeBean: {},
    currentCoach:{},
    studiocourse:[],
    times: [ '07:00','07:30', '08:00','08:30', '09:00','09:30', '10:00','10:30', '11:00','11:30', '12:00','12:30', '13:00','13:30', '14:00','14:30', '15:00','15:30', '16:00','16:30', '17:00','17:30', '18:00','18:30', '19:00','19:30', '20:00','20:30', '21:00','21:30', '22:00','22:30','23:00'],
    dates: [],
    weekoffset: 0,
    weekloffset: -6,
    //该教练可以上的课
    canChooseCourses:[],
    //该教练已经排过的课
    courses: [

    ],
    //学员自己已订的课
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
  setCurrentCourse:function(e){
    console.log(e.currentTarget.dataset.c);
    let course = e.currentTarget.dataset.c;
    let times = course.duration/30-1;
    let index = this.data.times.indexOf(this.data.time);
    let flag = false;
    for(let i =1;i<=times;i++){
      let time = this.data.times[index+i];
      this.data.courses.forEach(item=>{
        if(item.time == time){
          flag = true;
        }
      })
    }
    if(flag){
      wx.showToast({
        title: '选课时间冲突',
      })
    }else{
      this.setData({
        currentCourse: e.currentTarget.dataset.c
      });
    }
    
  },
  
  confirm:function(){this.setData({hidelist:true});},
  confirmC: function () {
    this.addCourse();
    this.setData({ hideClist: true,currentCourse:{} }); 
  },

  checkCate:function(e){
    let cate = e.currentTarget.dataset.cate;
    console.log(cate);
    this.setData({ hidelist:false,selcate:cate});
  },
  cancel: function () { this.setData({ hidelist: true }) },
  cancelC: function () { this.setData({ hideClist: true,currentCourse:{} }) },
  showCoaches: function (i) { this.setData({ hidelist: false, selcate: i });},
  getCourses:function(){
    let sun = new Date(this.data.currentDay + ' 00:00:00')
    sun.setDate(sun.getDate() + 1);
    const lastDay = sun.getFullYear() + '-' + ((sun.getMonth() + 1) < 10 ? ('0' + (sun.getMonth() + 1)) : (sun.getMonth() + 1)) + '-' + (sun.getDate() < 10 ? ('0' + sun.getDate()) : sun.getDate());
    wx.request({
      url: app.globalData.rootUrl + 'coach/' + this.data.currentCoach.id + '/plans?startApplyTime=' + this.data.currentDay + '&endApplyTime=' + lastDay,
      success: res => {
        let courses = [];
        console.log(res.data);
        res.data.data.forEach(d => {
          let date = new Date(d.apply_time);
          let dateObj = {
            date: (((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate())),
            time: (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes()==0 ? '00' : '30'),
            isRest: d.is_rest,
            courseId: d.studio_course_id,
            planId: d.id,
            course_name: d.course_name,
            can_apply: d.can_apply,
            duration:d.duration
          }
          courses.push(dateObj);
          let times = dateObj.duration/30-1;
          for(let i=1;i<=times;i++){
            let tmpObj = {};
            let min = Number(dateObj.time.split(':')[1]);
            let minStr = '',hourStr = '';
            let hour = Number(dateObj.time.split(':')[0]);
            if(min+(30*i)==60){
              minStr = '00';
              hourStr = (hour+1)+'';
            }else{
              minStr = '30';
              hourStr = hour+'';
            }
            tmpObj.duration = dateObj.duration - 30*i;
            tmpObj.time = hourStr+':'+minStr;
            tmpObj.date = dateObj.date;
            tmpObj.isRest = dateObj.isRest;
            tmpObj.can_apply = dateObj.can_apply;
            tmpObj.courseId = dateObj.courseId;
            tmpObj.planId = dateObj.planId;
            tmpObj.course_name = dateObj.course_name;
            courses.push(tmpObj);
          }
        })
        this.setData({ 'courses': courses });
        let disableArr = [];
        let groupIndexArr = [];
        let groupArr = [];
        this.data.courses.forEach(item=>{
          if(this.data.times.indexOf(item.time)>=0){
            if(!item.can_apply){
              disableArr.push(this.data.times.indexOf(item.time));
            } else if (item.can_apply){
              groupIndexArr.push(this.data.times.indexOf(item.time));
              groupArr.push(item);
            }
          }
        })
//         let groupOriArr = groupArr;
//             groupOriArr.forEach(item=>{
//               if(60/30>1){
//                 for (let i = 0; i < 60 / 30;i++){
//                   groupArr.splice(groupArr.indexOf(item)+1,0,item)
//                 }
//               }
//             })
// console.log(groupArr);
        this.setData({ disableIndexs: disableArr, groupIndexArr: groupIndexArr,groupArr:groupArr});
        console.log(this.data.courses);
      }
    })
  },
  selcoach:function(e){
    let coach = e.currentTarget.dataset.c;
    this.setData({currentCoach:coach});
    console.log(this.data.currentCoach);
    this.getCourses();
    this.getCanChooseCourse();
  },
  savePlan:function(planId){
    wx.request({
      url: app.globalData.rootUrl +'studio/'+app.globalData.studentId+'/student/'+app.globalData.studentId+'/plans',
      method:'post',
      data:{planId:planId},
      success:data=>{
        wx.showToast({
          title: '保存成功',
        })
        this.getCourses();
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
   this.getStudentPlan();
    wx.request({
      url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/coaches',
      success: data => {
        this.setData({
          coaches: data.data.data
        });
      }
    })
  },
  getStudentPlan:function(){
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
cancelCourse:function(e){
  let p = e.currentTarget.dataset.item;
  console.log(p);
  wx.request({
    url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/student/' + app.globalData.studentId + '/plans/'+p.id,
    method:'delete',
    success: data => {
      // this.setData({ coursesList: data.data.data });
      
      wx.request({
        url: app.globalData.rootUrl + 'coach/' + p.studio_coach_id + '/plans/' + p.course_plan_id,
        method:'delete',
        success:res=>{
          this.getStudentPlan();
          this.getCourses();
          wx.showToast({
            title: '取消成功',
          });
        }
      })
      this.setData({
        isEmptyCourseList: this.data.coursesList.length === 0
      })
    }
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
      currentDay: timeBean.yearMonth+'-'+ timeBean.weekDayList[timeBean.selectDay].day
    })
    this.getCourses();
  },
  chooseCourse:function(e){
    
    if (e.currentTarget.dataset.disabled) { this.setData({  time: '' }); return; } else if (e.currentTarget.dataset.groupitem.planId){
      this.setData({ time: e.currentTarget.dataset.time })
      let planId = e.currentTarget.dataset.groupitem.planId;
      wx.showModal({
        title: '确认选择这节课？',
        success:res=>{
          if(res.confirm){
            this.savePlan(planId);
          }else{

          }
        }
      })
    }else{
      this.setData({hideClist:false,time:e.currentTarget.dataset.time})
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      timeBean: util.getWeekDayList(this.data.selectWeek),
    })
    let timeBean = this.data.timeBean;
    this.setData({
      currentDay:timeBean.yearMonth + '-' + timeBean.weekDayList[timeBean.selectDay].day
    })
  },
  getCanChooseCourse:function(){
    wx.request({
      url: app.globalData.rootUrl + 'coach/' + this.data.currentCoach.id + '/course',
      success: data => {
        let arr = [];
        data.data.data.forEach(item => {
          // item.durition = 60;
          arr.push(item)
        });
        this.setData({ canChooseCourses: arr });
      }
    })
  },
  addCourse: function () {
    let param = { applyTime: this.data.currentDay + ' ' + this.data.time };
   console.log(this.data.currentCourse);
      param.courseId = this.data.currentCourse.id;
      param.isRest = 0;
    param.isSingle =  1;
    
    let plans = { plans: [param] };
    wx.request({
      url: app.globalData.rootUrl + 'coach/' + this.data.currentCoach.id + '/plans',
      data: plans,
      method: 'post',
      success: data => {
        // console.log(data);
        this.savePlan(data.data.data[0].id);
        
      }
    })
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