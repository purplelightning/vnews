<template>
  <div id="app">
    <!--tab-->
    <mheader></mheader>
    <!--侧边栏-->
    <transition name="move">
      <mmenu :showMenu="showDrawer"></mmenu>
    </transition>

    <router-view></router-view>
    <!--遮罩，当侧边栏打开时显示，并控制侧边栏的关闭-->
    <div class="pagecover" @click="closeD" v-show="showDrawer"></div>
  </div>
</template>

<script>
  import mheader from 'components/mheader/mheader.vue'
  import mmenu from 'components/mmenu/mmenu.vue'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'app',
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
  #app
    .pagecover
      position: absolute
      top: 0
      left: 0
      bottom: 0
      width: 100%
      background: rgba(22, 22, 22, .7)
</style>
