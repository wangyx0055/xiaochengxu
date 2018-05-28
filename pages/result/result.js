// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		produList: [{
			"imgurl": "/imgs/Rectangle 10@2x(1).png",
			"proName": "复古宽松甜美韩版泡泡袖卫衣潮流学院风",
			"price": "123.00",
			"saleNum": "23万",
			"prePrice": "￥233.00"
		}, {
			"imgurl": "/imgs/Rectangle 10@2x(1).png",
			"proName": "复古宽松甜美韩版泡泡袖卫衣潮流学院风",
			"price": "123.00",
			"saleNum": "23万",
			"prePrice": "￥233.00"
		}, {
			"imgurl": "/imgs/Rectangle 10@2x(1).png",
			"proName": "复古宽松甜美韩版泡泡袖卫衣潮流学院风",
			"price": "123.00",
			"saleNum": "23万",
			"prePrice": "￥233.00"
		}, {
			"imgurl": "/imgs/Rectangle 10@2x(1).png",
			"proName": "复古宽松甜美韩版泡泡袖卫衣潮流学院风",
			"price": "123.00",
			"saleNum": "23万",
			"prePrice": "￥233.00"
		}],
		//排序方式数组,控制排序方式类名
		rank:["normal","selected","normal"],
		//flag控制上下箭头类名
		flag: 0
  },
	//商品点击
	goDetail(e){
		wx.navigateTo({
			url: '/pages/detail/detail',
		})
	},
	//排序方式点击
	bindRank(e){
		console.log(e);
		//当前所点击排序方式
		var currIndex = e.currentTarget.dataset.id;
		var flag = this.data.flag;
		//判断价格排序方式
		if(currIndex == 2){
			if(flag == 0 || flag == 2){
				flag = 1
			}else if(flag == 1){
				flag = 2
			}
		}else{
			flag = 0
		}
		//遍历rank数组
		var newArr = this.data.rank.map(function(item,index,arr){
			arr[index] = "normal";
			return arr[index];
		})
		newArr[currIndex] = "selected";
		//存入data
		this.setData({
			rank:newArr,
			flag:flag
		})
		console.log(this.data.flag)
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.setNavigationBarTitle({
			title: '搜索',
		})
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