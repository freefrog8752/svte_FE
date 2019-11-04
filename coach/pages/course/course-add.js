// coach/pages/course/course-add.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isInstead:false,
    students:[],
    sIndex:0,
    planId:'',
    date:{},
    time:'',
    setType:1,
    isRest:'y',
    courses:[],
    fIndex:0,
    courseId:'',
    courseName:'',
    isSingle:true
  },
  pickerFiled: function (e) {
    console.log(e.detail.value);
    let courses = this.data.courses;
    this.setData({
      fIndex: e.detail.value,
      courseId: courses[e.detail.value].id,
      courseName: courses[e.detail.value].name
    })
  },
  pickerStudents: function (e) {
    console.log(e.detail.value);
    let students = this.data.students;
    this.setData({
      sIndex: e.detail.value,
      studentId: students[e.detail.value].id,
      studentName: students[e.detail.value].name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let data = JSON.parse(options.data)
    this.setData({date:data.date,time:data.time});
    if(data.groupitem.planId){
      this.setData({planId:data.groupitem.planId})
    }
    else if (data.restitem.planId) { this.setData({ planId: data.groupitem.planId })}

    wx.request({
      url: app.globalData.globalUrl.getStudents,
      success: res=> {
        this.setData({
          students: res.data.data
        });
        
      },
      fail: function (error) {
        console.log(error);
        this.setData({
          request_fail: true,
        });
      }
    })
  },
setCourse:function (e){
  console.log(e);
  this.setData({'setType':e.target.dataset.type})
},
  isInsteadChange:function(e){
    this.setData({ isInstead: e.detail.value[0] ? true : false })
  },
  checkboxChange: function (e) {
    console.log(e);
    this.setData({ isRest: e.detail.value[0] ? true : false })
  },
  isSingleChange: function (e) {
    console.log(e);
    this.setData({isSingle:e.detail.value[0]?true:false})
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

      url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/course',
      success: function (res) {
        that.setData({
          courses: res.data.data,
          courseName: res.data.data[0].name,
          courseId: res.data.data[0].id,
          courseName: res.data.data[0].name
        });

      },
    })
  },
  addCourse:function(){
    let param = { applyTime: this.data.date+' '+this.data.time};
   if(this.data.setType==1){
     param.courseId = 0;
     param.isRest = 1;
     param.isSingle = 1
   }else{
     param.courseId = this.data.courseId;
     param.isRest = 0;
     param.isSingle = this.data.isSingle?1:0;
   }
   let plans = {plans:[param]};
   if(this.data.planId!=''){
     param.id = this.data.planId;
     plans = { plans: [param] };

     wx.request({
       url: app.globalData.rootUrl + 'coach/' + app.globalData.coach.id + '/plans/'+this.data.planId,
       data: plans,
       method: 'put',
       success: data => {
         console.log(data);
         if (this.data.isInstead) {
           this.savePlan(this.data.planId);
         }
         wx.navigateBack({

         })
       }
     })
   }else{
     wx.request({
       url: app.globalData.rootUrl + 'coach/' + app.globalData.coach.id + '/plans',
       data: plans,
       method: 'post',
       success: data => {
         console.log(data);
         if(this.data.isInstead){
           this.savePlan(data.data.data[0].planId);
         }
         wx.navigateBack({

         })
       }
     })
   }
    
  },
  savePlan: function (planId) {
    wx.request({
      url: app.globalData.rootUrl + 'studio/' + this.data.studentId + '/student/' + this.data.studentId + '/plans',
      method: 'post',
      data: { planId: planId },
      success: data => {
        wx.showToast({
          title: '保存成功',
        })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})