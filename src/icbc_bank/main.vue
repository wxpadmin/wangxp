<template>
	<div>
    <transition :name="transition">
        <router-view class="router-view"></router-view>
    </transition>
	</div>
</template>

<script>
  export default{
    data () {
      return {
        transition: 'slide-left',
				map: []
      }
    },
		created () {
			for(var i=0;i<this.$router.options.routes.length;i++){
				this.map.push(this.$router.options.routes[i].name)
			}
		},
    watch: {
      '$route' (to,from){
          this.transition = this.checkDirecition(to.name, from.name)
            && 'slide-left' || 'slide-right'
          }
    },
    methods: {
      checkDirecition (to, from){
        return (this.map.indexOf(to) - this.map.indexOf(from)) > 0;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .router-view {
      width:100%;
      height:100%;
      min-height: 10rem;
      position: absolute;
      transition: all .8s cubic-bezier(.55,0,.1,1);
      background: #f5f5f5;
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }
</style>
