// coach/pages/user-info/user-setting.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    coach:{},
    cIndex:0,
    courses:[],
    selCourse:'',
    coursesIds:[],
    coursesList:[],
    fileds: ['女', '男'],
    fIndex: 1,
    images: [],
    path: 'https://doit.svte.cn',
  },
  pickerFiled: function (e) {
    console.log(e.detail.value);
    this.setData({
      fIndex: e.detail.value,
      'coach.gender': Number(e.detail.value)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({type:options.type,coach:app.globalData.coach});
    console.log(this.data.coach);
    wx.request({
      url: app.globalData.rootUrl + 'studio/1/course',
      success:data=>{
        this.setData({courses:data.data.data});
      }
    })
    let images = [];
    wx.request({
      url: app.globalData.rootUrl +'coach/'+app.globalData.coach.id+'/photos',
      success:data=>{
        data.data.data.forEach(item => {
        
            images.push(item);
          
        })
        that.setData({
          images: images
        })
        console.log( that.data.images);
      }
    })
    wx.request({
      url: app.globalData.rootUrl + 'coach/'+app.globalData.coach.id+'/course',
      success: data => {
        let arr =[];
        data.data.data.forEach(item=>{
          arr.push(item.name);
        });
        this.setData({ coursesList: arr });
      }
    })
  },
  pickerCourse:function(e){
    let arr = this.data.courses;
    let carr = this.data.coursesList;
    this.setData({
      selCourse:arr[e.detail.value].name,
      cIndex:e.detail.value
    });
  
     if( carr.indexOf(this.data.selCourse)<0){
       carr.push(arr[e.detail.value].name);
     }
    console.log(carr);
    let ids =[];
    carr.forEach(id=>{
      arr.forEach(a=>{
        if(a.name == id){
          ids.push(a.id);
        }
        
      })
    });
    console.log(ids);
    this.setData({ 'coursesIds': [...this.data.coursesIds,...ids]});
    
  },
  gotoEdit:function(){
    if(this.data.type == 2){
      console.log(this.data.coursesIds)
      wx.request({
        url:app.globalData.rootUrl + 'coach/'+app.globalData.coach.id+'/course',
        method:'post',
        data:{
          courseIds: this.data.coursesIds.join(',')
        },success:data=>{
          wx.showToast({
            title: '保存成功',
          });
          wx.navigateBack({

          })
        }
      })
    }
    wx.request({
      url: app.globalData.rootUrl+'studio/'+app.globalData.studioId+'/coaches/'+this.data.coach.id,
      method:'put',
      data:this.data.coach,
      success:data=>{
        wx.showToast({
          title: '保存成功',
        });
        wx.navigateBack({
          
        })
      }
    })
  },
  inputSch: function (e) {
    console.log(e);
    this.setData({ 'coach.school': e.detail.value });
  },
  inputThor: function (e) {
    console.log(e);
    this.setData({ 'coach.thoracometer': e.detail.value });
  },
  inputWorkYear: function (e) {
    console.log(e);
    this.setData({ 'coach.work_years': e.detail.value, 'coach.workYears': e.detail.value});
  },
  inputCourseTime: function (e) {
    console.log(e);
    this.setData({ 'coach.course_time': e.detail.value, 'coach.courseTime': e.detail.value });
  },
  inputWaistline: function (e) {
    console.log(e);
    this.setData({ 'coach.waistline': e.detail.value });
  },
  inputHipline: function (e) {
    console.log(e);
    this.setData({ 'coach.hipline': e.detail.value });
  },
  inputCertificate: function (e) {
    console.log(e);
    this.setData({ 'coach.certificate': e.detail.value });
  },
  inputGoodat:function(e){
    console.log(e);
    this.setData({'coach.goodat':e.detail.value});
  },
  inputHei: function (e) {
    console.log(e);
    this.setData({ 'coach.height': e.detail.value });
  },
  inputWei: function (e) {
    console.log(e);
    this.setData({ 'coach.weight': e.detail.value });
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
  chooseImage(e) {
    let param = {file:'img'};
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        console.log(res);
        wx.uploadFile({
          url: 'https://doit.svte.cn/api/v1/coach/' + app.globalData.coach.id + '/photos',
          filePath: res.tempFiles[0].path,
          name: 'img',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: { file: res.tempFiles[0].path},
          success: (resp) => {
            console.log(resp);
            let data = JSON.parse(resp.data)
          
              this.setData({ images: this.data.images.concat(data.data) });
            

          }
        })
        // const images = this.data.images.concat(res.tempFilePaths)
        // this.data.images = images.length <= 4 ? images : images.slice(0, 4)
      }
    })
  },

  removeImage(e) {
    const idx = e.currentTarget.dataset.idx;
    const type = e.currentTarget.dataset.type
    console.log(this.data.images.splice(idx, 1))
    const id = e.currentTarget.dataset.id
    let arr = []
    wx.request({
      url: app.globalData.rootUrl + 'coach/'+app.globalData.coach.id+'/photos/' + id,
      method: 'delete',
      success: (res) => {
          arr = this.data.images
          arr.splice(idx, 1);
          this.setData({ images: arr })

      },
    })


  },

  handleImagePreview(e) {
    const type = e.currentTarget.dataset.type
    const idx = e.currentTarget.dataset.idx
    const images = this.data.images
    let imgs = [];
    images.forEach(item => {
      imgs.push(this.data.path + item.path);
    })
    console.log(imgs);
    wx.previewImage({
      current: imgs[idx],
      urls: imgs,
    })
  },

  submitForm(e) {
    const title = this.data.title
    const content = this.data.content
    const arr = []

    // for (let path of this.data.images) {
    //   arr.push(wxUploadFile({
    //     url: app.globalData.rootUrl + 'studio/'+ app.globalData.studioId + '/photos',
    //     filePath: path,
    //     name: 'qimg',
    //   }))
    // }

    wx.showLoading({
      title: '正在创建...',
      mask: true
    })
    let that = this;
    wx.request({
      url: app.globalData.globalUrl.getStudio + app.globalData.studioId,
      method: 'put',
      data: that.data.info,
      success: function (res) {
        wx.hideLoading();

      },
    })

    // Promise.all(arr).then(res => {
    //   return res.map(item => JSON.parse(item.data).url)
    // }).catch(err => {
    //   console.log(">>>> upload images error:", err)
    // }).then(urls => {
    //   return createQuestion({
    //     title: title,
    //     content: content,
    //     images: urls
    //   })
    // }).then(res => {
    //   wx.navigateBack()
    // }).catch(err => {
    //   console.log(">>>> create question error:", err)
    // }).then(() => {
    //   wx.hideLoading()
    // })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})