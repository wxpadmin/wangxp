import Vue from 'vue'
import  moment from 'moment'
Vue.filter('card_status', function(value) {
    if(!value) return '';
    switch (value) {
        case 0 :
            return '未领取';
            break
        case 2 :
            return '已过期';
            break
        case 3 :
            return '福袋中';
            break
        case 4 :
            return '转赠中';  //转赠中
            break;
        case 5 :
            return '已获取';  //转赠中
            break;
        case 6 :
            return '获取中';  // 卡密获取中/刮码中
            break;
        case 7 :
            return '已发福袋';
            break
        case 8 :
            return '已转赠';
            break
    }
    return '未知状态'
})



//过滤时间格式
Vue.filter('filter_dateformat', function(time) {
    return  moment(time).format('YYYY-MM-DD');
})
