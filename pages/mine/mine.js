// pages/mine/mine.js
const app = getApp()
var openid = wx.getStorageSync("openid");
Page({
  data: {
    hasUserInfo: openid == "",
    nickname: ''
  },
  doAuthorization: function (e) {
    console.log(e)
    var that = this;
    /*   console.log("调用了 doAuthorization 授权"); */

    if (e.detail.userInfo == null) {
      console.log("用户拒绝授权");
    } else {
      //授权
      wx.login({
        success: function (res) {
          /*  console.log('login:code', res.code) */
          //发送请求
          wx.request({
            url: 'https://huiyi.mb.cjsit.cn/api/wxlogin', //接口地址
            method: 'POST',
            data: {
              code: res.code,
              nickname: e.detail.userInfo.nickName,
              gender: e.detail.userInfo.gender,
              avaturl: e.detail.userInfo.avatarUrl
            },
            success: function (res) {
              var res = res.data;
              console.log(res)
              /* console.log(res.userinfo.mobile) */
              /* console.log(res.userinfo.session_key) */
              wx.setStorageSync('token', res.userinfo.api_token)
              wx.setStorageSync('mobile', res.userinfo.mobile)
              that.setData({ //设置变量
                hasUserInfo: false,
                nickname: res.userinfo.nickname,
                portrait: res.userinfo.portrait,
                session_key: res.userinfo.session_key,
              });
            },
            fail: function (err) {
              console.log("record  失败", err);
            }
          })
        }
      })
    }
  },
 /*  getPhoneNumber(e) {
    var that = this;
     var token = wx.getStorageSync('token');
    var all = 'Bearer ' + token;
  
    var ency = e.detail.encryptedData;
    var iv = e.detail.iv;
    var sessionk = this.data.session_key;
    console.log(sessionk)
    wx.request({
      method: "POST",
      url: 'https://huiyi.mb.cjsit.cn/api/getphone',
      data: {
        session_key: sessionk,
        encryptedData: ency,
        iv: iv
      },
      header: {
        Authorization: all,
        Accept: 'application/json'
      },
      dataType: "json",
      success: function (res) {
        console.log("请求成功", res)
      },
      fail: function (res) {
        console.log("请求失败", res)
      }
    })

  }, */
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    var that = this
  },
  Dataperfection() {
    wx.navigateTo({
      url: '../Dataperfection/Dataperfection'
    })


  },
  SubscribeList() {
    wx.navigateTo({
      url: '../SubscribeList/SubscribeList'
    })
  },
  onLoad: function () {},


  onReady: function () {

  },


})