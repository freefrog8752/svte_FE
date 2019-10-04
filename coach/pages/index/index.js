//index.js
//获取应用实例
var app = getApp()
var arr_name = ["学员管理", "消息", "个人信息",  "课程管理",  "训练计划总结","我的工资"]
var arr_link = [1, 10, 15, 52, 62, 68, 75, 82, 98]
var file = "../../pages/student/student"
Page({
  data: {
    items: [{
      src: app.globalData.imgUrl + "9.png",
      text: arr_name[0],
      url: '../../pages/student/student'
    }, {

      src: app.globalData.imgUrl + "10.png",
      text: arr_name[1],
      url: '../../pages/message/message'
    }, {

      src: app.globalData.imgUrl + "11.png",
      text: arr_name[2],
      url: '../../pages/user-info/user-info'
    }, 
    // {

    //   src: app.globalData.imgUrl + "12.png",
    //   text: arr_name[3],
    //   url: '../../pages/studio/studio'
    // }, 
    {

      src: app.globalData.imgUrl + "13.png",
      text: arr_name[3],
        url: '../../pages/course/course'
    }, 
    // {
    //   src: app.globalData.imgUrl + "14.png",
    //   text: arr_name[5],
    //   url: '../../pages/bill/bill'
    // }, 
    {
      src: app.globalData.imgUrl + "15.png",
      text: arr_name[4],
      url: '../../pages/plan/applylist'
      }, {
        src: app.globalData.imgUrl + "16.png",
        text: arr_name[5],
        url: '../../pages/salary/salary'
      }],
    url: file,
  },
})
