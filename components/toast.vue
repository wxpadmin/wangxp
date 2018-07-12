<template>
    <div v-if ="isShow">
        <div class="toast">
            <p>{{message}}</p>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                isShow:false,
                message:""
            }
        },
        methods: {
            //toast的开关
            switch(message,time){
                var timeOut = time?time:2500

                if(this.isShow){
                    return
                }
                this.message = message 
                this.isShow = true
                var t = setTimeout(()=>{
                    this.isShow = false
                },timeOut)
            }
        }
    }
</script>

<style lang="less" scoped>
    .toast{
        max-width: 5.8rem;
        min-width: 4.5rem;
        min-height: 0.9rem;
        text-align: center;
        font-size: 0.28rem;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 4px;
        position: fixed;
        z-index: 1001;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        padding-left: 0.42rem;
        padding-right:0.42rem;
        p{
            margin: 0.2rem auto;
            line-height: 0.5rem;
            color: #ffffff;
        }
    }
</style>
