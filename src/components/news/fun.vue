<template>
  <div class="fun">
    <keep-alive>
      <newstemp :fatherUrl="furl"></newstemp>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import newstemp from 'components/newstemp/newstemp'
  import {FUN} from 'common/js/url'

  export default {
    data() {
      return {
        furl: FUN
      }
    },
    components: {
      newstemp
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .fun
    position: absolute
    top: 60px
    bottom: 0
    left: 0
    width: 100%
</style>
