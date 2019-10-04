// pages/user/user.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidelist: true,
   courseList:[],
selid:'',
    currentCoach:{},
    coachList:[],
    selCoachId:0
  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  confirm: function () {
    this.setCoach();
  },
  cancel: function () { this.setData({ hidelist: true }) },
  selcoach: function (e) {
    let coach = e.currentTarget.dataset.c;
    this.setData({ currentCoach: coach });
    console.log(this.data.currentCoach);
  },
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: app.globalData.globalUrl.getCoaches,
      success: function (res) {
        that.setData({
          coachList: res.data.data
        });
      }
    })
    wx.request({
      
      url: app.globalData.rootUrl + 'studio/'+ app.globalData.studioId + '/course',
      success: function (res) {
        that.setData({
          courseList: res.data.data
        });
      
      },
    })
  },
  linkDetail:function(e){
   this.setData({selid:e.currentTarget.dataset.id});
   wx.showActionSheet({
     itemList: ['删除课程','指定教练'],
     success:data=>{
       if(data.tapIndex == 0){
         this.rmcourse();
       }else{
         this.setData({
           hidelist:false
         });
       }
     }
   })
  },
  showCoachList:function(){
   
  },
  setCoach:function(){
    let courseArr = [];
    let ids = [];
    wx.request({
      url: app.globalData.rootUrl+'coach/'+this.data.currentCoach.id+'/course',
      success:res=>{
        courseArr = res.data.data;
        let flag = false;
        courseArr.forEach(item=>{
          ids.push(item.id);
          if(item.id == this.data.selid){
            flag=true;
          }
        })
        if(flag){
          wx.showToast({
            title: '已为教练指定过该课程',
          })
        }else{
          ids.push(this.data.selid);
          wx.request({
            url: app.globalData.rootUrl + 'coach/' + this.data.currentCoach.id + '/course',
            method: 'post',
            data: {'courseIds':ids.join(',')},
            success: data => {
              wx.showToast({
                title: '指定成功！',
              });
              this.setData({ hidelist: true });
            }
          })
        }
       
      }
    })
    
  },
gotoAdd: function(){wx.navigateTo({
  url: 'course-add',
})},
  rmcourse:function(){
    let that = this;
    wx.request({

      url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/course/'+this.data.selid,
      method:'delete',
      success: function (res) {
        wx.showToast({
          title: '删除成功',
        })
        wx.request({

          url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/course',
          success: function (res) {
            that.setData({
              courseList: res.data.data
            });

          },
        })
      },
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
    let that = this;
    wx.request({

      url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/course',
      success: function (res) {
        that.setData({
          courseList: res.data.data
        });

      },
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