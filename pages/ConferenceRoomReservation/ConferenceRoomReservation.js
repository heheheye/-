var time = require('../../utils/util');
Page({
  onShareAppMessage() {
    return {
      title: 'tabs',
      path: 'page/weui/example/tabs/tabs'
    }
  },
  data: {
    activeTab: 0,
    good: [],
    arr1: [],
    time: [],
    dateArray: [],
    mathdata: null,
    concentone: [],
    showModal: false,
    clickday: "",
    psc: '',
    arr: [],
    arrb: []

  },
  handleClick(e) {
    var that = this
    /* 页面的下标页数 */
    /*   console.log(e) */
    var Pagesubscript = e.currentTarget.dataset.index
    /*  console.log("第" + Pagesubscript + "页") */
    that.setData({
      psc: Pagesubscript
    })
  },
  onLoad(options) {
    var that = this
    that.setData({
      itemid: options.itemid,
    })
    var times = Date.parse(new Date())/1000;
    console.log(times)
    this.setData({
      times:times
    })
   
    /* 后台数据获取 */
    var that = this;
    var token = wx.getStorageSync('token');
    var all = 'Bearer ' + token
    wx.request({
      url: 'https://huiyi.mb.cjsit.cn/api/xiangqing?id=1',
      method: 'GET',
      data: {
        id: this.data.itemid
      },
      header: {
        Authorization: all,
        Accept: 'application/json'
      },
      dataType: "json",
      success: function (res) {
        console.log("请求成功", res.data)
        /* 信息，日期，时间段 */
        var good = res.data.good
        var dateArray = res.data.dateArray
        var time = res.data.time
        console.log(time)
        /* 转为tab，{title}格式 */
        var arr1 = [{
          title: dateArray[0]
        }, {
          title: dateArray[1]
        }, {
          title: dateArray[2]
        }, {
          title: dateArray[3]
        }, {
          title: dateArray[4]
        }, {
          title: dateArray[5]
        }, {
          title: dateArray[6]
        }, ]

        that.setData({
          good: good,
          arr1: arr1,
          time: time,
          dateArray: dateArray,
          mathdata: JSON.stringify(time),
        })
      },
      fail: function (res) {
        console.log("请求失败", res)
      }
    })
  },
  /*-------------------日期切换---------------------  */
  onTabClick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
    return false
    this.data.dateArray.forEach((item, index) => {
      this.setData({
        index: index
      })
    })
    var that = this;
    var token = wx.getStorageSync('token');
    var all = 'Bearer ' + token
    wx.request({
      url: 'https://huiyi.mb.cjsit.cn/api/get_date',
      method: 'POST',
      data: {
        id: this.data.itemid,
        date: this.data.dateArray[index]
      },
      header: {
        Authorization: all,
        Accept: 'application/json'
      },
      dataType: "json",
      success: function (res) {
        console.log("日期点击请求", res.data)
        var newdata = res.data
        that.setData({
          time: newdata
        })
      }
    })
  },
  /* -------------------左右滑动------------------------- */
  onChange(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
    this.data.dateArray.forEach((item, index) => {
      this.setData({
        index: index
      })
    })
    var clickday = this.data.dateArray[index]
    this.setData({
      clickday: clickday
    })
    var that = this;
    var token = wx.getStorageSync('token');
    var all = 'Bearer ' + token
    wx.request({
      url: 'https://huiyi.mb.cjsit.cn/api/get_date',
      method: 'POST',
      data: {
        id: this.data.itemid,
        date: this.data.dateArray[index]
      },
      header: {
        Authorization: all,
        Accept: 'application/json'
      },
      dataType: "json",
      success: function (res) {
        console.log("左右滑动请求日期详情", res.data)
        var newdata = res.data
        that.setData({
          time: newdata
        })
      }
    })
  },
  /* ----------点击事件判断状态----------- */
  tapName(e) {
    var that = this;
    const index = e.detail.index
    var indextw = e.currentTarget.dataset.id
    var indexth = e.currentTarget.dataset.ids
    this.setData({
      ["time[" + indextw + "].data[" + indexth + "].stst"]: !this.data.time[indextw].data[indexth].stst,
      indextw: indextw,
      indexth: indexth
    })
    this.setData({
      list: this.data.arr.concat(this.data.time[indextw].data[indexth].id),
      /* 提示框显示时间 */
    })
    for (let i = 0; i < 1; i++) {
      this.data.arr.push(this.data.time[indextw].data[indexth].id)
      this.data.arrb.push(this.data.time[indextw].data[indexth].time)
      console.log(this.data.arrb)
      this.setData({
        clickdata: this.data.arr,
        /* 最后的显示时间 */
        arrmo: this.data.arrb
      })
    }

  },
  /* ------------弹出层--------------- */
  btn() {
    this.setData({
      showModal: true
    })
    var indextw = this.data.indextw
    var indexth = this.data.indexth
    /* 提示预订日期的时间段 */
    var arrmo = this.data.arrb
    this.setData({
      con:[arrmo[0].slice(0,6)]+'~'+[arrmo[arrmo.length-1].slice(7,13)]
    })
    var clickdata = this.data.clickdata
    var that = this;
    var token = wx.getStorageSync('token');
    var all = 'Bearer ' + token
    wx.request({
      url: 'https://huiyi.mb.cjsit.cn/api/yuding',
      method: 'POST',
      data: {
        id: this.data.itemid,
        date: this.data.dateArray[this.data.activeTab],
        data: clickdata
      },
      header: {
        Authorization: all,
        Accept: 'application/json'
      },
      dataType: "json",
      success: function (res) {
        console.log(res.data)
        console.log(res.data.meg)
        that.setData({
          meg: res.data.meg,
          stat: res.data.stat
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
  ok: function () {
    this.setData({
      showModal: false
    })

    wx.navigateTo({
      url: '../SubscribeList/SubscribeList',
    })
  },
  ok1: function () {
    this.setData({
      showModal: false
    })
  }
})