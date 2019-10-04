//index.js
//获取应用实例
var app = getApp()

Page({
    data: {
      descOnly:0,
      isChecked: true
    },
    gotoDesc:function(evt){
      wx.login({
        success: res => {
          console.log(res);
          wx.request({
            url: app.globalData.rootUrl + 'auth/' + res.code,
            success: data => {
              console.log(data.data)
              if (this.data.descOnly == 1) {
                wx.navigateTo({
                  url: '../../student/pages/studio/studio?descOnly=1&jscode='+res.code,
                })
              }
            }
          })
        }
      })
    },
    login:function(evt){

      console.log(evt);
      // if(!this.data.isChecked){
      //   wx.showToast({
      //     title: '请勾选阅读协议',
      //   })
      //   return;
      // }
      if(evt.detail.userInfo){
        wx.login({
          success:res=>{
            console.log(res);
            wx.request({
              url: app.globalData.rootUrl+'auth/'+res.code,
              success:data=>{
                console.log(data.data);
                //临时逻辑
                // wx.showActionSheet({
                //   itemList: ['我是会员', '我是教练', '工作室'],
                //   success: data => {
                //     if (data.tapIndex == 0) {
                //       wx.navigateTo({
                //         url: '../../student/pages/index/index',
                //       })
                //     } else if (data.tapIndex == 1) {
                //       app.globalData.coach = evt.detail.userInfo ? evt.detail.userInfo : {};
                //       app.globalData.coach.id = 7;//接口bug修复后需要取正确的ID，暂时用7
                //       wx.request({
                //         url: 'https://doit.svte.cn/api/v1/studio/1/coaches/7',
                //         success: data => {
                //           app.globalData.coach = data.data.data[0];
                //           console.log(data.data.data[0]);
                //           app.globalData.coach.photo = evt.detail.userInfo ? evt.detail.userInfo.avatarUrl : '';
                //           wx.navigateTo({
                //             url: '../../coach/pages/index/index',
                //           })
                //         }
                //       })
                //     } else {
                //       wx.navigateTo({
                //         url: '../../studio/pages/index/index'
                //       })
                //     }
                //   }
                // })
                //////////////
                if(data.data.data.length == 0){
                  if (this.data.isCoach) {
                    wx.showModal({
                      title: '是否注册成为教练',
                      content: '',
                      success: data => {
                        if (data.confirm) {
                          wx.login({
                            success:resp=>{
                              wx.request({
                                url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/coaches',
                                method: 'post',
                                data: {
                                  "account": resp.code, "studioId": app.globalData.studioId, "roleId": 2, 'name': evt.detail.userInfo.nickName, 'gender': evt.detail.userInfo.gender, 'birthdate': '2020-01-01'
                                },
                                success: data => {
                                  console.log(data);
                                }
                              })
                            }
                          })
                        
                        }
                      }
                    })
                  }else if(this.data.isStudent){
                    wx.showModal({
                      title: '是否注册成为学员',
                      content: '',
                      success: data => {
                        if (data.confirm) {
                          wx.login({
                            success:resp=>{
                              wx.request({
                                url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/students',
                                method: 'post',
                                data: {
                                  "account": resp.code, "studioId": app.globalData.studioId, 'name': evt.detail.userInfo.nickName, 'gender': evt.detail.userInfo.gender, 'birthdate': '2020-01-01'
                                },
                                success: data => {
                                  console.log(data);
                                }
                              })
                            }
                          })
                          
                        }
                      }
                    })
                  }else{
                    wx.navigateTo({
                      url: '../../studio/pages/index/index'
                    })
                  }
                }else{
                 // 根据role 判断去向,接口有错误不能正常跳转
                  if (data.data.data[0].student_id) {
                    app.globalData.studioId = data.data.data[0].studio_id;
                    app.globalData.studentId = data.data.data[0].student_id;
                    wx.navigateTo({
                      url: '../../student/pages/index/index',
                    })
                  } else if (data.data.data[0].coach_id) {
                    app.globalData.studioId = data.data.data[0].studio_id;
                    app.globalData.coach = evt.detail.userInfo ? evt.detail.userInfo : {};
                    app.globalData.coach.id = data.data.data[0].coach_id;
                    wx.request({
                      url: 'https://doit.svte.cn/api/v1/studio/' + app.globalData.studioId + '/coaches/' + app.globalData.coach.id,
                      success: data => {
                        app.globalData.coach = data.data.data[0];
                        console.log(data.data.data[0]);
                        app.globalData.coach.photo = evt.detail.userInfo ? evt.detail.userInfo.avatarUrl : '';
                        wx.navigateTo({
                          url: '../../coach/pages/index/index',
                        })
                      }
                    })
                  } else {
                  // app.globalData.studioId = 1;
                    wx.navigateTo({
                      url: '../../studio/pages/index/index'
                    })
                  }
                }

                ///////////////////
              }
            })
          }
        })
      }else{
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function (res) {
            
          }
        })
      }
      //临时逻辑
      
    },
    onLoad:function(options){
      if (options.finish) {
        wx.navigateBack({
          delta: 1
        })
      }

      console.log(app.globalData.scene,app.globalData.sceneQuery);
      const scene = app.globalData.scene;
      const query = app.globalData.sceneQuery;
      const { descOnly, studioId} = query;
      if(descOnly){
        this.setData({ descOnly: descOnly })
      }
      if (studioId) {
        app.globalData.studioId = studioId;
      }
      if(query.isCoach=='true'){
        this.setData({ isCoach: options.isCoach=='true' });
      }
      if (query.isStudent=='true') {
        this.setData({ isStudent: options.isStudent=='true' });
      }
    },
  isSingleChange: function (e) {
    console.log(e);
    this.setData({ isChecked: e.detail.value[0] ? true : false })
  },
  exit:function(){
    wx.navigateTo({
      url: 'index?finish=true'
    })
  }
})
