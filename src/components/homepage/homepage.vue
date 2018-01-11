<template>
  <div class="homepage">
    <keep-alive>
      <newstemp :fatherUrl="apiUrl"></newstemp>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import newstemp from 'components/newstemp/newstemp'
  import {HOME_NEWS} from 'common/js/url'

  export default {
    data() {
      return {
        apiUrl: HOME_NEWS
      }
    },
    components: {
      newstemp
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .homepage
    position: absolute
    top: 60px
    bottom: 0
    left: 0
    width: 100%
</style>
