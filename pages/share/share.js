var time = require('../../utils/util');
Page({
  data: {
   list:[]
  },
  onLoad: function (options) {
    var that = this
    var list = JSON.parse(options.list)
    console.log(list)
    var time1 = list.data.yue_kai_time
    var time2 = list.data.yue_guan_time
    var time3=list.data.c_time
    var timea = time.formatTimeTwo(time1, 'YMD h:m')
    var timeb = time.formatTimeTwo(time2, 'YMD h:m')
    var timec = time.formatTimeTwo(time3, 'YMD h:m')
    that.setData({
         gm:list.data.good_name,
         kaitime: timea,
         guantime: timeb,
         order: timec,
         namea: list.data.name,
         stat: list.stat
      }),
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      })
     
  }

})