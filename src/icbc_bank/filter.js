import Vue from 'vue'
import  moment from 'moment'

//减优惠券价格
Vue.filter("filter_price",(val) => {
  // console.log(val)
})
//代金券状态
Vue.filter("filter_coupon",(val) => {
  // console.log(val.end_time)

    let str = ""
    ,   date = moment().format('x')
    ,   start_time = moment(val.start_time).format('x')
    ,   end_time = moment(val.end_time).format('x')
    ,   differ = start_time - date;

    if(date > end_time && val.coupon_status == 1 && val.time_slot != 4){
        return "已过期"
    }

    if(val.coupon_status == 1  && differ > 0){
      str = "未到有效期"
    }else{
      switch(val.coupon_status){
        case 1 :
          str = "未使用" ;
        break;
        case 2 :
          str = "已使用" ;
        break;
        case 3 :
          str = "已过期" ;
        break ;
        case 4 :
          str = "使用中" ;
        break ;
        case 5 :
          str = "已发福袋" ;
        break ;
      }
    }

    return str ;
})
//满xx减
Vue.filter("filter_size",(val) => {
  let str = "" ;
  if(val == 0){
    str = "任意订单可用"
  }else{
    str = val+"元订单以上"
  }
  return str
})
Vue.filter("filter_time",(val) => {
  let str = ""
  ,   start = val.start_time.split(" ")[0]
  ,   start_s = start.split("-")
  ,   starts = val.start_time.split(" ")[1]
  ,   startA = starts.slice(0,starts.length-3)
  ,   end = val.end_time.split(" ")[0]
  ,   end_s = end.split("-")
  ,   ends = val.start_time.split(" ")[1]
  ,   endA = starts.slice(0,starts.length-3);
  switch(val.time_slot){
    case 1 :
      str = start_s[0]+"."+start_s[1]+"."+start_s[2]+" "+starts+"至"+end_s[0]+"."+end_s[1]+"."+end_s[2]+" "+ends ;
    break;
    case 2 :
      str = end_s[0]+"."+end_s[1]+"."+end_s[2]+" "+ends+"之前" ;
    break;
    case 4 :
      str = "永久有效" ;
    break;
  }
  return str;
})

//充值类型
Vue.filter("filter_type",(val) => {
  let str = ""
  switch (val){
    case 1:
      str = '现金支付类通用';
    break;
    case 2:
      str = '仅限流量直充使用';
    break;
    case 3:
      str = '仅限账户充值使用';
    break;
  }
  return str
})
//过滤商品有效期
Vue.filter('validityTime', function(data) {

  var start = moment(data['start_time']).format('YYYY-MM-DD HH:mm')
  var end = moment(data['end_time']).format('YYYY-MM-DD HH:mm')

  if(data['time_slot'] == 1){
      return  start+ " ~" + end
  }

  if(data['time_slot'] == 3){
      return "截止至" + end
  }

  if(data['time_slot'] == 4){
      return "永久有效"
  }
})
//卡券使用条件
Vue.filter('belong_type', function(value) {
  var switcher = {
      '6':'视频',
      '7':'商超',
      '8':'电影',
      '9':'音乐',
      '10':'游戏',
      '11':'餐饮',
      '12':'全场通用',
  }

  if(value != '12'){
    return '仅限'+ switcher[value] +'使用'
  }

  return switcher[value]
})
//过滤商品有效期
Vue.filter('coupon_rule', function(val) {

  if(val == -1){
     return "任意订单可用"
  }

  return  val + "元以上"

})
//福袋状态
Vue.filter('filter_bag', function(value) {
  let str = ""
  switch (value){
    case 0:
      str = '已使用';
    break;
    case 1:
      str = '已过期';
    break;
    case 2:
      str = '已发福袋';
    break;
  }
  return str
})
//过滤手机号
Vue.filter('filter_phone_num', function(value) {
    if(!value) return '';
    return value.replace(/(\d{3})(\d{4})(\d{4})/,'$1****$3')
})

//手机号四位加空格
Vue.filter('filter_phone_num_space', function(value) {
  if(!value) return '';
  return value.replace(/(\d{3})(\d{4})(\d{4})/,'$1 $2 $3')
})
//过滤流量包大小
Vue.filter('filter_pkg', function(value) {
    if(!value) return '';
    if(value<1024){
        return value+'M'
    }else{
        return parseInt(value/1024)+'G'
    }
})

