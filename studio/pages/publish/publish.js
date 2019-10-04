// pages/user/user.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

      title: '',
      content: '',
    id:0,
    images:[],
 path: 'https://doit.svte.cn',
  },

  inputTitle: function (e) {
    this.setData({ title: e.detail.value })
  },
  inputContent: function (e) {
    this.setData({ content: e.detail.value })
  },
  chooseImage(e) {
    let that = this;
    if(!this.data.title||!this.data.content){
      return;
    }else{
      if(!this.data.id){
        wx.request({
          url: 'https://doit.svte.cn/api/v1/studio/' + app.globalData.studioId + '/news',
          method:'post',
          data:{
            title:this.data.title,
            content:this.data.content
          },
          success:(res)=>{
            console.log(res.data.data)
            this.setData({id:res.data.data.id});
            this.chooseImg(that);
          }
        })
      }else{
        this.chooseImg(that);
      }
      
    }
   
  },
chooseImg:(that)=>{
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: res => {
      console.log(res);
      wx.uploadFile({
        url: 'https://doit.svte.cn/api/v1/studio/' + app.globalData.studioId + '/news/' + that.data.id + '/photos',
        filePath: res.tempFilePaths[0],
        name: 'img',
        header: {
          "Content-Type": "multipart/form-data"
        },

        success: (resp) => {
          let data = JSON.parse(resp.data)

          that.setData({ images: that.data.images.concat(data.data) });

        }
      })
    }
  })
},
  removeImage(e) {
    const idx = e.target.dataset.idx;
    console.log(this.data.images.splice(idx, 1))
    const id = e.target.dataset.id
    let arr = []
    wx.request({
      url: 'https://doit.svte.cn/api/v1/studio/' + app.globalData.studioId + '/news/' + that.data.id + '/photos/' + id,
      method: 'delete',
      success: (res) => {
          arr = this.data.images
          arr.splice(idx, 1);
          this.setData({ images: arr })
      },
    })


  },

  handleImagePreview(e) {
    const type = e.target.dataset.type
    const idx = e.target.dataset.idx
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

  addMsg(e) {
    if (!this.data.title || !this.data.content) {
      return;
    } else {
      if (this.data.images.length == 0){
        wx.showToast({
          title: '请上传图片',
        });
        return;
      }
        wx.request({
          url: 'https://doit.svte.cn/api/v1/studio/' + app.globalData.studioId + '/news/'+this.data.id,
          method: 'put',
          data: {
            title: this.data.title,
            content: this.data.content,
          },
          success: (res) => {
            this.setData({ id: res.data.data.id });
            wx.showToast({
              title: '发布成功',
            })
            wx.navigateBack({
              
            })
          }
        })
      } 

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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