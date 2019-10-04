
var app = getApp();
Page({
    data: {
        motto: '点击 “编译” 以构建',
        userInfo: {},
        hasUserInfo: false,
        path:'',
        id: app.globalData.studentId,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imgUrls: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570423217&di=10554f412cb2b3a38eca6b30f4fab9aa&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201303%2F31%2F20130331175928_hHvts.jpeg'
        ],
        courseList: [
        ],
        notificationList: [
        ],
        messageList: [
            {
                'date': '2019年9月1日13:00~14:00',
                'info': '留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言',
                'name': '张三'
            },
            {
                'date': '2019年9月1日13:00~14:00',
                'info': '留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言',
                'name': '李四'
            }
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 3000,
        duration: 1000,
        previousMargin: "15px",
        nextMargin: "15px",
        isEmptyCourseList: true
    },
    gotoNoti:function(){
      wx.navigateTo({
        url: '../notification/notification',
      })
    },
  signin:function(){
    wx.request({
      url: app.globalData.rootUrl+'student/'+app.globalData.studentId+'/signin',
      success:data=>{
        wx.showToast({
          title: '打卡成功！',
        })
      }
    })
  },
    onLoad: function () {
        wx.request({
          url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/student/' + app.globalData.studentId+'/plans',
          success:data=>{
            console.log(data.data)
            this.setData({
              courseList: data.data.data,
              isEmptyCourseList: data.data.data.length === 0
            });
          }
        })
        wx.request({
          url: app.globalData.rootUrl+'studio/'+app.globalData.studioId+'/news',
          success:data=>{
            this.setData({
              notificationList:data.data.data
            });
          }
        })
    },
    getUserInfo: function (e) {
        console.log(e);
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        });
    }
});