//过滤流量包大小
Vue.filter('filter_userbalance', function(value) {
    if(!value) return '0MB';
    if(value<1024){
      return value+'MB'
    }else{
      return (value/1024).toFixed(2)+'GB'
    }
})

//过滤流量包大小
Vue.filter('filter_length_pkg', function(value) {
  if(!value) return '0M';
  if(value.length>6){
      return (value/1024).toFixed(2)+'G'
  }else{
      return value+'M'
  }
})

//过滤钱
Vue.filter('filter_money', function(value) {
    if(!value) return '0.00元';
    return parseFloat(value).toFixed(2)+'元';
})

//过滤钱2
Vue.filter('filter_money_icon', function(value) {
  if(!value) return '¥0.00';
  return '¥'+parseFloat(value).toFixed(2);
})

//过滤手机号
Vue.filter('filter_phone_number', function(value,value2) {
    if(!value) return '';

    let phone_number = value.replace(/ /ig,'');

    if (phone_number.length !== 11) {
        return '请输入有效的手机号码';
    }else{
        let myreg = /^((13[4-9])|(147)|(15[0-2,7-9])|(178)|(18[2-4,7-8]))+\d{8}$/
        let myreg1 = /^((13[0-2])|(145)|(15[5-6])|(17[5-6])|(18[5-6]))+\d{8}$/
        let myreg2 = /^((133)|(149)|(153)|(17[3,7])|(18[0-1,9]))+\d{8}$/
        let myreg3 = /^(17[0-1])+\d{8}$/
        if (!myreg.test(phone_number) && !myreg1.test(phone_number) && !myreg2.test(phone_number) && !myreg3.test(phone_number)) {
            return '请输入有效的手机号码';

        }else{
            return value2;
        }
    }
})

//支付状态
Vue.filter('filter_pay', function(obj) {
  let value = ''
  switch (obj.pay_status){
    case 0:
      value = '待支付';//未支付
      break;
    case 1:
      value = '支付成功';//支付成功
      switch (obj.recharge_status){
        case 0:
          value = '待充值';//待充值
          break;
        case 1:
          value = '充值中';//流量充值中
          break;
        case 2:
          value = '充值成功';//充值成功
          break;
        case 3:
          value = '充值失败';//充值失败
          break;
      }
      break;
    case 2:
      value = '支付失败';// 支付失败
      break;
    case 3:
      value = '已退还';// 已退还
      break;
    case 4:
      value = '交易关闭';// 交易关闭
      break;
  }
  return value
})

//支付状态（收支明细）
Vue.filter('filter_detaillist', function(obj) {
  if(obj.order_type != 0){
    return '';
  }
  let value = ''
  switch (obj.pay_status){
    case 0:
      value = '待支付';//未支付
      break;
    case 1:
      value = '支付成功';//支付成功
      switch (obj.recharge_status){
        case 0:
          value = '待充值';//待充值
          break;
        case 1:
          value = '充值中';//流量充值中
          break;
        case 2:
          value = '充值成功';//充值成功
          break;
        case 3:
          value = '充值失败';//充值失败
          break;
      }
      break;
    case 2:
      value = '支付失败';// 支付失败
      break;
    case 3:
      value = '已退还';// 已退还
      break;
    case 4:
      value = '交易关闭';// 交易关闭
      break;
  }
  return value
})

//过滤粮票使用时间
Vue.filter('filter_coupontime', function(obj) {
  if(obj.time_slot == 1){
    return obj.use_end_time
  }else{
    return moment().add({days:obj.interval_time}).format('YYYY-MM-DD HH:mm:ss')
  }
})

//过滤粮票状态样式
Vue.filter('filter_couponstatusstyle', function(obj) {
  if(obj.coupon_status == 1){// 未使用
    if(obj.coupon_type == 3){
      return 'price'
    }else{
      return 'minus'
    }
  }else if(obj.coupon_status == 2){// 已使用
    return 'used'
  }else if(obj.coupon_status == 3){// 已过期
   return 'expired'
  }
})
//过滤周几
Vue.filter('filter_week', function(time) {
  let obj = {
    0:'周日',
    1:'周一',
    2:'周二',
    3:'周三',
    4:'周四',
    5:'周五',
    6:'周六',
  }
  let day = moment(time).day();
  return obj[day]
})
//过滤时间格式
Vue.filter('filter_dateformat', function(time) {
  return  moment(time).format('MM-DD');
})

