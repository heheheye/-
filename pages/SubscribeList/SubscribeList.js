// pages/SubscribeList/SubscribeList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      name1: '',
      time1: '',
      time2: '',
      name2: '',
      time3: '',
      ob1: '',
      ob2: ''
    }, ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var token = wx.getStorageSync('token');
    var stat = wx.getStorageSync('stat');
    var all = 'Bearer ' + token
    wx.request({
      method: "POST",
      url: 'https://huiyi.mb.cjsit.cn/api/order_list',
      data: {
        stat: 2
      },
      header: {
        Authorization: all,
        Accept: 'application/json'
      },
      dataType: "json",
      success: function (res) {
        console.log("请求成功", res.data)
        that.setData({
          list:res.data   
        })
      },
      fail: function (res) {
        console.log("请求失败", res)
      }
    })

  },
  xx(e) {
    console.log(this.data.list)
    console.log(e)
    console.log(e.currentTarget.dataset.index)
    
  },
  go(e) {
    console.log(e)
   var getid=e.currentTarget.dataset.id
   console.log(getid)
    wx.navigateTo({
      url: '../Appin/Appin?getid='+getid
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})