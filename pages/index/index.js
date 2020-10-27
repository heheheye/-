Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
   banner:[],
goods:[],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 500
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
 
  onLoad(option) {
    
    var that = this;
    var token = wx.getStorageSync('token');
   /*  console.log("toke值"+token) */
    var all = 'Bearer ' + token
    wx.request({
      method: "POST",
      url: 'https://huiyi.mb.cjsit.cn/api/index',
      data: {},
      header: {
        Authorization: all,
        Accept: 'application/json'
      },
      dataType: "json",
      success: function (res) {
        console.log("请求成功", res.data)
        /* 数组轮播图 */
        var banner = res.data.banner
        /* 会议室详情 */
        var goods = res.data.goods
      /*   console.log(goods) */
        that.setData({
         banner:banner,
         goods:goods
        })
      },
      fail: function (res) {
        console.log("请求失败", res)
      }

    })
  },
  go(e) {
    var itemid = e.currentTarget.dataset.id
   /*  console.log(itemid) */
 
    wx.navigateTo({
      url: '../../pages/ConferenceRoomReservation/ConferenceRoomReservation?itemid='+itemid
    })
  },
})