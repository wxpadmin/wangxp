var Alert = require('../../components/toast.vue') // 引入vue模板
var Toast = {} // 定义插件对象
Toast.install = function (Vue, options) { // vue的install方法，用于定义vue插件

 let toastTpl = Vue.extend(Alert) // 创建vue构造器

 let $vm = new toastTpl() // 实例化vue实例
 // 此处使用$mount来手动开启编译。用$el来访问元素，并插入到body中
 let tpl = $vm.$mount().$el
 document.body.appendChild(tpl)

 Vue.prototype.$Toast = { // 在Vue的原型上添加实例方法，以全局调用
    show(message,time) { // 控制toast显示的方法
      if(message){
        $vm.switch(message,time)
      }
    }
 }
}
export default Toast;