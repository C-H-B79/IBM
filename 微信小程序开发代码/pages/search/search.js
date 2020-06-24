const DB=wx.cloud.database().collection("food_video")
const DB_1=wx.cloud.database().collection("zhushi")
const DB_2=wx.cloud.database().collection("xiaochi")
const DB_3=wx.cloud.database().collection("hongbei")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFocus:false,
    dataList:[],
    dataList_1:[],
    dataList_2:[],
    dataList_3:[],
    inpvalue:"",
    datal:[],
    datal_1:[],
    datal_2:[],
    datal_3:[]
  },
   //计时器
   TimeId:-1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    DB.get({
      success:res=>{
        for (let index = 0; index < 3; index++) {
            this.setData({
              datal:this.data.datal.concat(res.data[index])
        })
       }  
      }
    })
    DB_1.get({
      success:res=>{
        for (let index = 0; index < 3; index++) {
            this.setData({
              datal_1:this.data.datal_1.concat(res.data[index])
        })
       }  
      }
    })
    DB_2.get({
      success:res=>{
        for (let index = 0; index < 3; index++) {
            this.setData({
              datal_2:this.data.datal_2.concat(res.data[index])
        })
       }  
      }
    })
    DB_3.get({
      success:res=>{
        for (let index = 0; index < 3; index++) {
            this.setData({
              datal_3:this.data.datal_3.concat(res.data[index])
        })
       }  
      }
    })

  },
  handleInput(e){
    const {value}=e.detail;
    if (!value.trim()) {
      this.setData({
        dataList:[],
        dataList_1:[],
        dataList_2:[],
        dataList_3:[],
        isFocus:false
      })
      return;
    }
    this.setData({
      isFocus:true
    })
     //防抖 节流
    //清除计时器
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(()=>{
      this.gsearch(value)
    },500)

  },
  gsearch(query){
    DB.where({
      name:{
        $regex:'.*'+ query,
        //不分大小写
        $options: 'i'
      }
    }).get({
      success:res=>{
        this.setData({
          dataList:res.data,
          page:0
        })
      }
    })
    DB_1.where({
      name:{
        $regex:'.*'+ query,
        //不分大小写
        $options: 'i'
      }
    }).get({
      success:res=>{
        this.setData({
          dataList_1:res.data,
        })
      }
    })
    DB_2.where({
      name:{
        $regex:'.*'+ query,
        //不分大小写
        $options: 'i'
      }
    }).get({
      success:res=>{
        this.setData({
          dataList_2:res.data,
        })
      }
    })
    DB_3.where({
      name:{
        $regex:'.*'+ query,
        //不分大小写
        $options: 'i'
      }
    }).get({
      success:res=>{
        this.setData({
          dataList_3:res.data,
        })
      }
    })
    

  },
  handleCancle(){
    this.setData({
      inpvalue:"",
      dataList:[],
      dataList_1:[],
      dataList_2:[],
      dataList_3:[],
      isFocus:false
    })

  }
})

  