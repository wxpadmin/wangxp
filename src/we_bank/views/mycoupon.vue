<template>
    <div class="wrap">
        <div>hello</div>
        <ul>
            <li>你好么</li>
            <li>你好么</li>
            <li>你好么</li>
            <li>你好么</li>
            <li>你好么</li>
            <li>你好么</li>
            <li>你好么</li>
            <li>你好么</li>
            <li>你好么</li>
            <li>你好么</li>
        </ul>
        <div v-if="divshow" class="bot" style="width: 100%;height: 1rem;position: fixed;bottom: 0;background-color: red"></div>
    </div>
</template>
<script>
    export default {
        beforeRouteLeave (to,from,next) {
            this.divshow = false
            let t = setTimeout(()=>{
                next()
                clearTimeout(t)
            },0)
        },
        data () {
            return {
                divshow : true
            }
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        width: 100%;
        height:100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling : touch;
        ul{
            li{
                width: 100%;
                height:2rem;
                background-color: green;
            }
        }
    }
</style>
