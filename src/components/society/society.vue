<template>
  <div class="news">
    <keep-alive>
      <newstemp :fatherUrl="surl"></newstemp>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import newstemp from 'components/newstemp/newstemp'
  import {SOCIETY_NEWS} from 'common/js/url'

  export default {
    data() {
      return {
        surl: SOCIETY_NEWS
      }
    },
    components: {
      newstemp
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .news
    position: absolute
    top: 60px
    bottom: 0
    left: 0
    width: 100%
</style>
