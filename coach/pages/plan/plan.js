// coach/pages/plan/plan.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course:{},
    filter1:[],
    filter2: [],
    filter3: [],
    filter4: [],
    filter5: [],
    actions: [],
    sel1:[],
    sel1Arr: {},
    sel2Arr: {},
    sel3Arr: {},
    sel4Arr: {},
    sel5Arr: {},
    sel2: [],
    sel3: [],
    sel4: [],
    sel5: [],
    selAct:{},
    selActs:[],
    hiddenmodalput:true,
    hideActsList: true,
    count:0,
    group:0,
    rest:0
  },
  getMovs:function(){
    console.log(app.globalData.rootUrl + 'movements?types=' + this.data.sel5 + '&levels=' + this.data.sel2 + '&apparatus=' + this.data.sel4 + '&functions=' + this.data.sel3 + '&body-parts=' + this.data.sel1)
    wx.request({
      url: app.globalData.rootUrl +'movements?types='+this.data.sel5+'&levels='+this.data.sel2+'&apparatus='+this.data.sel4+'&functions='+this.data.sel3+'&body-parts='+this.data.sel1,
      success:data=>{
        this.setData({actions:data.data.data});
      }
    })},
  showCountModal:function(e){
    this.setData({ selAct: e.currentTarget.dataset.item });
    this.setData({hiddenmodalput:false});
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true,count: 0,
      group: 0,
      rest: 0
    });
  },
  confirm: function () {
   let act ={...this.data.selAct,... { "movementId":this.data.selAct.id, "count": this.data.count, "group_count":this.data.group,"rest":this.data.rest }};
   let selActs = this.data.selActs;
   selActs.push(act);
   console.log(selActs)
    this.setData({
      hiddenmodalput: true, 
      selActs: selActs
    });
  },
  setActs:function(){
    wx.navigateTo({
      url: 'actionlist?courseId=' + this.data.course.course_plan_id +'&actions='+JSON.stringify(this.data.selActs)
    })
  },
  // cancelList:function(){
  //   this.setData({hideActsList:true})
  // },
  saveList:function(index){
    let i = index ? index : 0;
    let selActs = this.data.selActs;
    console.log(index, i, selActs[i]);
    wx.request({
      url: app.globalData.rootUrl + 'plan/' + this.data.course.course_plan_id + '/movements',
      method: 'post',
      data: selActs[i],
      success: data => {
        if (selActs[i + 1]) {
          this.saveList(i + 1);
        } else {
          wx.showToast({ title: '提交成功' })
          this.setData({ hideActsList: true });
        }
      }
    })
    this.setData({ hideActsList: true })
  },
    confirmList: function () {
this.saveList();
      
  },
  slidecount:function(e){
    this.setData({ count:e.detail.value});
  },
  slidegroup: function (e) {
    this.setData({ group_count: e.detail.value });
  },
  slidebreak: function (e) {
    this.setData({ rest: e.detail.value });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({course:JSON.parse(options.course)});
    console.log(this.data.course);
    wx.request({
      url: app.globalData.globalUrl.getBodyparts,
      success:data=>{
        this.setData({filter1:data.data.data})
      }
    })
    wx.request({
      url: app.globalData.globalUrl.getLevels,
      success: data => {
        this.setData({ filter2: data.data.data })
      }
    })
    wx.request({
      url: app.globalData.globalUrl.getFunctions,
      success: data => {
        this.setData({ filter3: data.data.data })
      }
    })
    wx.request({
      url: app.globalData.globalUrl.getApparatus,
      success: data => {
        this.setData({ filter4: data.data.data })
      }
    })
    wx.request({
      url: app.globalData.globalUrl.getMovTypes,
      success: data => {
        this.setData({ filter5: data.data.data })
      }
    })
  },
getSel1:function(e){
  let sel1 = this.data.sel1;
  let selVal = e.currentTarget.dataset.item;
  let sel1Arr = this.data.sel1Arr;
  if (sel1.indexOf(selVal)>-1){
   sel1.splice(sel1.indexOf(selVal),1);
   sel1Arr[selVal]=false;
  }else{
    sel1.push(selVal);
    sel1Arr[selVal] = true;
  }
  this.setData({'sel1':sel1});
  this.setData({ 'sel1Arr': sel1Arr });
},
  getSel2: function (e) {
    let sel = this.data.sel2;
    let selVal = e.currentTarget.dataset.item;
    let selArr = this.data.sel2Arr;
    if (sel.indexOf(selVal) > -1) {
      sel.splice(sel.indexOf(selVal), 1);
      selArr[selVal] = false;
    } else {
      sel.push(selVal);
      selArr[selVal] = true;
    }
    this.setData({ 'sel2': sel });
    this.setData({ 'sel2Arr': selArr });
  },
  getSel3: function (e) {
    let sel = this.data.sel3;
    let selVal = e.currentTarget.dataset.item;
    let selArr = this.data.sel3Arr;
    if (sel.indexOf(selVal) > -1) {
      sel.splice(sel.indexOf(selVal), 1);
      selArr[selVal] = false;
    } else {
      sel.push(selVal);
      selArr[selVal] = true;
    }
    this.setData({ 'sel3': sel });
    this.setData({ 'sel3Arr': selArr });
  },
  getSel4: function (e) {
    let sel = this.data.sel4;
    let selVal = e.currentTarget.dataset.item;
    let selArr = this.data.sel4Arr;
    if (sel.indexOf(selVal) > -1) {
      sel.splice(sel.indexOf(selVal), 1);
      selArr[selVal] = false;
    } else {
      sel.push(selVal);
      selArr[selVal] = true;
    }
    this.setData({ 'sel4': sel });
    this.setData({ 'sel4Arr': selArr });
  },
  getSel5: function (e) {
    let sel = this.data.sel5;
    let selVal = e.currentTarget.dataset.item;
    let selArr = this.data.sel5Arr;
    if (sel.indexOf(selVal) > -1) {
      sel.splice(sel.indexOf(selVal), 1);
      selArr[selVal] = false;
    } else {
      sel.push(selVal);
      selArr[selVal] = true;
    }
    this.setData({ 'sel5': sel });
    this.setData({ 'sel5Arr': selArr });
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