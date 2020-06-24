const DB = wx.cloud.database().collection("food_video")
const DB_1 = wx.cloud.database().collection("zhushi")
const DB_2 = wx.cloud.database().collection("xiaochi")
const DB_3 = wx.cloud.database().collection("hongbei")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    isfocus:true,
    url:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.page==0) {
      DB.where({
        name:options.name,
        _id:options.id
      }).get({
        success:res=>{
          this.setData({
            dataList:res.data,
            url:res.data[0].video_a.li_list_video
          })
        }

      })
      this.setData({
        isfocus:false
      })
    } else if (options.page==1) {
      DB_1.where({
        name:options.name,
        _id:options.id
      }).get({
        success:res=>{
          this.setData({
            dataList:res.data
          })
        }
      })
    } else if (options.page==2) {
      DB_2.where({
        name:options.name,
        _id:options.id
      }).get({
        success:res=>{
          this.setData({
            dataList:res.data
          })
        }
      })
    } else{
      DB_3.where({
        name:options.name,
        _id:options.id
      }).get({
        success:res=>{
          this.setData({
            dataList:res.data
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