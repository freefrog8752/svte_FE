//list.js
var app = getApp()
var number = 1
var isLoading = false
Page({
  data: {
    arr_res: [],
    windowHeight: "500px",
    loadingHidden: true,
    lodingInfo: "加载更多",
    url: "../../pages/content/content"
  },
  onLoad: function (options) {
    //使number重置为1
    number = 1;
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight + "px");
        that.setData({
          windowHeight: res.windowHeight + "px"
        })
      },
      fail: function (e) {
        console.log("获取设备信息失败" + e);
      }
    });

    // 动态设置标题栏。。。无效
    wx.setNavigationBarTitle({
      title: options.listName,
      fail: function () {
        console.log("更改标题失败");
      },
      success: function () {
        console.log("更改标题成功");
      }
    });
    // this.setData({arr_res:[{
    //   id:5,
    //   name:'学员1',
    //   account:'test1',
    //   password:'12333',
    //   phone:'133333333',
    //   last_login_time:'2019-06-06',
    //   gender:1,
    //   role:'学员'
    // }]})
    wx.request({
      url: app.globalData.globalUrl.getStudents,
      success: function (res) {
        that.setData({
          arr_res: res.data.data
        });
        console.log(that.data.arr_res);
      },
      fail: function (error) {
        console.log(error);
        that.setData({
          request_fail: true,
        });
      }
    })
  },
  //滑到底部监听事件
  lower: function (e) {
    console.log(e);
    var that = this;
    if (number < 10 && !isLoading) {
      isLoading = true;
      that.setData({
        loadingHidden: false
      })
      wx.request({
        url: app.globalData.globalUrl + "list",
        data: {
          id: app.globalData.listId,
          page: ++number
        },
        success: function (res) {
          that.setData({
            arr_res: that.data.arr_res.concat(res.data.tngou),
            lodingInfo: "加载更多",
          });
          console.log(that.data.arr_res);
        },
        fail: function (error) {
          number--;
          console.log(error);
          that.setData({
            lodingInfo: "加载失败",
          })
        },
        complete: function () {
          isLoading = false;
          that.setData({
            loadingHidden: true,
          })
        }
      })
    }
  },

  //点击事件监听
  // tapItem: function(event) {
  //     app.globalData.contentId = event.target.id;
  //     console.log(app.globalData.contentId);
  //     for (var i = 0; i < this.data.arr_res.length; i++) {
  //         if (this.data.arr_res[i].id == event.target.id) {
  //             app.globalData.contentName = this.data.arr_res[i].name;
  //             break;
  //         }
  //     }
  //     console.log(app.globalData.contentName);
  //     // wx.navigateTo({
  //     //     url: "../../pages/content/content"
  //     // });
  // }
})
