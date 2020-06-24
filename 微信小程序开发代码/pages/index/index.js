const DB = wx.cloud.database().collection("food_video")
const DB_1 = wx.cloud.database().collection("zhushi")
const DB_2 = wx.cloud.database().collection("xiaochi")
const DB_3 = wx.cloud.database().collection("hongbei")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currt:0,
    dataList:[],
    data_l:[],
    i:0
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    DB.get({
      success:res=>{
        for (let index = 0; index < 5; index++) {
          this.setData({
            data_l:this.data.data_l.concat(res.data[index])
          })
        }
        
      }
    })
    DB.skip(5).get({
      success:res=>{
        this.setData({
          dataList:res.data
        })
      }
    })
    
  },
  handleItemTap(e){
    const {index}=e.currentTarget.dataset
    this.setData({
      currt:index,
      dataList:[],
      i:0
    })
    if (index==1) {
      DB_1.skip(this.data.i).get({
        success:res=>{
          this.setData({
            dataList:res.data
          })
        }
      })
      
    } else if(index==2){
      DB_2.skip(this.data.i).get({
        success:res=>{
          this.setData({
            dataList:res.data
          })
        }
      })

    }else if (index==3) {
      DB_3.skip(this.data.i).get({
        success:res=>{
          this.setData({
            dataList:res.data
          })
        }
      })
    } else {
      DB.skip(5).get({
        success:res=>{
          this.setData({
            dataList:res.data
          })
        }
      })
      
    }
  },
  //返回顶端
  returnTop: function(){
    let x=0
    if (this.data.currt==0) {
      let x=5
      DB.skip(x).get({
        success:res=>{
          this.setData({
            dataList:res.data,
            i:x
          })
        }
      })
      
    }else if(this.data.currt==1){
      DB_1.skip(x).get({
        success:res=>{
          this.setData({
            dataList:res.data,
            i:x
          })
        }
      })
    }else if(this.data.currt==2){
      DB_2.skip(x).get({
        success:res=>{
          this.setData({
            dataList:res.data,
            i:x
          })
        }
      })

    }else{
      DB_3.skip(x).get({
        success:res=>{
          this.setData({
            dataList:res.data,
            i:x
          })
        }
      })
      
    }
    
    wx.pageScrollTo({
      scrollTop:0
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
    if (this.data.currt==0) {
      let x=this.data.i+25
    DB.skip(x).get({
      success:res=>{
        this.setData({
          dataList:this.data.dataList.concat(res.data),
          i:x
        })
      }
    })
      
    }else if(this.data.currt==1){
      let x=this.data.i+20
    DB_1.skip(x).get({
      success:res=>{
        this.setData({
          dataList:this.data.dataList.concat(res.data),
          i:x
        })
      }
    })

    }else if(this.data.currt==2) {
      let x=this.data.i+20
    DB_2.skip(x).get({
      success:res=>{
        this.setData({
          dataList:this.data.dataList.concat(res.data),
          i:x
        })
      }
    })
      
    }else {
    let x=this.data.i+20
    DB_3.skip(x).get({
      success:res=>{
        this.setData({
          dataList:this.data.dataList.concat(res.data),
          i:x
        })
      }
    })  
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})