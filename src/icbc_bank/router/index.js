import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 创建一个路由器实例
// 并且配置路由规则
import Index from '../views/index'
import DetailedList from '../views/detailedList'
import reCode from '../views/redeemcode'
import Paystatus from '../views/paystatus'
import Charge from '../views/charge'
import Drecharge from '../views/directRecharge'
import DrechargeList from '../views/directRechargeList'
import Confirmorder from '../views/confirmOrder'
import Buyflow from '../views/buyflow'
import BuyflowTest from '../views/buyflowTest'
import Confirmflow from '../views/confirmflow'
import Flowstatus from '../views/flowstatus'
//红包
import Redindex from '../views/redenvelopes/redindex'
import Redreceive from '../views/redenvelopes/redreceive'
import RedReceivelist from '../views/redenvelopes/redreceivelist'
import Redsendlist from '../views/redenvelopes/redsendlist'
import RedSdetails from '../views/redenvelopes/redsdetails'
import Redsend from '../views/redenvelopes/redsend'
import Redopen from '../views/redenvelopes/redopen'

//转盘
import DrawRecord from '../views/turntable/drawRecord.vue' //转盘记录
import Turntable from '../views/turntable/turntable.vue' //转盘页

//视频
import VMindex from '../views/videoMembers/menu.vue' //主页
import VMrecord from '../views/videoMembers/record.vue' //记录
import VMexchange from '../views/videoMembers/exchange.vue' //兑换页
import VMrecordList from '../views/videoMembers/recordList.vue' //记录列表
import VMsucc from '../views/videoMembers/succ.vue' //成功

//卡券列表
import CardList from '../views/videoMembers/cardList.vue'


//说明页面
import Instruction from '../views/index.vue'
// 用户说明细则
import UsageRules from '../views/usageRules.vue'

//说明页面
import Activity from '../views/activity.vue'

//说明页面
import Share from '../views/share.vue'

//微信绑定手机号码
import BindPhone from '../views/bindPhone.vue'

//测试支付
import Paytest from "../views/payTest.vue"

import aoteActive from "../views/aoteActive.vue"

//流量还信用卡
import credit from '../views/credit/credit.vue' //还款首页
import refundList from '../views/credit/refundList.vue' //还款首页
import restatus from '../views/credit/restatus.vue' //还款详情
import addCard from '../views/credit/addCard.vue' //添加信用卡
import goChage from '../views/credit/goChage.vue' //去还款
import statusSucc from '../views/credit/statusSucc.vue' //支付成功

//优惠券
import usecoupon from "../views/myCoupon/usecoupon.vue"//选择优惠券
import couponcard from "../views/myCoupon/couponcard.vue"//我的优惠券
import getsucc from "../views/myCoupon/getsucc.vue"//领取


//世界杯
import Worldcupindex from "../views/world_cup/worldcupindex.vue"
import Login from "../views/world_cup/login.vue"     //微信手机号登陆
import Signin from "../views/world_cup/signin.vue"   // 微信签到
import Activeinstructions from '../views/world_cup/activeinstructions.vue'   // 活动说明
import Teamlist from '../views/world_cup/teamlist.vue'   // 球队列表
import Openbox from "../views/world_cup/openbox.vue"   // 开宝箱活动
import Lotteryrecord from "../views/world_cup/lotteryrecord.vue"   // 抽奖记录
import Winningrecord from "../views/world_cup/winningrecord.vue"   // 中奖记录


VueRouter.prototype.goBack = function () {
  this.isBack = true;
  window.history.go(-1)
}
var ua = window.navigator.userAgent.toLowerCase();
var isWeiXin = ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false;

