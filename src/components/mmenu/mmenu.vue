<template>
  <div class="menu" v-show="showMenu">
    <ul>
      <li v-for="item in menuArray">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        count: 5,
        menuArray: ['新闻', '前端', '图片', '阅读']
      }
    },
    props: [
      'showMenu'
    ]
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .menu
    position: absolute
    top: 0
    left:0
    bottom:0
    width: 250px
    height: 100%
    color:white
    background: #262626
    z-index:10

</style>
