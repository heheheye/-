Page({

  /**
   * 页面的初始数据
   */
  data: {
    on: true
 },
 //紧接着我们在onShow里边定义
 //这里我们不能定义到onLoad里，否则只能加载一次。
 onShow: function () {
    console.log('onShow')
    var that = this
    if (that.data.on) {
      var call = that.data.call
      wx.scanCode({
        success: (res) => {
          var id = res.result
          wx.redirectTo({
            url: '/pages/scanpay/scanpay?shopId=' + id,
          })
        },
        fail: (err) => {
          console.log(err, 'fail')
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this
    var on = that.data.on
    that.setData({
      on: !on
    })
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