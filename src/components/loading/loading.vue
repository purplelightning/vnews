<template>
  <div class="loading" v-show="ashow">
    <div class="loader-inner ball-pulse">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props:{
    ashow:{
      type:Boolean
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./loading.styl"
</style>
