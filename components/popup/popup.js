Component({
  // 组件的内部数据，和 properties 一同用于组件的模板渲染
  data : {
  },


  options: {
  },


  // 组件的对外属性，是属性名到属性设置的映射表，属性设置中可包含三个字段， type 表示属性类型、 value 表示属性初始值、 observer 表示属性值被更改时的响应函数
  properties: {
      popshow : {
        type : Boolean
      },
      sure : {
        type: String, 
        value: '确定',
      }
   },


  // 组件的方法，包括事件响应函数和任意的自定义方法
  methods: {
    Sure : function () {
      this.setData({
        popshow  : false
      })
    },


    Cancel: function () {
      this.setData({
        popshow: false
      })
    }
   }

})