//过滤订单状态样式
Vue.filter('filter_orderstatus', function(obj) {
  let value
  switch (obj.pay_status){
    case 0:
      value = 'wait';//未支付
      break;
    case 1:
      value = 'paied';//支付成功
      switch (obj.recharge_status){
        case 0:
          value = 'wait';//待充值
          break;
        case 1:
          value = 'paying';//流量充值中
          break;
        case 2:
          value = 'succ';//充值成功
          break;
        case 3:
          value = 'fail';//充值失败
          break;
      }
      break;
    case 2:
      value = '';// 支付失败
      break;
    case 3:
      value = 'return';// 已退还
      break;
    case 4:
      value = 'closed';// 交易关闭
      break;
  }
  return value
})

//过滤订单状态样式
Vue.filter('filter_ordertext', function(obj) {
  let value
  switch (obj.pay_status){
    case 0:
      value = '未支付';//
      break;
    case 1:
      value = '支付成功';//
      switch (obj.recharge_status){
        case 0:
          value = '待充值';//
          break;
        case 1:
          value = '充值中';//
          break;
        case 2:
          value = '充值成功';//
          break;
        case 3:
          value = '充值失败';//
          break;
      }
      break;
    case 2:
      value = '';// 支付失败
      break;
    case 3:
      value = '已退还';//
      break;
    case 4:
      value = '交易关闭';//
      break;
  }
  return value
})

//过滤订单状态样式
Vue.filter('filter_ordertime', function(obj) {
  let value = []
  switch (obj.recharge_status){
    case 0:
      value = obj.order_create_time
      break;
    case 1:
      value = obj.receive_start_time
      break;
    case 2:
      value = obj.recharge_success_time
      break;
    case 3:
      value = obj.recharge_error_time
      break;
  }
  return value
})


//支付状态
Vue.filter('filter_pay_sec', function(obj) {
  let value = ''
  switch (obj.pay_status){
    case 0:
      value = '待支付';//未支付
      break;
    case 1:
      value = '支付成功';//支付成功
      break;
    case 2:
      value = '支付失败';// 支付失败
      break;
    case 3:
      value = '已退还';// 已退还
      break;
    case 4:
      value = '交易关闭';// 交易关闭
      break;
  }
  return value
})


//过滤real_name
Vue.filter('filter_real_name', function (obj) {
  if (!obj) {
    return '';
  }

  if (obj.real_name) {
    return obj.real_name
  } else {
    if(!obj.phone_number) return
    return obj.phone_number.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
  }

})

//过滤兆
Vue.filter('filter_M', function (val) {

    return Math.ceil(val)

})

Vue.filter('filter_status', function(obj) {
  let value = ''
  switch (obj.recharge_status){
  	case 0:
	  value = '';//
	  break;
    case 1:
	  value = '还款中';//待充值
	  break;
    case 2:
	  value = '还款成功';//充值成功
	  break;
    case 3:
	  value = '还款失败';//充值失败
	  break;
    }
  return value
})
//过滤时间显示年月日
Vue.filter("math_year",function(value){
	if(value){
		return moment(value).format('YYYY-MM-DD')
	}
})


//过滤优惠券类型
Vue.filter("filterCouponType",function(value){
    var switcher = {
        '1':'立减',
        '2':'立返',
        '3':'一口价'
    }

    return switcher[value]?switcher[value]:'未知'

})

//过滤商品有效期
Vue.filter('filterCouponScene', function(value) {
    var switcher = {
        '1':'任意订单可用',
        '2':'流量直充',
        '3':'账户充值'
    }
    return switcher[value]?switcher[value]:'未知'

})

//过滤优惠券有效期
Vue.filter('couponTime', function(data) {

      var start = moment(data['start_time']).format('YYYY-MM-DD HH:mm:ss')
      var end = moment(data['end_time']).format('YYYY-MM-DD HH:mm:ss')

      if(data['time_slot'] == 1){
          return '有效期：'+start+ "至" + end
      }

      if(data['time_slot'] == 2){
          return '截止到：'+ end + '之前'
      }

      if(data['time_slot'] == 4){
          return "有效期：永久有效"
      }
})


//过滤优惠券有效期
Vue.filter('toFixed2', function(value) {
      if(!value || Number(value) == NaN){
          return 0.00
      }
      return Number(value).toFixed(2)
})


Vue.filter('filter_coupon1',function (value) {
    switch (value) {
        case 1 :
            return '全场通用';
            break
        case 2 :
            return '流量直充';
            break
        case 3 :
            return '账户充值';
            break
        case 4 :
            return '爱享卡券使用的优惠券';
            break
    }
})
