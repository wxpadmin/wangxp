import axios from 'axios'

let base = '/api/icbc';

// 获取首页菜单类型
export const getMenuType = params => {return axios.get(`/api/stable/cards/category/list`, { params: params }).then(res => res.data); };
// 获取卡券券码券密
export const getCouponNumPass = params => {return axios.get(`${base}/cards/card_info`, { params: params }).then(res => res.data); };
// 我的卡券支付状态
export const getCouponStatus = params => {return axios.get(`${base}/cards/card_status`, { params: params }).then(res => res.data); };
// 我的卡券列表
export const getCouponOrder = params => {return axios.get(`${base}/cards/card_order`, { params: params }).then(res => res.data); };
// 获取卡券详情
export const getCouponDetail = params => {return axios.get(`/api/stable/card/flow/order/item`, { params: params }).then(res => res.data); };
// 获取换卡券列表
export const getExchangeList = params => {return axios.get(`${base}/cards/order/exchange/list`, { params: params }).then(res => res.data); };
//获取我的优惠券
export const getCouponCardList = params => {return axios.get(`${base}/my/couponlist`, { params: params }).then(res => res.data); };
// 换卡券
export const exchangeCoupon = params => {return axios.post(`${base}/cards/order/exchange`, params).then(res => res.data); };
// 订单详情
export const getOrderDetail = params => {return axios.get(`${base}/cards/card_detail`, { params: params }).then(res => res.data); };
// 发送福袋选择卡券页面
export const getChooseCoupons = params => {return axios.get(`${base}/cards/blessingbag/choose_coupons`, { params: params }).then(res => res.data); };
// 购物车 获取列表
export const getCartList = params => { return axios.get(`${base}/cards/get/shopping/cart`, { params: params }).then(res => res.data);};
// 购物车 保存更改
export const postCartList = params => { return axios.post(`${base}/cards/set/shopping/cart`, params).then(res => res.data); };
// 购物车 下单
export const postCartOrder = params => { return axios.post(`${base}/cards/create/blessing/order`, params).then(res => res.data); };
//确认订单详情
export const postConfirmation= params => { return axios.post(`${base}/cards/order/confirmation`, params).then(res => res.data); };
//可用优惠券列表
export const postVailableCoupon= params => { return axios.post(`${base}/cards/order/realitymoney`, params).then(res => res.data); };
//查询订单金额
export const postFoodTicket = params => { return axios.post(`${base}/cards/food/ticket`, params).then(res => res.data); };
// 获取订单详情（晨）
export const getCardDetail = params => { return axios.get(`${base}/cards/get/categoryinfo/all`, { params: params }).then(res => res.data); };
// 发福袋 获取卡券列表
export const getMyCardsList = params => { return axios.get(`${base}/cards/find_my_cards`, { params: params }).then(res => res.data);};
// 点击领取券码
export const getCouponCode = params => { return axios.get(`${base}/cards/get/categoryinfo/cqorder`, { params: params }).then(res => res.data);};
//创建福袋
export const createBag = params => { return axios.post(`${base}/cards/blessingbag/create`, params).then(res => res.data);};

//获取发福袋用户信息
export const getSenduserInfo = params => { return axios.get(`${base}/cards/blessingbag/get`, { params: params }).then(res => res.data);};

//开福袋
export const receiveBag = params => { return axios.post(`${base}/cards/blessingbag/receive`, params).then(res => res.data);};

//获取开福袋详情
export const receiveBagResult = params => { return axios.get(`${base}/cards/bilessingbag/result`,  { params: params }).then(res => res.data);};


//热门推荐列表
export const getHotList = params => { return axios.get(`/api/stable/cards/cards/list`,  { params: params }).then(res => res.data);};

//热门推荐列表类型
export const getHotListType = params => { return axios.get(`/api/stable/cards/category/list`,  { params: params }).then(res => res.data);};


//已发送福袋列表
export const sendRecord = params => { return axios.get(`${base}/cards/bilessingbag/record`,  { params: params }).then(res => res.data);};


//已发送福袋详情
export const sendCardDetail = params => { return axios.get(`${base}/cards/bilessingbag/detail`,  { params: params }).then(res => res.data);};

//查询卡券详情
export const  getCardById= params => { return axios.get(`${base}/cards/get_card`,  { params: params }).then(res => res.data);};

//创建转赠
export const  givePack= params => { return axios.post(`${base}/cards/give/pack`, params).then(res => res.data);};

//获取转赠详情
export const  getGiveInfo= params => { return axios.get(`${base}/cards/give/get`, { params: params }).then(res => res.data);};

//获取转赠详情
export const  receiveGive= params => { return axios.post(`${base}/cards/give/receive`, params ).then(res => res.data);};

//获取转赠详情
export const  getGiveResult= params => { return axios.get(`${base}/cards/give/result`, { params: params }).then(res => res.data);};

//支付订单详情
export const payDetail = params => { return axios.get(`${base}/cards/card_detail`,  { params: params }).then(res => res.data);};

//再支付订单详情
export const againPay = params => { return axios.get(`${base}/cards/again/pay`,  { params: params }).then(res => res.data);};

//判断福袋是否领取过
export const isReceiveBag = params => { return axios.get(`${base}/cards/bilessingbag/isreceive`,  { params: params }).then(res => res.data);};

//判断转赠是否领取过
export const isReceiveGive = params => { return axios.get(`${base}/cards/give/isreceive`,  { params: params }).then(res => res.data);};
//类型列表页面
export const getTypeList = params => { return axios.get(`/api/stable/cards/cards/list`,  { params: params }).then(res => res.data);};

//类型列表页面选项
export const getTypeListOption = params => { return axios.get(`/api/stable/cards/category/list`,  { params: params }).then(res => res.data);};

//获取省份列表
export const getProvinceList = params => { return axios.get(`/api/area/find_area_province`,  { params: params }).then(res => res.data);};

//获取城市列表
export const getCityList = params => { return axios.get(`/api/area/find_area_city`,  { params: params }).then(res => res.data);};

//通过经纬度获取城市信息
export const getCityInfo = params => { return axios.get(`/api/location`,  { params: params }).then(res => res.data);};

//80万红包获取可购买次数
export const getPurchasedCount = params => {return axios.get(`${base}/cards/activity/purchasedcount`, { params: params }).then(res => res.data);};

//80万红包列表拉取接口
export const getMillionList = params => {return axios.get(`/api/stable/cards/cards/list`, { params: params }).then(res => res.data);};

//80万卡券详情
export const getMillionInfo = params => { return axios.get(`${base}/cards/activity/list`,  { params: params }).then(res => res.data);};

//80万卡券购买
export const  millionBuy= params => { return axios.post(`${base}/cards/create/activity/order`, params ).then(res => res.data);};

//改版后获取卡券详情
export const  getCardDetailNew= params => { return axios.get(`/api/stable/cards/cards/item`, { params: params } ).then(res => res.data);};

