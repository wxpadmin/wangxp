<template>
    <div id = "wrap_box">
        <heading :name="name"></heading>
        <!--购买流量-->
        <div class="extractModule" v-show="iscanuse">
        	<div class="head_top">
        		<p v-for="item,index in lists" :class="{bor_bottom:num == index}" @click="cheage(index)">{{item}}</p>
        	</div>
            <div class="myflow">
                您当前流量账户余额：{{score}}M
            </div>
            <div class="selectBox">
                <!--静态流量包-->
                <ul class="clearfix">
                    <li v-for="(item,_index) in list_static[num]" :class="{'active':_index==index}" @click="Choice(_index)">
                        <div v-if = "item.icon" class="active-icon"  :class="{'active-icon-yellow':_index==index}"></div>
                        <div class="flow">{{item.package}}M</div>
                        <p class="prize">{{item.price}}</p>
                         <!--|filter_money-->
                    </li>
                </ul>
            </div>
            <div class="btn_box" v-if="num == 1">
                <a href="javascript:;" class="charge" @click="buy">确定</a>
            </div>
            <div class="btn_box" v-if="num == 0">
                <a href="javascript:;" class="charge" @click="integral">积分兑换</a>
            </div>
            <div class="tipBox">
                流量说明： <br>
                <p>1、流量购买（或积分兑换）成功后，直接存入您的流量账户，系统会自动更新流量账户余额；</p>
                <p>2、购买（或积分兑换）成功后，相关记录可在收支明细内查看；</p>
                <p>3、购买（或积分兑换）的流量可用于手机流量充值、兑换各种卡券、给好友发流量红包等，享有多种权益；</p>
                <p>4、平台目前暂不支持流量退货，请确认后再进行操作。</p>
            </div>
        </div>
        <!--探框-->
		<!--<div class="shade" v-show="shade_show">
			<div class="shade_conter">
				<h2>温馨提示</h2>
				<p>您当前使用的默认卡内积分不足，您可尝试更还默认卡或使用“现金+积分”的形式购买。</p>
				<div id="">
					<span id="" style="border-right: 0.01rem solid #EFEFEF;" @click="shade_show = false">取消</span>
					<span id="" style="color: rgb(228,47,70);" @click="go_buy()">现金购买</span>
				</div>
			</div>

		</div>-->
        <router-link class="sufficient" :to="{ path: '/directRechargeList',query:{order_type:3}}" tag = "div">账户充值记录</router-link>
        <loading v-show="loading"></loading>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../assets/css/common";
    .sufficient{
        width:100%;
        text-align:center;
        color: #e42f46;
        font-size:0.28rem;
        position: fixed;
        bottom:0.2rem;
    }
    .col-money-red {
        color: $color-red;
    }
    #wrap_box{
        width:100%;
        height:auto;
    }
    /*弹框*/
   .shade{
	   width: 100%;
	   height: 100%;
	   position: fixed;
	   top: 0;
	   background: rgba(0,0,0,0.4);
	   .shade_conter{
		   	width: 5.4rem;
		   	height: 3.4rem;
		   	background: #FFFFFF;
		   	position: absolute;
		   	top: 0;
		   	bottom: 0;
		   	right: 0;
		   	left: 0;
		   	margin: auto;
		   	h2{
		   		font-weight:normal ;
		   		font-size: 0.32rem;
		   		color: rgb(51,51,51);
		   		text-align: center;
		   		padding-top: 0.3rem;
		   		padding-bottom: 0.5rem;
		   	}
		   	p{
		   		font-size: 0.26rem;
		   		color: rgb(51,51,51);
		   		margin: 0 0.3rem 0 0.57rem;
		   		text-indent:0.5rem;
		   	}
		   	div{
		   		font-size:0.3rem;
		   		width: 100%;
		   		height: 0.76rem;
		   		position: absolute;
		   		bottom: 0;
/*		   		text-align: center;*/
				border-top: 0.01rem solid #EFEFEF;
		   		span{
		   			width: 49.9%;
		   			text-align: center;
		   			display: inline;
		   			float: left;
		   			line-height: 0.76rem;
		   		}
		   	}

		   }
   }
    /*头部点击部分*/
   .head_top{
   	width: 100%;
   	height: 0.76rem;
   	background: #FFFFFF;
   	display: flex;
   	align-items: center;
   	justify-content: space-around;
   	p{
   		float: left;
   		font-size: 0.28rem;
   		width: 30%;
   		text-align: center;
   		line-height: 0.76rem;
   		margin: auto;
   	}
   }
   .bor_bottom{
   	border-bottom: 0.04rem solid rgb(228,47,70);
   	color: rgb(228,47,70);
   }
    .extractModule {
        overflow: hidden;
        height: 100%;
        .myflow {
            width: 100%;
            padding-top: 0.5rem;
            padding-left: 0.3rem;
            color: $color-font;
            font-size: 0.3rem;
            text-align: left;
        }
        .selectBox {
            width: 100%;
            padding-top: 0.5rem;
            ul {
                width: 7rem;
                margin: 0 auto;
                li {
                    width: 3.2rem;
                    height: 1.5rem;
                    border-radius: 4px;
                    float: left;
                    text-align: center;
                    position: relative;
                    border:2px solid $color-red;
                    color: $color-red;
                    margin-bottom: 0.3rem;
                    .flow {
                        font-size: 0.4rem;
                        line-height: 1rem;
                    }
                    .prize{
                        font-size: 0.3rem;
                        line-height: 0.1rem;
                    }
                    &.active{
                        border:2px solid $color-red;
                        color:$color-white;
                        background-color: $color-red;
                    }
                }
                li:nth-child(odd){
                    margin-right: 0.3rem;
                }
            }

        }
        .btn_box{
            width: 100%;
            margin-top:0.4rem;
            padding-bottom: 0.4rem;
            .charge{
                width: 6.9rem;
                height: 0.88rem;
                line-height: 0.88rem;
                margin: 0.3rem auto 0;
                border-radius: 3px;
                background-color: $color-red;
                color: $color-white;
                text-align: center;
                display: block;
                font-size: 0.36rem;
            }
        }
        .tipBox {
            width: 6.9rem;
            height:5rem;
            margin: 0 auto;
            font-size: 0.28rem;
            color: $color-font-sec;
            line-height: 0.52rem;
            p{

            }
        }
        .active-icon{
            background: url('../assets/images/red-icon.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            height:.4rem;
            width: 1rem;
            position: absolute;
            right:0;
            float: right;
        }
        .active-icon-yellow{
            background: url('../assets/images/red-icon-active.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
    }



</style>
<script>
  import loading from '../components/loading'
  import heading from '../components/heading.vue'
  import {InfiniteScroll, Spinner, Toast} from 'mint-ui';
  import '../assets/js/jquery-2.1.1.min.js'
  export default {
    mounted () {
       this.score = this.$route.query.score
        if (this.$route.query.isbanner){
            this.num = 1
            this.package_size = '50'
        }
       if(this.$route.query.phone_number){
          this.phone_number = this.$route.query.phone_number.replace(/(\d{3})(\d{4})(\d{4})/,'$1 $2 $3')
       }else{
          this.phone_number = localStorage.getItem('phone_number').replace(/(\d{3})(\d{4})(\d{4})/,'$1 $2 $3')
       }
    },
    data () {
      return {
        loading:false,
        name:'账户充值',
        phone_number:'', //手机号码,
        score:'',
        list_static: {
            0:[{package:'1',price:'值100积分',money:'100'},
	           {package:'5',price:'值500积分',money:'500'},
	           {package:'10',price:'值1000积分',money:'1000'},
               {package:'15',price:'值1500积分',money:'1500'},
               {package:'20',price:'值2000积分',money:'2000'},
	           {package:'30',price:'值3000积分',money:'3000'}
	        ],
            1:[{package:'50',price:'值5.00元',money:'5'},
	           {package:'80',price:'值8.00元',money:'8'},
	           {package:'100',price:'值10.00元',money:'10'},
               {package:'300',price:'值30.00元',money:'30'},
               {package:'500',price:'值50.00元',money:'50',icon:true},
	           {package:'1000',price:'值100.00元',money:'100',icon:true}
	        ]
        	// 0:[{package:'20',price:'值1000积分',money:'1000'},
	        //    {package:'50',price:'值2500积分',money:'2500'},
	        //    {package:'100',price:'值5000积分',money:'5000'},
	        //    {package:'500',price:'值25000积分',money:'25000'}
	        // ],
            // 1:[{package:'20',price:'值2元',money:'2'},
	        //    {package:'50',price:'值5元',money:'5'},
	        //    {package:'100',price:'值10元',money:'10'},
	        //    {package:'500',price:'值50元',money:'50'}
	        // ]
        },
        money:'5',
        package_size:'1',
        index: 0,
        iscanuse:true, //手机充值
        isSucc:false, //提交成功
        lists:['积分兑换','现金购买'],
        num:0,
        shade_show:false,
        loading:false
      }
    },
    methods: {
    	cheage(i){
            this.num = i,
    		this.index = 0
    		i==1?this.money = '5':this.money = '100'
            this.package_size = this.list_static[this.num][0].package
    	},
        Choice(i) {
            this.index = i
            this.money = this.list_static[this.num][i].money
            this.package_size = this.list_static[this.num][i].package
        },
        buy (){
            	this.$router.push({ path: 'confirmflow', query: {
	                package_size: this.package_size,
	                money:this.money
            	}})
        },
        integral(){
        	if (!this.shade_show) {
        		this.shade_show = true
        		this.loading = true
//          	this.shade_show = true
				let _this = this
				this.$http.post('/api/icbc/buy/score/extract/flow',{
						package_size: this.package_size
				})
				.then(function(res){
					if(res.data.status == 2){
						_this.loading = false
	                    let param = []
	                    for(let i in res.data.data.data.data){
	                        param.push({name:i,value:res.data.data.data.data[i]})
	                    }
	                    _this.Post(res.data.data.data.post_url,param)
	                }else{
	                	this.shade_show = false
	                }
				})
				.catch((err)=>{
					this.shade_show = false
					_this.loading = false
					_this.$Toast.show('网络异常')
				})
        	}
        },
        Post(URL, PARAMTERS) {
            //创建form表单
            var temp_form = document.createElement("form");
            temp_form.action = URL;
            //如需打开新窗口，form的target属性要设置为'_blank'
            temp_form.target = "_self";
            temp_form.method = "post";
            temp_form.style.display = "none";
            //添加参数
            for (var item in PARAMTERS) {
                var opt = document.createElement("textarea");
                opt.name = PARAMTERS[item].name;
                opt.value = PARAMTERS[item].value;
                temp_form.appendChild(opt);
            }
            document.body.appendChild(temp_form);
            //提交数据
            temp_form.submit();
        },
//      go_buy(){
//      	if (this.money == 1000) {
//      		this.money = 2
//      	}else if (this.money == 2500) {
//      		this.money = 5
//      	}else if (this.money == 5000) {
//      		this.money = 10
//      	}else if (this.money == 25000) {
//      		this.money = 50
//      	}
//      	this.$router.push({ path: 'confirmflow', query: {
//	            package_size: this.package_size,
//	            money:this.money
//          }})
//      }
      },
    components:{
        loading,
        heading
    }
  }
</script>

