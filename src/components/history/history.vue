<template>
  <div class="history">
    <keep-alive>
      <newstemp :fatherUrl="surl"></newstemp>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import newstemp from 'components/newstemp/newstemp'
  import {HISTORY} from 'common/js/url'

  export default {
    data() {
      return {
        surl: HISTORY
      }
    },
    components: {
      newstemp
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .history
    position: absolute
    top: 60px
    bottom: 0
    left: 0
    width: 100%
</style>
