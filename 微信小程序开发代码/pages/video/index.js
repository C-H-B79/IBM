const DB=wx.cloud.database().collection("videos")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    i:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    DB.skip(this.data.i).get({
      success:res=>{
        this.setData({
          dataList:res.data
        })

      }
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
    wx.showLoading({
      title: '加载中。。。',
      duration: 1000
    })
    let x=this.data.i+20
    DB.skip(x).get({
      success:res=>{
        this.setData({
          dataList:this.data.dataList.concat(res.data)
        })

      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})