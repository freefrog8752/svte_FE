// pages/user/user.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      id:'',
      name:'',
      address:'',
      startTime:'',
      openTime:'',
      closeTime: '',
      tel:'',
      intro:'',
    },
    path: 'https://doit.svte.cn',
    images:[],
    licImg:[]
  },

  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      'info.startTime': e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindFromTimeChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      'info.openTime': e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindToTimeChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      'info.closeTime': e.detail.value
    })
  },
  inputName: function (e) {
    this.setData({ 'info.name': e.detail.value })
  },
  inputPhone: function (e) {
    this.setData({ 'info.tel': Number(e.detail.value) })
  },
  inputIntro: function (e) {
    this.setData({ 'info.intro': e.detail.value })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    let that = this;
    wx.request({
      url: app.globalData.globalUrl.getStudio + app.globalData.studioId,
      success: function (res) {
        let data = res.data.data;
        data.closeTime = data.close_time;
        data.openTime = data.open_time;
        data.startTime = data.start_time;
        that.setData({
          info: data
        });
        console.log(that.data.info);
      },
    })
    let images = [];
    let lics = [];
    wx.request({
      url: app.globalData.rootUrl + 'studio/'+app.globalData.studioId+'/photos',
      success: function (res) {
        res.data.data.forEach(item=>{
          if (item.type == 'license'){
            lics.push(item);
          }else{
            images.push(item);
          } 
        })
        that.setData({
          images: images
        });
        that.setData({
          licImg: lics
        });
       console.log(that.data.licImg,that.data.images);
      },
    })
  },
  chooseImage(e) {
    const type = e.currentTarget.dataset.type
    let param = {};
    console.log(type == 2);
    if(type == 2){
      param = { type:'license'}
    }
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        console.log(res);
        wx.uploadFile({
          url: 'https://doit.svte.cn/api/v1/studio/'+app.globalData.studioId+'/photos',
          filePath: res.tempFilePaths[0],
          name: 'img',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData:param,
          success: (resp)=>{
            let data = JSON.parse(resp.data)
            if(type==1){
              this.setData({ images: this.data.images.concat(data.data) });
            }else{
              this.setData({ licImg: this.data.licImg.concat(data.data) });
            }
            
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
      url: app.globalData.rootUrl + 'studio/' + app.globalData.studioId + '/photos/'+id,
      method:'delete',
      success: (res)=> {
        if (type == 1) {
          arr=this.data.images
          arr.splice(idx,1);
          this.setData({ images : arr})
         
        }else{
          arr = this.data.licImg
          arr.splice(idx, 1);
          this.setData({ licImg: arr })
        }
    
      },
    })
   
    
  },

  handleImagePreview(e) {
    const type = e.currentTarget.dataset.type
    const idx = e.currentTarget.dataset.idx
    const images = this.data.images
    let imgs = [];
    images.forEach(item=>{
      imgs.push(this.data.path+item.path);
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
      method:'put',
      data:that.data.info,
      success: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '保存成功！',
        })
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