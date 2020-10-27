// pages/Appin/Appin.js
var time = require('../../utils/util');
Page({
  data: {
    showModal: false,
    shm:false
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      getid: options.getid,
    })
    var token = wx.getStorageSync('token');
    var getid = this.data.getid;
    /* console.log(getid) */
    var all = 'Bearer ' + token
    wx.request({
      method: "POST",
      url: 'https://huiyi.mb.cjsit.cn/api/order_first',
      data: {
        id: getid,
        stat: 2
      },
      header: {
        Authorization: all,
        Accept: 'application/json'
      },
      dataType: "json",
      success: function (res) {
    /*     console.log("请求成功", res.data) */
        var time1 = res.data.data.yue_kai_time
        var time2 = res.data.data.yue_guan_time
        var time3=res.data.data.c_time
        var timea = time.formatTimeTwo(time1, 'YMD h:m')
        var timeb = time.formatTimeTwo(time2, 'YMD h:m')
        var timec = time.formatTimeTwo(time3, 'YMD h:m')
        that.setData({
          /*  arraycontent: res.data */
          list:res.data,
          namea: res.data.data.name,
          order: timec,
          phone: res.data.data.phone,
          cm: res.data.data.gongshi_name,
          gn: res.data.data.good_name,
          kaitime: timea,
          guantime: timeb,
          dytime: res.data.data.yan_chang_time,
          zongtime: res.data.zhong_time,
          stat: res.data.stat
        })
      },
      fail: function (res) {
        console.log("请求失败", res)
      }
    })
  },
  share() {
    var list = JSON.stringify(this.data.list)
    wx.navigateTo({
      url: "../share/share?list=" + list
    })
  },
  delay(options) {
    this.setData({
      showModal: true
    })
    var that = this;
    console.log(this.data.dytime)
    var token = wx.getStorageSync('token');
    var getid = this.data.getid;
    /* console.log(getid) */
    var all = 'Bearer ' + token
    wx.request({
      method: "POST",
      url: 'https://huiyi.mb.cjsit.cn/api/is_yanchi',
      data: {
        id: getid
      },
      header: {
        Authorization: all,
        Accept: 'application/json'
      },
      dataType: "json",
      success: function (res) {
        console.log("请求成功", res.data)
        that.setData({
         delaymsg:res.data.meg

        })
      },
      fail: function (res) {
        console.log("请求失败", res)
      }
    })
  },
  cancel(options) {
    var that = this;
    this.setData({
      shm: true
    })
    var token = wx.getStorageSync('token');
    var getid = this.data.getid;
    /* console.log(getid) */
    var all = 'Bearer ' + token
    wx.request({
      method: "POST",
      url: 'https://huiyi.mb.cjsit.cn/api/is_quxiao',
      data: {
        id: getid
      },
      header: {
        Authorization: all,
        Accept: 'application/json'
      },
      dataType: "json",
      success: function (res) {
        console.log("请求成功", res.data)
        that.setData({
          cancelmsg:res.data.meg
        })
      },
      fail: function (res) {
        console.log("请求失败", res)
      }
    })
  },
  // 禁止屏幕滚动
  preventTouchMove: function () {},

  // 弹出层里面的弹窗
  ok1: function () {
    this.setData({
      showModal: false,
    })
  },
  ok2: function () {
    this.setData({
      shm:false
    })
    wx.navigateTo({
      url: '../SubscribeList/SubscribeList',
    })

  },
  ok3: function () {
    this.setData({
      shm:false
    })
    /* wx.navigateTo({
      url: '../SubscribeList/SubscribeList',
    })
 */
  },
 
})