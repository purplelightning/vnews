<template>
  <div class="home" ref="home">
    <keep-alive>
      <newstemp :fatherUrl="hurl"></newstemp>
    </keep-alive>
  </div>

</template>

<script type="text/ecmascript-6">
  import {HOME_NEWS} from 'common/js/url'
  import newstemp from 'components/newstemp/newstemp'

  export default {
    data() {
      return {
        hurl: HOME_NEWS,
      }
    },
    components: {
      newstemp
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .home
    position: absolute
    top: 60px
    bottom: 0
    left: 0
    width: 100%
</style>
