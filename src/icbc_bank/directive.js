/**
 * Created by mayi on 2017/7/8.
 */
import Vue from 'vue'
//返回指令
Vue.directive('goback', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
        // 聚焦元素
        el.onclick = function (){
            window.history.go(-1);
        }
    }
})
