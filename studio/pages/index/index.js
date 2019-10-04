//index.js
//获取应用实例
var app = getApp()
var arr_name = ["学员管理", "教练管理", "发布", "工作室", "消息", "账单", "课程管理","申请管理"]//,"授权"]
var arr_link = [1, 10, 15, 52, 62, 68, 75, 82, 98]
var file = "../../pages/student/student"
Page({
    data: {
        items: [ {
            src: app.globalData.imgUrl+"1.png",
            text: arr_name[0],
          url:'../../pages/student/student'
        }, {
            
            src: app.globalData.imgUrl+"2.png",
            text: arr_name[1],
            url: '../../pages/coach/coach'
        }, {
            
            src: app.globalData.imgUrl+"3副本.png",
            text: arr_name[2],
            url: '../../pages/publish/publish-list'
        }, {
            
            src: app.globalData.imgUrl+"4.png",
            text: arr_name[3],
            url: '../../pages/studio/studio'
        }, {
            
            src: app.globalData.imgUrl+"8.png",
            text: arr_name[4],
            url: '../../pages/message/message'
        }, {
            src: app.globalData.imgUrl+"6.png",
            text: arr_name[5],
            url: '../../pages/bill/bill'
        }, {
            src: app.globalData.imgUrl+"7.png",
            text: arr_name[6],
            url: '../../pages/course/course'
          },
           {
            src: app.globalData.imgUrl + "9.png",
            text: arr_name[7],
            url: '../../pages/auth/auth'}
            ],
        url:file,
    },
})