const route = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    {path: '/', redirect: '/index'},
    {
      name: 'index', path: '/index', component: Index
    },
    {
      name: 'paytest', path: '/paytest', component: Paytest
    },
    {
      name: 'aoteactive', path: '/aoteactive', component: aoteActive
    },
    {
      name: 'detailedList', path: '/detailedList', component: DetailedList
    },
    {
      name: 'redeemcode', path: '/redeemcode', component: reCode
    },
    {
      name: 'charge', path: '/charge', component: Charge
    },
    {
      name: 'directRecharge', path: '/directRecharge', component: Drecharge
    },
    {
      name: 'directRechargeList', path: '/directRechargeList', component: DrechargeList
    },
    {
      name: 'paystatus', path: '/paystatus', component: Paystatus
    },
    {
      name: 'redindex', path: '/redindex', component: Redindex
    },
    {
      name: 'redreceive', path: '/redreceive', component: Redreceive
    },
    {
      name: 'redreceivelist', path: '/redreceivelist', component: RedReceivelist
    },
    {
      name: 'redsendlist', path: '/redsendlist', component: Redsendlist
    },
    {
      name: 'redsdetails', path: '/redsdetails', component: RedSdetails
    },
    {
      name: 'redsend', path: '/redsend', component: Redsend
    },
    {
      name: 'redopen', path: '/redopen', component: Redopen
    },
    {
      name: 'confirmOrder', path: '/confirmOrder', component: Confirmorder
    },
    {
      name: 'buyflow', path: '/buyflow', component: Buyflow
    },
    {
      name: 'buyflowtest', path: '/buyflowtest', component: BuyflowTest
    },
    {
      name: 'confirmflow', path: '/confirmflow', component: Confirmflow
    },
    {
      name: 'flowstatus', path: '/flowstatus', component: Flowstatus
    },
    {
      name: 'drawRecord', path: '/drawRecord', component: DrawRecord
    },
    {
      name: 'turntable', path: '/turntable', component: Turntable
    },
    {
      name: 'VMindex', path: '/vmMenu', component: VMindex
    },
    {
      name: 'VMrecord', path: '/vmRecord', component: VMrecord
    },
    {
      name: 'VMexchange', path: '/vmExchange', component: VMexchange
    },
    {
      name: 'VMrecordList', path: '/vmRecordList', component: VMrecordList
    },
    {
      name: 'VMsucc', path: '/vmSucc', component: VMsucc
    },
    {
      name: 'cardList', path: '/cardList', component: CardList
    },
    {
      name:'instruction',path:'/instruction',component:Instruction
    },
    {
      name:'usageRules',path:'/usageRules',component:UsageRules
    },
    {
      name:'activity',path:'/activity',component:Activity
    },
    {
      name:'share',path:'/share',component:Share
    },
    {
      name:'bindphone',path:'/bindphone',component:BindPhone
    },
    {
      name:'credit',path:'/credit',component:credit
    },
    {
      name:'refundList',path:'/refundList',component:refundList
    },
    {
      name:'restatus',path:'/restatus',component:restatus
    },
    {
      name:'addCard',path:'/addCard',component:addCard
    },
    {
      name:'goChage',path:'/goChage',component:goChage
    },
    {
      name:'statusSucc',path:'/statusSucc',component:statusSucc
    },
    {
      name:'usecoupon',path:'/usecoupon',component:usecoupon
    },
    {
      name:'couponcard',path:'/couponcard',component:couponcard
    },
    {
      name:'getsucc',path:'/getsucc',component:getsucc
    },
      {
          name:'worldcupindex',path:'/worldcupindex',component:Worldcupindex
      },
      {
          name:'login',path:'/login',component:Login
      },
      {
          name:'signin',path:'/signin',component:Signin
      },
      {
          name:'activeinstructions',path:'/activeinstructions',component:Activeinstructions
      },
      {
          name:'teamlist',path:'/teamlist',component:Teamlist
      },
      {
          name:'openbox',path:'/openbox',component:Openbox
      },
      {
          name:'lotteryrecord',path:'/lotteryrecord',component:Lotteryrecord
      },
      {
          name:'winningrecord',path:'/winningrecord',component:Winningrecord
      },

  ]
})

route.beforeEach((to, from, next) => {
  if (isWeiXin && from.path == '/index' && to.path != '/redeemcode'  && to.path != '/login' && to.path != '/worldcupindex' && to.path != '/signin') {
    window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.icbc.elife';
  } else {
    next();
  }
});


export default route
