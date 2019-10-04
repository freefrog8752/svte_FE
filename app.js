//app.js
const url = 'https://doit.svte.cn/api/v1/';
const studio = 'studio/'
App({
  //生命周期函数--监听小程序初始化
  //当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onLaunch: function (options) {
    console.log(options);
    this.globalData.scene = options.scene;
    this.globalData.sceneQuery = options.query;
  },
  onShow:function(options){
    console.log(options);
  },

  globalData: {
    coach: {},
    msgList: [],
    rootUrl: 'https://doit.svte.cn/api/v1/',
    studentId:0,
    scene:1001,
    sceneQuery:{},
    // userInfo:null
    globalUrl: {
      getCoaches: "https://doit.svte.cn/api/v1/studio/1/coaches",
      getStudents: "https://doit.svte.cn/api/v1/studio/1/students",
      createUsers: "https://doit.svte.cn/api/v1/studio/1/users",
      getStudent: url + 'users/',
      getCoachDetail: url + 'coach/',
      // getCoachMSG: url + 'coach/'+getApp().coach.id+'/messages',
      getStudio: url + 'studios/',
      getMSG: "https://doit.svte.cn/api/v1/studio/1/messages",
      studioPath: url + studio,
      getBill: 'https://doit.svte.cn/api/v1/studio/1/earnings',
      getStudioImg: 'https://doit.svte.cn/api/v1/studio/1/photos',
      createCourse: 'https://doit.svte.cn/api/v1/coach/7/plans',
      getBodyparts:url+'movements/body-parts',
      getLevels: url +'movements/levels',
      getFunctions: url +'movements/functions',
      getApparatus: url +'movements/apparatus',
      getMovTypes: url +'movements/types',
      // getCourse: url + this.globalData.studioId +'/course',
      // addCourse: url + this.globalData.studioId + '/course',
      // delCourse: url + this.globalData.studioId + '/course',
    },
    imgUrl: 'http://doit.svte.cn/images/',
    studioId: '1'

  }
})
