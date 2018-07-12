<template>
    <div>
        <div class="title">
            <div class="go-back" @click.stop = "goBack">
                <i></i>
            </div>
            <p class="tit-name">{{name}}</p>
            <!--<div class="showTool-Bar">-->
                <!--<i></i>-->
            <!--</div>-->
        </div>
    </div>
</template>
<script>
  export default {
    props: ['name','path'],
    methods:{
        goBack(){
            if(this.path){
                window.location.href = this.path
            }else{
                window.history.go(-1)
            }
        }

    }

  }

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../assets/css/common";
    .title{
        width: 100%;
        height:0.84rem;
        text-align: center;
        line-height: 0.84rem;
        position: relative;
        background-color: $color-white;
        border-bottom: 1px solid $color-border;
        .go-back{
            width: 0.6rem;
            height:100%;
            position: absolute;
            left: 0;
            top:0;
            i{
                width: 0.20rem;
                height:0.34rem;
                position: absolute;
                left:0.25rem;
                top:0.22rem;
                background: url(../assets/images/icon-go-back-red.png) no-repeat;
                background-size:100% 100%;
            }
        }
        .tit-name{
            font-size: 0.36rem;
        }
        .showTool-Bar{
            width: 0.8rem;
            height:100%;
            position: absolute;
            right: 0;
            top:0;
            i{
                width: 0.44rem;
                height:0.10rem;
                position: absolute;
                right:0.3rem;
                top:0.39rem;
                background: url(../assets/images/share_bar.png) no-repeat;
                background-size:100% 100%;
            }
        }
    }




</style>

