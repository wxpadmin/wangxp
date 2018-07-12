<template>
    <!--双选项弹窗-->
    <div class="popUpSingle" v-if="Showpopup" @click="popUpShow" @touchmove.prevent>
        <div class="header" @click.stop>
            <div class="title">{{title}}</div>
            <div class="contentstyle">
                <p class="content">{{content}}</p>
                <slot>

                </slot>
            </div>
            <div class="btn">
                <div class="close" @click="closeBtn">{{closeText}}</div>
                <div class="sure" @click="sureBtn">{{sureText}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props : ['showpopup','title','content','closeText','sureText'],
        data () {
            return {
                Showpopup : this.showpopup,
            }
        },
        methods : {
            popUpShow (){
                this.$emit('popup-show')
            },
            closeBtn () {
                this.$emit('close-btn')
            },
            sureBtn () {
                this.$emit('sure-btn')
            }
        },
        watch : {
            showpopup (val) {
                this.Showpopup = val
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
                width: 50%;
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
            .close{
                color: #BBBBBB;
            }
        }
    }
</style>
