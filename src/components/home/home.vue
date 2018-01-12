<template>
  <div class="home">
    <!--tab-->
    <mheader></mheader>
    <!--侧边栏-->
      <mmenu :showMenu="showDrawer"
             class="mmenu"></mmenu>

    <transition name="charouter">
      <router-view></router-view>
    </transition>

    <!--遮罩，当侧边栏打开时显示，并控制侧边栏的关闭-->
    <transition name="fade">
      <div class="pagecover" @click="closeD" v-show="showDrawer"></div>
    </transition>
  </div>

</template>

<script>
  import mheader from 'components/mheader/mheader.vue'
  import mmenu from 'components/mmenu/mmenu.vue'
  import {mapState, mapActions} from 'vuex'

  export default {
    components: {
      mheader,
      mmenu
    },
    computed: {
      ...mapState([
        'showDrawer'
      ])
    },
    methods: {
      closeD() {
        this.closeDrawer()
      },
      ...mapActions([
        'closeDrawer'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .home
    .pagecover
      position: absolute
      top: 0
      left: 0
      bottom: 0
      width: 100%
      background: rgba(22, 22, 22, .8)
      &.fade-enter, &.fade-leave-to
        opacity: 0
      &.fade-enter-active, &.fade-leave-active
        transition: opacity .5s

    .charouter-enter
      opacity: 0
    .charouter-leave-to
      opacity: 0
      transform: translateX(100%)
    .charouter-enter-active, .charouter-leave-active
      transition: all .5s ease
</style>
