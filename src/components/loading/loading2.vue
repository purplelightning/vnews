<template>
  <div class="loading" v-show="bshow">
    <img src="../../../static/loading.gif">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      bshow: {
        type: Boolean
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .loading
    width: 100%
    height: 100%
    img
      display: block
      margin: 100px auto
      width: 150px
      height: 150px
</style>
