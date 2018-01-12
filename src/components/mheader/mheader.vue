<template>
  <div class="mheader" :style="{background:themeColor}">
    <div class="tab">
      <div class="open icon-home3" @click="open"></div>
      <router-link to="/homepage" class="tab-item">首页</router-link>
      <router-link to="/society" class="tab-item">社会</router-link>
      <router-link to="/sport" class="tab-item">体育</router-link>
      <router-link to="/history" class="tab-item">历史</router-link>
      <router-link to="/fun" class="tab-item">娱乐</router-link>
      <!--<router-link to="/test" class="tab-item">test</router-link>-->
      <!--<router-link to="/picture" class="tab-item">picture</router-link>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions, mapState} from 'vuex'

  export default {
    methods: {
      open() {
        this.openDrawer()
      },
      closeD() {
        this.closeDrawer()
      },
      ...mapActions([
        'openDrawer',
        'closeDrawer'
      ])
    },
    computed: {
      ...mapState([
        'themeColor'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .mheader
    width: 100%
    height: 60px
    background: #ff1f00
    .tab
      display: flex
      width: 100%
      height: 60px
      line-height: 60px
      text-align: center
      box-sizing: border-box
      color: #cccccc
      .open
        flex: 1
        font-size: 18px
        line-height: 60px
        color: #ddd
      .tab-item
        flex: 2
        color: #cccccc
        &.active
          color: white
          border-bottom:3px solid #ffeb87


</style>
