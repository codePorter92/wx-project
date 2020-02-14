// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tab_list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabs:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(e){
      const params = e.currentTarget.dataset.index
      const tabs = this.data.tab_list
      tabs.forEach(v=>{
        v.id===params?v.isActive=true:v.isActive=false
      })
      this.setData({
        tabs
      })
      this.triggerEvent('tabChange',tabs)
    }
  }
})
