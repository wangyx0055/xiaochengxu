var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      info:'',
      id:'',
      show:true,
      apiKey:'',
      image: 'http://image.yiqixuan.com/',
      apiSecret:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
      var id=options.id;
      var apiKey = wx.getStorageSync(apiKey)
      var apiSecret = wx.getStorageSync(apiSecret)
      that.setData({
        id:id,
        apiKey: apiKey,
        apiSecret: apiSecret
      })
      wx.request({
        url: app.globalData.http +'/mpa/order/' + id,
        method:'GET',
        dataType:'json',
        header: {
          "Api-Key": that.data.apiKey,
          "Api-Secret": that.data.apiSecret,
          'Api-Ext': app.globalData.apiExt
        },
        success:function(data){
          that.setData({
            info:data.data
          })
        }
      })
  },
  /*关闭联系商家*/
  close:function(){
    this.setData({
      show: true
    })
  },
/*联系商家*/
  contacts:function(){

    this.setData({
      show:false
    })
  },
  /*查看物流*/
  checkLogistics: function () {
    var that=this;
    wx.navigateTo({
      url: '/pages/logistics/logistics?id=' + that.data.info.id
    })
  },
  /* 查询支付状态*/
  checkPay: function (id) {
    var that = this
    var t = 90;
    wx.showLoading({
      title: '加载中',
    })
    var time = setInterval(function () {
      t--
      if (t > 1) {
        wx.request({
          url: app.globalData.http + '/mpa/order/' + id + '/status',
          method: "get",
          dataType: 'json',
          header: {
            "Api-Key": that.data.apiKey,
            "Api-Secret": that.data.apiSecret,
            'Api-Ext': app.globalData.apiExt
          },
          success: function (data) {
            if (data.data.status == 205) {
              // console.log(666)             
              clearInterval(time)
              wx.hideLoading()
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 1000,
                complete: function () {
                  wx.navigateTo({
                    url: '/pages/orderDetail/orderDetail?id=' + id,
                  })
                }
              })

            }

          },
          fail: function () {
            wx.hideLoading()
            wx.showToast({
              title: '支付失败',
              icon: 'none',
              duration: 500
            }, function () {
              clearInterval(time)
              that.setData({
                disabled: false
              })
              wx.navigateTo({
                url: '/pages/orderDetail/orderDetail?id=' + id,
              })
            })

          }
        })
      } else {
        wx.hideLoading()
        wx.showToast({
          title: '网络错误',
          icon: 'none',
          duration: 500
        }, function () {
          clearInterval(time)
          that.setData({
            disabled: false
          })
          wx.navigateTo({
            url: '/pages/orderDetail/orderDetail?id=' + id,
          })
        })
      }
    }, 1000)
  },
  /*立即付款*/
  payMoney: function (event) {
    var id = event.target.dataset.orderid
    var no = event.target.dataset.no
    var that = this
    wx.request({
      url: app.globalData.http + '/mpa/payment/payment',
      method: "post",
      dataType: 'json',
      data: {
        'order_id': id
      },
      header: {
        "Api-Key": that.data.apiKey,
        "Api-Secret": that.data.apiSecret,
        'Api-Ext': app.globalData.apiExt
      },
      success: function (res) {
        var time = res.data.timeStamp
        time = time.toString()
        wx.requestPayment({
          'timeStamp': time,
          'nonceStr': no,
          'package': 'prepay_id=' + res.data.result.prepay_id,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
            that.checkPay(id)
          },
          'fail': function () {
            that.setData({
              disabled: false
            })
          }
        })
      },
      fail: function () {
        that.setData({
          disabled: false
        })
      }
    })

  },
  /*申请售后*/
  cancelOrder: function () {
    var that=this;
    wx.navigateTo({
      url: '/pages/afterSale/afterSale?id=' + that.data.id
    })
  },
  /*取消订单 确认收货 */
  confirm: function (event) {
    var that = this;
    var idx = event.target.dataset.sure;
    var tips;
    if (idx == 207) {
      tips = '确认要取消订单吗？'
    } else {
      tips = '确认已经收到货了吗'
    }
    wx.showModal({
      title: '温馨提示',
      content: tips,
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.http +'/mpa/order/' + id,
            data: {
              status: idx
            },
            header: {
              "Api-Key": that.data.apiKey,
              "Api-Secret": that.data.apiSecret,
              'Api-Ext': app.globalData.apiExt
            },
            method: 'PUT',
            dataType: 'json',
            success: function (data) {
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  callPhone:function(){
    this.setData({
      show:true
    })
    wx.makePhoneCall({
      phoneNumber: app.globalData.mobile
    })
  }
})