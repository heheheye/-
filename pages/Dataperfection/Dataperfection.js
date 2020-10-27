// pages/Dataperfection/Dataperfection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    namea: '',
    com: '',
    dan: '',
    showModal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var token = wx.getStorageSync('token');
    var all = 'Bearer ' + token
    wx.request({
      method: "POST",
      url: 'https://huiyi.mb.cjsit.cn/api/getuser',
      data: {},
      header: {
        Authorization: all,
        Accept: 'application/json'
      },
      dataType: "json",
      success: function (res) {
        console.log("请求成功", res.data)
        that.setData({
          name: res.data.name,
          phone: res.data.phone,
          gongshi_name: res.data.gongshi_name,
          danyuan: res.data.danyuan
        })
      },
      fail: function (res) {
        console.log("请求失败", res)
      }
    })
  },
  formSubmit(e) {
    this.setData({
      showModal: true
    })
    var that=this;
    console.log('提交数据：', e.detail.value)
    this.setData({
      namea: e.detail.value.姓名,
      com: e.detail.value.公司,
      dan: e.detail.value.单元号
    })
    that.save(e)

  },

  save(e) {
    var that = this;
    var token = wx.getStorageSync('token');
    var all = 'Bearer ' + token
    wx.request({
      method: "POST",
      url: 'https://huiyi.mb.cjsit.cn/api/user_updata',
      data: {
        name: this.data.namea,
        gongshi_name: this.data.com,
        danyuan: this.data.dan
      },
      header: {
        Authorization: all,
        Accept: 'application/json'
      },
      dataType: "json",
      success: function (res) {
        console.log("请求成功", res.data)
         that.setData({
           savemsg:res.data.meg
         })
      },
      fail: function (res) {
        console.log("请求失败", res)
      }
    })
  },

  onReachBottom: function () {

  },
  onShareAppMessage: function () {
  },
   // 禁止屏幕滚动
   preventTouchMove: function () {},

   // 弹出层里面的弹窗
   ok: function () {
     this.setData({
       showModal: false,
     })
   },
})