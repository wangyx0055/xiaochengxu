//index.js
//获取应用实例
const app=getApp();
Page({
  data: {
		//分类
    image: 'http://image.yiqixuan.com/',
		categoryList:[],
		//店铺描述信息
		description: {},
    indicatorDots: false,
    newCate:'',
    touch: true,
    duration: 500,
    current:0,
		//推荐商品
		//不参与遍历的第一件推荐商品
		recommend_first:'',
    recommend:'',
		recommend_goods:'',
		//特价商品
		special_goods:'',
    special:''
  },
  onLoad: function () {
    let that = this;

    // wx.getExtConfig({
    //   success:function(res){
    //     console.log(res)
    //     var i = res.extConfig.merchant_id.toString()
    //     wx.showToast({
    //       title: i,
    //       icon: 'success',
    //       duration: 210000
    //     })
    //   }
    // })    
    //获取店家描述数据
    wx.request({
      url: app.globalData.http + '/mpa/index',
      method: 'GET',
      success(res) {
        app.globalData.mobile = res.data.customer_service_mobile
        that.setData({
          description: res.data
        }, function () {
          //异步成功之后设置title
          wx.setNavigationBarTitle({
            title: that.data.description.name,
          })
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
    //获取一级分类信息列表
    wx.request({
      url: app.globalData.http + '/mpa/category',
      success(res) {
        var newCate = res.data
        var newCates=[]
        var n = parseInt(newCate.length / 6)
        var m = newCate.length%6
        var newArr=[]
        for (var i = 0; i <6*n;i=i+6){
          newArr= newCate.slice(i,i+6)
          newCates.push(newArr)
        }
        newArr= newCate.slice(6 * n, newCate.length )
        newCates.push(newArr)
        that.setData({
          categoryList: res.data,
          newCate: newCates
        })
      },
      fail:function(res){
          console.log(res)
      }
    })
    //获取推荐商品列表
    wx.request({
      url: app.globalData.http + '/mpa/goods/recommend?page=0&order_by=created_at desc&pre_page=7',
      method: 'GET',
      success(res) {
        if (res.data) {
          //截取第一件商品
          let firstGood = res.data.splice(0, 1);
          that.setData({
            recommend_first: firstGood,
            recommend_goods: res.data
          })
        }

      },
      fail: function (res) {
        console.log(res)
      }
    })
    //获取特价商品列表
    wx.request({
      url: app.globalData.http + '/mpa/goods/special?page=0&order_by=price desc&pre_page=6',
      method: 'GET',
      success(res) {
        if (res.data) {
          that.setData({
            special_goods: res.data,
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  changeCurrent:function(e){
    this.setData({
      current: e.detail.current
    })
  },
	//跳转商品详情页
	bindDetail(e){
		wx.navigateTo({
			url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id + "&name=" + e.currentTarget.dataset.name,
		})
	},
	contactPhone(){
		var phoneNumber = this.data.description.customer_service_mobile;
    app.globalData.mobile = phoneNumber
		wx.makePhoneCall({
			phoneNumber: phoneNumber,
		})
	},
	switchCate(e){
		//当前点击索引,保存到globalData
    var idx = e.currentTarget.dataset.idx;
		var index = e.currentTarget.dataset.index;
		app.globalData.classIdx = parseInt(idx)*6+parseInt(index);
		wx.switchTab({
      url: '/pages/category/category',
		})
	},
	//查看更多点击事件
	showMore(e){
		var path = e.target.dataset.type;
		wx.navigateTo({
			url: '/pages/'+path+"/"+path,
		})
	}
})
