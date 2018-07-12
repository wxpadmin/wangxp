<template>
    <!--单选项弹窗-->
    <div class="popUpSingle" v-if="showPopUp" @click="popUpShow" @touchmove.prevent>
        <div class="header" @click.stop>
            <div class="title">{{title1}}</div>
            <div class="contentstyle">
                <p class="content">{{content1}}</p>
                <slot name="header">

                </slot>
                <slot name="footer">

                </slot>
            </div>
            <div class="btn">
                <div class="sure" @click="sureBtn">{{sureText1}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props : ['showpopupsingle','title1','content1','sureText1'],
        data () {
            return {
                showPopUp : this.showpopupsingle,
            }
        },
        methods : {
            popUpShow (){
                this.$emit('popup-show-single')
            },
            sureBtn () {
                this.$emit('sure-btn-single')
            }
        },
        watch : {
            showpopupsingle (val) {
                this.showPopUp = val
            }
        }
    }
</script>
<style lang="scss" scoped>
    .popUpSingle{
        width: 100%;
        height:100%;
        background-color: rgba(0,0,0,0.5);
        position: fixed;
        top:0;
        left: 0;
        z-index: 1000;
        .header{
            width: 5.8rem;
            height:3.4rem;
            background: #FFFFFF;
            border-radius: 8px;
            margin:0 auto;
            margin-top: 2.47rem;
            position: relative;
            z-index:100;
            .title{
                width: 100%;
                text-align: center;
                line-height:.3rem;
                font-size: .38rem;
                color: #E42F46;
                letter-spacing: 0;
                padding-top: 0.39rem;
            }
            .contentstyle{
                width: 100%;
                height:1.8rem;
                display: flex;
                flex-direction : column;
                justify-content: center;
                .content{
                    width: 100%;
                    text-align: center;
                    font-size: .28rem;
                    color: #333333;
                    letter-spacing: 0;
                    line-height: .3rem;
                }
            }
            /*.content{
                width: 100%;
                text-align: center;
                margin-top: .78rem;
                font-size: .28rem;
                color: #333333;
                letter-spacing: 0;
                line-height: .3rem;
            }*/
        }
        .btn{
            width: 100%;
            height:.9rem;
            display: flex;
            justify-content: center;
            position: absolute;
            bottom: 0;
            border-top: 1px solid #eee;
            div{
                width: 100%;
                text-align: center;
                line-height: .9rem;
                font-size: .3rem;
                letter-spacing: 0;
                line-height: .9rem;
            }
            .sure{
                border-left: 1px solid #EEEEEE;
                color: #E42F46;
            }
        }
    }
</style>
