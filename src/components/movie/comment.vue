<template>
  <div class="comment">
    <div class="top">
      <div class="cbn"><a href="#">评论</a></div>
      <div class="cbn"><a href="#">讨论区</a></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .comment
    width: 100%
    height: 400px
    font-size: 14px
    color: #ccc
    .top
      display: flex
      width: 100%
      height: 60px
      background: #ddd
      .cbn
        flex: 1
        color: #fff
        a
          display :block
          height:100%
          line-height:60px
          text-align: center
        &:active
          color: #f33
          border-bottom: 2px solid #333


</style>
