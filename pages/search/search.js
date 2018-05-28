// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey:'搜索品牌或商品',
		suggest:["白T恤","白鞋"]
  },
	//input事件
	searchKey(e){
		console.log(e.detail.value)
	},
	//处理点击完成按钮函数
	confirmEvent:(e)=>{
		console.log(e.detail.value)
		wx.navigateTo({
			url: '/pages/result/result',
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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